import { useState } from "react";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault(); // Prevent form default submission

    const url = "https://api.freeapi.app/api/v1/users/login";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ password, username }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={loginUser}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
