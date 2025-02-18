import { useEffect, useState } from "react";
import { account } from "./lib/appwrite";
import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    account.get().then(setUser).catch(() => setUser(null));
  }, []);

  return (
    <div>
      <h1>IronKeyring</h1>
      <img src="./keyring.png" width="200" />
      {user ? <>
          <p>Welcome, {user.name}!</p>
            <RegisterUser />
          </>
       : <Login />}
    </div>
  );
}

export default App;
