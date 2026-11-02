// MyPro Market SMS opt-in consent records.
// Rows go to the `sms_optin_consents` table in the MyPro Market Supabase project.
// The visitor's IP address and the timestamp are filled in by the database, not the browser.

import { insertPublicRow } from './supabaseInsert';

// Keep this identical to the SMS consent checkbox wording on the Market page,
// so each record stores exactly what the person agreed to.
export const SMS_CONSENT_TEXT =
  'I explicitly consent and agree to receive automated notifications, dispatches, and informational text messages (SMS) from MyPro Market regarding active jobs, dispatches, and property claim status updates at the mobile number provided. Message & data rates may apply. Msg frequency varies by active job. I can reply STOP at any time to opt-out.';

export interface SmsConsent {
  full_name: string;
  phone: string; // +1XXXXXXXXXX
  email: string;
  account_role: 'homeowner' | 'company' | 'contractor';
}

export function submitSmsConsent(consent: SmsConsent): Promise<void> {
  return insertPublicRow('sms_optin_consents', {
    ...consent,
    sms_consent: true,
    terms_accepted: true,
    privacy_accepted: true,
    consent_text: SMS_CONSENT_TEXT,
    user_agent: navigator.userAgent.slice(0, 500),
    source: 'myproproducts.com/market',
  });
}
