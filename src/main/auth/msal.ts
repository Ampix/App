import msal from '@azure/msal-node'
import { BrowserWindow, session } from 'electron'
import type { AuthenticationResult } from '@azure/msal-node'

export async function initAuth(): Promise<AuthenticationResult | undefined> {
    return new Promise((resolve, reject) => {
        const authCodeUrlParameters = {
            scopes: ['XboxLive.signin'],
            redirectUri: 'http://localhost/callback',
        }
        const filter = {
            urls: [`${authCodeUrlParameters.redirectUri}*`],
        }
        const authWindow = new BrowserWindow({
            width: 500,
            height: 500,
            title: 'Kuki',
            show: true,
            autoHideMenuBar: true,
        })
        msalClient.getAuthCodeUrl(authCodeUrlParameters).then((val) => {
            authWindow.loadURL(val)
            session.defaultSession.webRequest.onBeforeRequest(
                filter,
                async (details) => {
                    const url = new URL(details.url)
                    try {
                        const tokenRequest = {
                            code: url.searchParams.get('code') as string,
                            scopes: ['XboxLive.signin'],
                            redirectUri: 'http://localhost/callback', // Redirect URI for Electron
                        }

                        const tokenResponse =
                            await msalClient.acquireTokenByCode(tokenRequest)
                        authWindow.close()
                        resolve(tokenResponse)
                    } catch (error) {
                        reject(error)
                    }
                }
            )
        })
        // ipcMain.on('auth-callback', async (_event, args) => {
        //     try {
        //         const tokenRequest = {
        //             code: args,
        //             scopes: ['user.read'],
        //             redirectUri: 'http://localhost', // Redirect URI for Electron
        //         }

        //         const tokenResponse =
        //             await msalClient.acquireTokenByCode(tokenRequest)
        //         console.log(tokenResponse)
        //     } catch (error) {
        //         console.error(error)
        //     }
        // })
    })
}

const config = {
    auth: {
        clientId: 'c6513696-a2b9-481c-bd15-aaffabe48c94',
        authority: 'https://login.microsoftonline.com/consumers',
    },
    system: {
        loggerOptions: {
            loggerCallback(_loglevel, message, _containsPii) {
                console.log(message)
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        },
    },
}

export const msalClient = new msal.PublicClientApplication(config)
