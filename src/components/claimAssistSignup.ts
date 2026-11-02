// Early-access sign-ups for MyPro Claim Assist.
// Rows go to the `claim_assist_signups` table in the MyPro Market Supabase project.

import { insertPublicRow } from './supabaseInsert';

export interface ClaimAssistSignup {
  full_name: string;
  email: string;
  zip_code: string;
  filed_claim_before: boolean | null;
  claim_experience: string | null;
  what_would_have_helped: string | null;
}

export function submitClaimAssistSignup(signup: ClaimAssistSignup): Promise<void> {
  return insertPublicRow('claim_assist_signups', { ...signup, source: 'myproproducts.com/claimassist' });
}
