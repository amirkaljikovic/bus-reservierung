// src/components/Calendar.jsx
import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import deLocale from "@fullcalendar/core/locales/de";

export default function CalendarComponent({ user }) {
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    useEffect(() => {
        fetch("/api/reservierungen")
            .then((res) => res.json())
            .then(setEvents);
    }, []);

    const handleDateSelect = async (selectInfo) => {
        const newEvent = {
            title: `${user} reserviert`,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
        };
        const res = await fetch("/api/reservierungen", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        });
        if (res.status === 409) {
            const err = await res.json();
            alert(err.error);
            return;
        }
        if (res.ok) {
            const saved = await res.json();
            setEvents((prev) => [...prev, saved]);
        }
    };

    const handleEventClick = async (clickInfo) => {
        const confirmed = confirm(`Reservierung löschen: "${clickInfo.event.title}"?`);
        if (!confirmed) return;

        const res = await fetch("/api/reservierungen", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: clickInfo.event.id }),
        });

        if (res.ok) {
            setEvents((prev) => prev.filter((e) => e.id !== clickInfo.event.id));
        }
    };

    const switchView = (viewName) => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.changeView(viewName);
        }
    };

    const handleEventDrop = async (dropInfo) => {
        const updatedEvent = {
            id: dropInfo.event.id,
            start: dropInfo.event.start.toISOString(),
            end: dropInfo.event.end?.toISOString(),
        };

        const res = await fetch("/api/reservierungen", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEvent),
        });

        if (!res.ok) {
            alert("Fehler beim Verschieben der Reservierung");
            dropInfo.revert(); // Rückgängig machen
        } else {
            // Optionale Rückmeldung
            console.log("Reservierung verschoben");
        }
    };

    // Neue Funktion zum Rendern der Event-Inhalte mit Löschbutton
const renderEventContent = (eventInfo) => {
    return (
      <div className="flex justify-between items-center w-full">
        <span className="text-sm truncate">{eventInfo.event.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation(); // verhindert Klick und Drag-Probleme
            
            const confirmed = confirm(`Reservierung löschen: "${eventInfo.event.title}"?`);
            if (!confirmed) return;
  
            fetch("/api/reservierungen", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: eventInfo.event.id }),
            }).then((res) => {
              if (res.ok) {
                setEvents((prev) =>
                  prev.filter((e) => e.id !== eventInfo.event.id)
                );
              }
            });
          }}
          className="ml-2 text-red-500 hover:text-red-700"
          title="Löschen"
        >
          🗑️
        </button>
      </div>
    );
  };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Vereinsbus-Reservierung</h1>

            <div className="mb-4">
                <button onClick={() => switchView("timeGridWeek")} className="mr-2 px-4 py-1 bg-blue-500 text-white rounded">Woche</button>
                <button onClick={() => switchView("dayGridMonth")} className="px-4 py-1 bg-gray-300 text-black rounded">Monat</button>
            </div>

            <FullCalendar
                ref={calendarRef}
                locale={deLocale}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                selectable={true}
                editable={true}
                select={handleDateSelect}
                events={events}
                eventDrop={handleEventDrop}
                eventContent={renderEventContent}
        
                height="auto"
                slotMinTime="06:00:00"
                slotMaxTime="22:00:00"
                slotLabelFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }}
            />

        </div>
    );
}