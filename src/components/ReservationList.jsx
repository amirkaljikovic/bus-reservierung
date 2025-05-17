// src/components/ReservationList.jsx
import { useEffect, useState } from "react";

export default function ReservationList({ triggerReload }) {
  const [reservierungen, setReservierungen] = useState([]);

  const loadData = async () => {
    const res = await fetch("/api/reservierungen");
    const data = await res.json();
    setReservierungen(data);
  };

  useEffect(() => {
    loadData();
  }, [triggerReload]); // neu laden wenn trigger sich ändert

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>📋 Aktuelle Bus-Reservierungen</h3>
      {reservierungen.length === 0 ? (
        <p>Keine Reservierungen gefunden.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th>Wer</th>
              <th>Start</th>
              <th>Ende</th>
            </tr>
          </thead>
          <tbody>
            {reservierungen.map((r) => (
              <tr key={r.id}>
                <td>{r.title}</td>
                <td>{new Date(r.start).toLocaleString("de-AT")}</td>
                <td>{new Date(r.end).toLocaleString("de-AT")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
