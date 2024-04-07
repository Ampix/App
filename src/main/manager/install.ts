// import { setupMCAuth } from '../auth'
// import { install, getVersionList, installDependencies } from '@xmcl/installer'
// import type { MinecraftVersion } from '@xmcl/installer'
// import {
//     launch,
//     Version,
//     type MinecraftLocation,
//     type ResolvedVersion,
// } from '@xmcl/core'
import { exec } from 'node:child_process'
import fs from 'node:fs'
// import path from 'node:path'
import https from 'node:https'
import { getConfig } from '../config'
import { mainWindow } from '..'

// export async function installMC(mc: string) {
//     const list: MinecraftVersion[] = (await getVersionList()).versions
//     const aVersion: MinecraftVersion | undefined = list.find(
//         (val) => val.id === '1.18.2'
//     ) // i just pick the first version in list here
//     if (aVersion) {
//         await install(aVersion, minecraftLocation)
//         console.log('done')
//         initlaunchMC()
//     } else {
//         console.log('nincs')
//     }
// }

// export async function initlaunchMC(mc: string) {
//     const version: string = '1.18.2' // version string like 1.13
//     const resolvedVersion: ResolvedVersion = await Version.parse(
//         minecraftLocation,
//         version
//     )
//     await installDependencies(resolvedVersion)
//     console.log('kész')
//     launchMC(mc)
// }

// export async function launchMC(mc: string) {
//     const auth = await setupMCAuth()

//     const proc: Promise<ChildProcess> = launch({
//         gamePath: getConfig(`/mc/${mc}`),
//         accessToken: auth?.accessToken,
//         gameProfile: {
//             id: auth?.id,
//             name: auth?.username,
//         },
//         server: {
//             ip: 'newsmp.ampix.hu',
//             port: 25565,
//         },
//         javaPath: getConfig('/java/17/bin/javaw.exe'),

//         version: '1.18.2',
//     })
// }

function setupJava() {
    if (!fs.existsSync(getConfig('/java'))) fs.mkdirSync(getConfig('/java'))
    if (!fs.existsSync(getConfig('/java/17')))
        fs.mkdirSync(getConfig('/java/17'))
    mainWindow?.webContents.send(
        'setloadtext',
        'Java 17 telepítése (adminisztrátor kérés várható)'
    )
    const file = fs.createWriteStream(getConfig('/java/java17_install.msi'))
    https.get(
        'https://download.oracle.com/java/17/archive/jdk-17.0.10_windows-x64_bin.msi',
        (res) => {
            res.pipe(file)
            file.on('finish', () => {
                file.close()

                exec(
                    `msiexec /i java17_install.msi /passive INSTALLDIR="%CD%\\17"`,
                    { cwd: getConfig('/java') },
                    (err, stout, sterr) => {
                        if (err) return console.error(err)
                        if (sterr) return console.error(sterr)
                        console.log(stout)
                    }
                ).on('close', () => {
                    fs.rmSync(getConfig('/java/java17_install.msi'))
                })
            })
        }
    )
}

export function checkJava() {
    if (!fs.existsSync(getConfig('/java/17/bin/javaw.exe'))) return setupJava()
}
