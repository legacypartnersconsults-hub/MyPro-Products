// Early-access sign-ups for MyPro Claim Assist.
// Rows go to the `claim_assist_signups` table in the MyPro Market Supabase project.
// The publishable key below is meant to be public: row-level security on that table
// lets visitors insert a sign-up but never read, change or delete one.

const SUPABASE_URL = 'https://scwyvdxevyydcjnbwqtm.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_SSdm3QQUh2pyXhc1EKOjwQ_dP8TU7VX';

export interface ClaimAssistSignup {
  full_name: string;
  email: string;
  zip_code: string;
  filed_claim_before: boolean | null;
  claim_experience: string | null;
  what_would_have_helped: string | null;
}

export async function submitClaimAssistSignup(signup: ClaimAssistSignup): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/claim_assist_signups`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ ...signup, source: 'myproproducts.com/claimassist' }),
  });
  if (!res.ok) {
    throw new Error(`Sign-up failed (${res.status})`);
  }
}
