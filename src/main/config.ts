import fs from 'node:fs'
import path from 'node:path'
import { mainWindow } from '.'
import { checkJava } from './manager/install'

export function getConfig(folder: string) {
    return path.join(process.env.APPDATA as string, '/.ampixapp/', folder)
}

export function initConfig() {
    mainWindow?.webContents.send('setloadtext', 'Konfiguráció betöltése')
    if (!fs.existsSync(getConfig('/'))) fs.mkdirSync(getConfig('/'))
    mainWindow?.webContents.send('setloadtext', 'Java betöltése')
    setTimeout(() => {
        checkJava()
    }, 250)
}
