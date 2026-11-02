// Insert-only writes to the MyPro Market Supabase project from public web forms.
// The publishable key below is meant to be public: row-level security on each table
// lets visitors insert a row but never read, change or delete one.

const SUPABASE_URL = 'https://scwyvdxevyydcjnbwqtm.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_SSdm3QQUh2pyXhc1EKOjwQ_dP8TU7VX';

export async function insertPublicRow(table: string, row: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    throw new Error(`Save failed (${res.status})`);
  }
}
