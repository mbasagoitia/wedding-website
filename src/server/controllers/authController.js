import jwt from "jsonwebtoken";
import createAuthenticatedUser from "../helpers/createAuthenticatedUser.js";

const authenticateUser = async (req, res) => {
  const authCode = req.query.code;

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: authCode,
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        redirect_uri: "https://wedding.basagoitia.net/auth/google/callback",
        grant_type: "authorization_code",
      }),
    });

    const { access_token: accessToken } = await tokenResponse.json();

    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const userInfo = await userInfoResponse.json();

    const user = await createAuthenticatedUser(userInfo);

    const jwtSecret = process.env.JWT_SECRET;

    const authToken = jwt.sign(
      { userId: user.id, name: user.name, email: user.email },
      jwtSecret,
      { expiresIn: "2h" }
    );

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: true, // Use HTTPS
      sameSite: "Lax",
    });

    res.cookie("userName", user.name, { secure: true, sameSite: "Lax" });
    res.cookie("userEmail", user.email, { secure: true, sameSite: "Lax" });
    
    // Does this redirect to the front end route?
    res.redirect("/photos/upload");
  } catch (error) {
    console.error("Error handling callback:", error);
    res.status(500).send("Authentication failed.");
  }
};

export default authenticateUser;
