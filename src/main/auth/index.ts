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

        // the accessToken is the common minecraft token we want!
        const accessToken: string = mcResponse.access_token
        const username = mcResponse.username
        const expire = mcResponse.expires_in // in seconds
        return { xboxGameProfile, accessToken, username, expire }
    }
    return undefined
}
