import { supabase } from '../../lib/supabaseClient.js';

export async function GET() {
  const { data, error } = await supabase.from('reservierung').select('*').order('start');

  if (error) {
    console.error("Supabase Insert Error:", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST({ request }) {
  const body = await request.json();
  const { data, error } = await supabase.from('reservierung').insert([body]);
 
  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
 
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE({ request }) {
  const { id } = await request.json();
  const { error } = await supabase.from('reservierung').delete().eq('id', id);
  if (error) {

    return new Response(JSON.stringify({ error }), { status: 500 });
  }
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT({ request }) {
  const { id, start, end } = await request.json();

  
  const { data, error } = await supabase
    .from('reservierung')
    .update({ start, end })
    .eq('id', id);

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return new Response(JSON.stringify({ data }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
