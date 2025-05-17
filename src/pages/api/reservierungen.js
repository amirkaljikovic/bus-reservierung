import { supabase } from '../../libsupabaseClient.js';

export async function GET() {
  const { data, error } = await supabase.from('reservierung').select('*');

  if (error) {

    console.error("Supabase Insert Error:", error);

    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  console.log("Supabase get:", data);

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST({ request }) {
  const body = await request.json();

  console.info("Supabase post body:", body);

  const { data, error } = await supabase.from('reservierung').insert([body]);
 
  if (error) {

    console.error("Supabase post Error:", error);

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

    console.error("Supabase Delete Error:", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT({ request }) {
  const { id, start, end } = await request.json();
  const { error } = await supabase
    .from('reservierung')
    .update({ start, end })
    .eq('id', id);

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
