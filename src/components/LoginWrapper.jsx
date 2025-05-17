// src/components/LoginWrapper.jsx
import { useState } from "react";
import CalendarComponent from "./Calendar.jsx";
import LoginForm from "./LoginForm.jsx";

export default function LoginWrapper() {
  const [user, setUser] = useState(null);

  return user ? (
    <div>
      <p className="p-4">Eingeloggt als: <strong>{user}</strong></p>
      <CalendarComponent user={user} />
    </div>
  ) : (
    <LoginForm onLogin={setUser} />
  );
}
