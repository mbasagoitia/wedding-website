import createAuthenticatedUser from "../helpers/createAuthenticatedUser";

const authenticateUser = async (req, res) => {
    const authCode = req.query.code;

    try {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            code: authCode,
            client_id: process.env.OAUTH_CLIENT_ID,
            client_secret: process.env.OAUTH_CLIENT_SECRET,
            redirect_uri: 'https://wedding.basagoitia.net/auth/google/callback',
            grant_type: 'authorization_code',
        });

        const accessToken = tokenResponse.data.access_token;

        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const userInfo = userInfoResponse.data;

        const user = await createAuthenticatedUser(userInfo);

        res.cookie('authToken', accessToken, {
            httpOnly: true,
            secure: true,  // Use HTTPS when deploying
            sameSite: 'Lax',
        });

        res.cookie('userName', user.name, { secure: true, sameSite: 'Lax' });
        res.cookie('userEmail', user.email, { secure: true, sameSite: 'Lax' });

        res.redirect('/photos/upload');
    } catch (error) {
        console.error('Error handling callback:', error);
        res.status(500).send('Authentication failed.');
    }
}

export default authenticateUser;