import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "U13" && password === "NurDerUSV") {
      onLogin(username);
    }
    else if (username === "U11" && password === "NurDerUSV") {
        onLogin(username);
      }
    else if (username === "Admin" && password === "NurDerUSV") {
        onLogin(username);
      }
    else {
      alert("Benutzername oder Passwort falsch");
    }
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "4rem",
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          background: "#f8f9fa",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          fontSize: "1.5rem"
        }}>🔐 Login</h2>

<div style={
    {
        padding: "20px",
        display: "block"
    }
}>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "80%",
            padding: "1rem",
            fontSize: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "80%",
            padding: "1rem",
            fontSize: "1rem",
            marginBottom: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            width: "80%",
            padding: "1rem",
            fontSize: "1rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Einloggen
        </button>
        </div>
      </form>
    </div>
  )
}
