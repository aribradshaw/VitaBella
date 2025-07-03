// --- ActiveCampaign integration (restored) ---
const ACTIVE_CAMPAIGN_API_KEY = process.env.ACTIVE_CAMPAIGN_API_KEY;
const ACTIVE_CAMPAIGN_API_URL = process.env.ACTIVE_CAMPAIGN_API_URL || 'https://vitabella.api-us1.com/api/3/contacts';

interface ActiveCampaignContact {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  STATE?: string;
  PLATFORM_NAME?: string;
}

async function sendToActiveCampaign(contact: ActiveCampaignContact, listType: 'prospect' | 'waitlist' = 'prospect') {
  if (!ACTIVE_CAMPAIGN_API_KEY) throw new Error('Missing ACTIVE_CAMPAIGN_API_KEY');
  if (!ACTIVE_CAMPAIGN_API_URL) throw new Error('Missing ACTIVE_CAMPAIGN_API_URL');
  const listId = listType === 'prospect' ? 12 : 13;
  const tag = listType === 'prospect' ? '2025 Prospect | DOE' : '2025 Waitlist | DOE';

  // 1. Create or update the contact, including custom fields for STATE (ID: 18) and PLATFORM_NAME
  // Only allow valid state values for field 18
  const validStates = [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","District of Columbia"
  ];
  let stateValue = undefined;
  if (contact.STATE && typeof contact.STATE === 'string') {
    // Accept only exact match (case-insensitive)
    const found = validStates.find(s => s.toLowerCase() === contact.STATE!.toLowerCase());
    if (found) stateValue = found;
  }
  const contactRes = await fetch('https://vitabella.api-us1.com/api/3/contact/sync', {
    method: 'POST',
    headers: {
      'Api-Token': ACTIVE_CAMPAIGN_API_KEY as string,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contact: {
        email: contact.email,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        tags: [tag],
        fieldValues: [
          stateValue ? { field: '18', value: stateValue } : undefined, // Use field ID for State, only if valid
          contact.PLATFORM_NAME ? { field: 'PLATFORM_NAME', value: contact.PLATFORM_NAME } : undefined,
        ].filter(Boolean) as { field: string, value: string }[],
      },
    }),
  });
  const contactData = await contactRes.json();
  if (!contactRes.ok || !contactData.contact || !contactData.contact.id) {
    console.error('ActiveCampaign contact sync error:', contactData);
    throw new Error('ActiveCampaign contact sync error');
  }
  const contactId = contactData.contact.id;

  // 2. Subscribe the contact to the correct list
  const listRes = await fetch('https://vitabella.api-us1.com/api/3/contactLists', {
    method: 'POST',
    headers: {
      'Api-Token': ACTIVE_CAMPAIGN_API_KEY as string,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contactList: {
        list: String(listId),
        contact: String(contactId),
        status: 1,
      },
    }),
  });
  const listData = await listRes.json();
  if (!listRes.ok) {
    console.error('ActiveCampaign list subscribe error:', listData);
    throw new Error('ActiveCampaign list subscribe error');
  }
}

import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || '48837321';
const HUBSPOT_FORM_ID = process.env.HUBSPOT_FORM_ID || 'b32eadfd-bfa3-4b17-b36e-95e66b3b7317';
const HUBSPOT_REGION = process.env.HUBSPOT_REGION || 'na1';
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

async function verifyRecaptcha(token: string) {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
  });
  const data = await res.json();
  console.log('Google reCAPTCHA response:', data); // <-- Add this line
  return data.success && data.score !== undefined && data.score >= 0.5;
}

// async function sendThankYouEmail(email: string) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: process.env.SMTP_SECURE === 'true',
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });
//   await transporter.sendMail({
//     from: `Vita Bella <${FROM_EMAIL}>`,
//     to: email,
//     subject: 'Thank you for signing up!',
//     text: 'Thank you for signing up for the Vita Bella newsletter! We appreciate your interest.',
//     html: '<p>Thank you for signing up for the <b>Vita Bella</b> newsletter! We appreciate your interest.</p>',
//   });
// }

