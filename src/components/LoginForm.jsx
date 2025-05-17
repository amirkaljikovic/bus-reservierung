// src/components/LoginForm.jsx
import { useState } from "react";

const USERS = {
  amir: "NurDerUSV",
  max: "max123",
};

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (USERS[username] === password) {
      onLogin(username);
    } else {
      alert("Benutzername oder Passwort falsch");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
      <h2 className="text-xl mb-4 font-semibold">Login</h2>
      <input
        type="text"
        placeholder="Benutzername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 w-full rounded"
      >
        Einloggen
      </button>
    </form>
  );
}