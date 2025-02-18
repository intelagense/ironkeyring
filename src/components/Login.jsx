import { account } from "../lib/appwrite";

function Login() {
  const loginWithDiscord = async () => {
    try {
      await account.createOAuth2Session(
        "discord",
        "https://ironkeyring.netlify.app/", // success URL
        "https://ironkeyring.netlify.app/", // failure URL
        ["identify", "email", "guilds", "guilds.members.read"]
      ); 
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return <button onClick={loginWithDiscord}>Login with Discord</button>;
}

export default Login;
