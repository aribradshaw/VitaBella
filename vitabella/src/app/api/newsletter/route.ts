import { NextRequest, NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
// import fs from 'fs/promises';
// import path from 'path';

// All secrets/keys are now loaded from environment variables for security.
// Use a .env.local file for local development.
const ACTIVE_CAMPAIGN_API_KEY = process.env.ACTIVE_CAMPAIGN_API_KEY;
const ACTIVE_CAMPAIGN_API_URL = process.env.ACTIVE_CAMPAIGN_API_URL || 'https://vitabella.api-us1.com/api/3/contacts';
const DOE_LIST_ID = process.env.DOE_LIST_ID;
// const CSV_PATH = path.resolve(process.cwd(), 'data/newsletter_signups.csv');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'aribradshawaz@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@vitabella.com';
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

// Accepts a second argument for list type: 'prospect' or 'waitlist'
// Ensures contact is created/updated, then explicitly subscribes to the correct list
async function sendToActiveCampaign(email: string, listType: 'prospect' | 'waitlist' = 'prospect') {
  if (!ACTIVE_CAMPAIGN_API_KEY) throw new Error('Missing ACTIVE_CAMPAIGN_API_KEY');
  if (!ACTIVE_CAMPAIGN_API_URL) throw new Error('Missing ACTIVE_CAMPAIGN_API_URL');
  const listId = listType === 'prospect' ? 12 : 13;
  const tag = listType === 'prospect' ? '2025 Prospect | DOE' : '2025 Waitlist | DOE';

  // 1. Create or update the contact
  const contactRes = await fetch('https://vitabella.api-us1.com/api/3/contact/sync', {
    method: 'POST',
    headers: {
      'Api-Token': ACTIVE_CAMPAIGN_API_KEY as string,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contact: {
        email,
        tags: [tag],
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

export async function POST(req: NextRequest) {
  try {
    const { email, recaptchaToken } = await req.json();
    // For browser debugging, echo back what we got
    if (!email || !recaptchaToken) {
      return NextResponse.json({ error: 'Missing email or recaptcha', received: { email, recaptchaToken } }, { status: 400 });
    }
    // 1. Verify recaptcha and capture the full response
    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`,
    });
    const recaptchaData = await recaptchaRes.json();
    // For browser debugging, always include the Google response if failed
    if (!(recaptchaData.success && recaptchaData.score !== undefined && recaptchaData.score >= 0.5)) {
      return NextResponse.json({ error: 'Recaptcha failed', google: recaptchaData, received: { email, recaptchaToken } }, { status: 400 });
    }
    // Always send newsletter signups to prospect list
    await sendToActiveCampaign(email, 'prospect');
    return NextResponse.json({ success: true });
  } catch (e) {
    let message = 'Unknown error';
    if (e && typeof e === 'object' && 'message' in e && typeof (e as any).message === 'string') {
      message = (e as { message: string }).message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
