import { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import CalendarComponent from "./Calendar.jsx";
import ReservationList from "./ReservationList.jsx";

export default function LoginWrapper() {
  const [user, setUser] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const triggerReload = () => setReloadTrigger((prev) => prev + 1);

  if (!user) return (
  <div>
  <ReservationList triggerReload={reloadTrigger} />
  <LoginForm onLogin={setUser} />;
  </div>
  )


  return (
    <div className="p-4">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <p>👋 Eingeloggt als: <strong>{user}</strong></p>
        <button onClick={() => setUser(null)}>Logout</button>
      </div>

      <ReservationList triggerReload={reloadTrigger} />

      <CalendarComponent user={user} onReservationChange={triggerReload} />
    </div>
  )
}
