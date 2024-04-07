import { setupMCAuth } from './auth'
import { install, getVersionList, installDependencies } from '@xmcl/installer'
import type { MinecraftVersion } from '@xmcl/installer'
import {
    launch,
    Version,
    type MinecraftLocation,
    type ResolvedVersion,
} from '@xmcl/core'
import type { ChildProcess } from 'node:child_process'

export const minecraftLocation: MinecraftLocation =
    'C:\\Users\\hvcsa\\AppData\\Roaming\\.ampixapp\\mc'

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
        javaPath:
            'C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.8.101-hotspot\\bin\\javaw.exe',
        version: '1.18.2',
    })
}
