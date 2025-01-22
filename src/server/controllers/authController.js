const authenticateUser = async (req, res) => {
    const authCode = req.query.code;

    try {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            code: authCode,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: 'https://wedding.basagoitia.net/auth/google/callback',
            grant_type: 'authorization_code',
        });

        const accessToken = tokenResponse.data.access_token;

        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const userInfo = userInfoResponse.data;

        // Create and separate out helper function to do this
        const user = await createUserInDatabase(userInfo);

        res.redirect('/photos/upload');
    } catch (error) {
        console.error('Error handling callback:', error);
        res.status(500).send('Authentication failed.');
    }
}

export default authenticateUser;