// async function sendAdminNotification(email: string) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: process.env.SMTP_SECURE === 'true',
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });
//   await transporter.sendMail({
//     from: `Vita Bella <${FROM_EMAIL}>`,
//     to: ADMIN_EMAIL,
//     subject: 'New Newsletter Signup',
//     text: `New newsletter signup: ${email}`,
//     html: `<p>New newsletter signup: <b>${email}</b></p>`,
//   });
// }

// async function saveToCSV(email: string) {
//   const header = 'email,signed_up_at\n';
//   const row = `${email},${new Date().toISOString()}\n`;
//   try {
//     await fs.access(CSV_PATH);
//   } catch {
//     await fs.mkdir(path.dirname(CSV_PATH), { recursive: true });
//     await fs.writeFile(CSV_PATH, header, { flag: 'wx' });
//   }
//   await fs.appendFile(CSV_PATH, row);
// }


// Send data to HubSpot Forms API with tracking context
async function sendToHubSpot({ gender, firstname, lastname, email, phone, state, referral, hubspotutk, pageUrl, utm_source, utm_medium, utm_campaign, utm_term, utm_content }: {
  gender: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  state: string;
  referral: string;
  hubspotutk?: string;
  pageUrl?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}) {
  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
  const fields = [
    { name: 'gender', value: gender },
    { name: 'firstname', value: firstname },
    { name: 'lastname', value: lastname },
    { name: 'email', value: email },
    { name: 'phone', value: phone },
    { name: 'state', value: state },
    { name: 'referral', value: referral },
    utm_source ? { name: 'utm_source', value: utm_source } : undefined,
    utm_medium ? { name: 'utm_medium', value: utm_medium } : undefined,
    utm_campaign ? { name: 'utm_campaign', value: utm_campaign } : undefined,
    utm_term ? { name: 'utm_term', value: utm_term } : undefined,
    utm_content ? { name: 'utm_content', value: utm_content } : undefined,
  ].filter(Boolean) as { name: string, value: string }[];
  const context: any = {
    hutk: hubspotutk || undefined,
    pageUri: pageUrl || undefined,
    pageName: 'Membership Form',
  };
  if (utm_source) context.utm_source = utm_source;
  if (utm_medium) context.utm_medium = utm_medium;
  if (utm_campaign) context.utm_campaign = utm_campaign;
  if (utm_term) context.utm_term = utm_term;
  if (utm_content) context.utm_content = utm_content;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields, context }),
  });
  if (!res.ok) {
    const data = await res.json();
    console.error('HubSpot form error:', data);
    throw new Error('HubSpot form error');
  }
  return await res.json();
}

export async function POST(req: NextRequest) {
  try {
    const {
      email, recaptchaToken, gender, firstname, lastname, phone, state, referral, listType, STATE, PLATFORM_NAME,
      hubspotutk, pageUrl, utm_source, utm_medium, utm_campaign, utm_term, utm_content
    } = await req.json();
    if (!email || !recaptchaToken) {
      return NextResponse.json({ error: 'Missing email or recaptcha', received: { email, recaptchaToken } }, { status: 400 });
    }
    // 1. Verify recaptcha
    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`,
    });
    const recaptchaData = await recaptchaRes.json();
    if (!(recaptchaData.success && recaptchaData.score !== undefined && recaptchaData.score >= 0.2)) {
      return NextResponse.json({ error: 'Recaptcha failed', google: recaptchaData, received: { email, recaptchaToken } }, { status: 400 });
    }
    // 2. Send to HubSpot (with tracking context)
    await sendToHubSpot({
      gender, firstname, lastname, email, phone, state, referral,
      hubspotutk, pageUrl, utm_source, utm_medium, utm_campaign, utm_term, utm_content
    });
    // 3. Send to ActiveCampaign (optional: only if you want both)
    await sendToActiveCampaign(
      {
        email,
        firstName: firstname,
        lastName: lastname,
        phone,
        STATE: STATE || state,
        PLATFORM_NAME,
      },
      listType === 'waitlist' ? 'waitlist' : 'prospect'
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    let message = 'Unknown error';
    if (e && typeof e === 'object' && 'message' in e && typeof (e as any).message === 'string') {
      message = (e as { message: string }).message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
