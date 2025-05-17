// src/pages/api/reservierungen.js
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { randomUUID } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, "../../data/reservierungen.json");

export async function GET() {
  const data = fs.readFileSync(filePath, "utf-8");
  return new Response(data, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST({ request }) {
  const body = await request.json();
  body.id = randomUUID();

  const current = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const overlaps = current.some(event => {
    return (
      new Date(body.start) < new Date(event.end) &&
      new Date(body.end) > new Date(event.start)
    );
  });

  if (overlaps) {
    return new Response(
      JSON.stringify({ error: "Zeitüberschneidung mit einer bestehenden Reservierung." }),
      { status: 409, headers: { "Content-Type": "application/json" } }
    );
  }

  current.push(body);
  fs.writeFileSync(filePath, JSON.stringify(current, null, 2));

  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE({ request }) {
  const { id } = await request.json();

  let current = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  current = current.filter((event) => event.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(current, null, 2));

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT({ request }) {
    const { id, start, end } = await request.json();
  
    const current = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  
    const index = current.findIndex((event) => event.id === id);
    if (index === -1) {
      return new Response(JSON.stringify({ error: "Nicht gefunden" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    // Kollision prüfen
    const overlaps = current.some((event, i) => {
      if (i === index) return false;
      return (
        new Date(start) < new Date(event.end) &&
        new Date(end) > new Date(event.start)
      );
    });
  
    if (overlaps) {
      return new Response(
        JSON.stringify({ error: "Zeitüberschneidung mit bestehender Reservierung." }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }
  
    // Aktualisieren
    current[index].start = start;
    current[index].end = end;
    fs.writeFileSync(filePath, JSON.stringify(current, null, 2));
  
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }
