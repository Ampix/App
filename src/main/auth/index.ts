import { MicrosoftAuthenticator } from '@xmcl/user'
import { initAuth } from './msal'

export async function setupMCAuth() {
    const authenticator = new MicrosoftAuthenticator()

    const msAccessToken = await initAuth() // the access token you got from msal
    if (msAccessToken) {
        const { liveXstsResponse, minecraftXstsResponse } =
            await authenticator.acquireXBoxToken(msAccessToken.accessToken)

        // You can use liveXstsResponse to get the xbox user avatar and name.
        const xboxGameProfile = await authenticator.getXboxGameProfile(
            liveXstsResponse.DisplayClaims.xui[0].xid,
            liveXstsResponse.DisplayClaims.xui[0].uhs,
            liveXstsResponse.Token
        )
        // you can use the xstsResponse to get the minecraft access token
        const mcResponse = await authenticator.loginMinecraftWithXBox(
            minecraftXstsResponse.DisplayClaims.xui[0].uhs,
            minecraftXstsResponse.Token
        )
        const accessToken: string = mcResponse.access_token
        const expire = mcResponse.expires_in

        const r998 = await fetch(
            'https://api.minecraftservices.com/minecraft/profile',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        ) // in seconds
        const { id, name } = await r998.json()
        return { xboxGameProfile, accessToken, username: name, expire, id }
    }
    return undefined
}
