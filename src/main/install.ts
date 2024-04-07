import { setupMCAuth } from './auth'
import { install, getVersionList, installDependencies } from '@xmcl/installer'
import type { MinecraftVersion } from '@xmcl/installer'
import {
    launch,
    Version,
    type MinecraftLocation,
    type ResolvedVersion,
} from '@xmcl/core'
import { exec, type ChildProcess } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'

export const minecraftLocation: MinecraftLocation =
    'C:\\Users\\hvcsa\\AppData\\Roaming\\.ampixapp'

export async function installMC() {
    const list: MinecraftVersion[] = (await getVersionList()).versions
    const aVersion: MinecraftVersion | undefined = list.find(
        (val) => val.id === '1.18.2'
    ) // i just pick the first version in list here
    if (aVersion) {
        await install(aVersion, minecraftLocation)
        console.log('done')
        initlaunchMC()
    } else {
        console.log('nincs')
    }
}

export async function initlaunchMC() {
    const version: string = '1.18.2' // version string like 1.13
    const resolvedVersion: ResolvedVersion = await Version.parse(
        minecraftLocation,
        version
    )
    await installDependencies(resolvedVersion)
    console.log('kész')
    launchMC()
}

export async function launchMC() {
    const auth = await setupMCAuth()

    const proc: Promise<ChildProcess> = launch({
        gamePath: String(minecraftLocation),
        accessToken: auth?.accessToken,
        gameProfile: {
            id: auth?.id,
            name: auth?.username,
        },
        server: {
            ip: 'hypixel.net',
            port: 25565,
        },
        javaPath: path.join(
            String(minecraftLocation),
            '/java/17/bin/javaw.exe'
        ),
        version: '1.18.2',
    })
}

function setupJava() {
    if (!fs.existsSync(path.join(String(minecraftLocation), '/java')))
        fs.mkdirSync(path.join(String(minecraftLocation), '/java'))
    if (!fs.existsSync(path.join(String(minecraftLocation), '/java/17')))
        fs.mkdirSync(path.join(String(minecraftLocation), '/java/17'))

    const file = fs.createWriteStream(
        path.join(String(minecraftLocation), '/java/java17_install.msi')
    )
    const request = https.get(
        'https://download.oracle.com/java/17/archive/jdk-17.0.10_windows-x64_bin.msi',
        (res) => {
            res.pipe(file)
            file.on('finish', () => {
                file.close()
                exec(
                    `msiexec /i java17_install.msi /passive INSTALLDIR="%CD%\\17"`,
                    { cwd: path.join(String(minecraftLocation), '/java') },
                    (err, stout, sterr) => {
                        if (err) return console.error(err)
                        if (sterr) return console.error(sterr)
                        console.log(stout)
                    }
                ).on('close', () => {
                    fs.rmSync(
                        path.join(
                            String(minecraftLocation),
                            '/java/java17_install.msi'
                        )
                    )
                })
            })
        }
    )
}

export function setup() {
    if (
        !fs.existsSync(
            path.join(String(minecraftLocation), '/java/17/bin/javaw.exe')
        )
    )
        return setupJava()
    launchMC()
}
