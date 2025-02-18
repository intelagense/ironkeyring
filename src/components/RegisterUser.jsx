import { useState, useEffect } from "react";
import { account, databases } from "../lib/appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

function RegisterUser() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await account.get();
        setUsername(user.name); 
      } catch (err) {
        console.error("Failed to get user data", err);
      }
    }
    fetchUser();
  }, []);

  const saveUsername = async () => {
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    try {
      const user = await account.get();
      const appwriteID = user.$id; 

      try {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, appwriteID);
      } catch (err) {
        console.log("Failed to delete document, proceeding anyway.");
      }

      await databases.createDocument(DATABASE_ID, COLLECTION_ID, appwriteID, {
        discord_uuid: appwriteID,
        luanti_username: username,
      });

      setError(`Username "${username}" saved successfully!`);
    } catch (err) {
      setError("Failed to save username.");
      console.error("Error saving username:", err);
    }
  };

  return (
    <div>
      <h2>Minetest Username</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Minetest username"
      />
      <button onClick={saveUsername}>Save</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default RegisterUser;
