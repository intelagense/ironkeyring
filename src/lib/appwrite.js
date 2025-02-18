import { Client, Account, OAuthProvider, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67b428a6003d7b85754d');

const account = new Account(client);
const databases = new Databases(client);


export { account, OAuthProvider, databases }; 