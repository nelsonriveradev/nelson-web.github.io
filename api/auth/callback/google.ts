import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/auth/callback/google"; // Match your OAuth callback

async function getRefreshToken() {
  const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

  // Generate the authorization URL
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", // Request a refresh token
    scope: ["https://mail.google.com/"], // Scopes for Gmail access
  });

  console.log("Authorize this app by visiting this url:", authUrl);

  // After the user authorizes the app, they will be redirected to your REDIRECT_URI
  // with an authorization code in the URL.

  // You need to extract the code from the URL and use it to get the tokens.

  // This is a placeholder - you'll need to implement a way to get the code from the URL
  // (e.g., by creating an API route that handles the redirect and extracts the code).

  const code = "YOUR_AUTHORIZATION_CODE"; // Replace with the actual code

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("Refresh Token:", tokens.refresh_token);
    return tokens.refresh_token;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    throw error;
  }
}

// Example Usage (you'd run this once to get the refresh token):
async function main() {
  try {
    const refreshToken = await getRefreshToken();
    console.log("Store this refresh token securely:", refreshToken);
  } catch (error) {
    console.error("Failed to get refresh token:", error);
  }
}

main();
