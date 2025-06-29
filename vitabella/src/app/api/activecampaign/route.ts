import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, state, listType } = await req.json() as {
    email: string;
    firstName: string;
    lastName: string;
    state: string;
    listType: string;
  };

  const apiKey = process.env.ACTIVECAMPAIGN_API_KEY;
  const apiUrl = process.env.ACTIVECAMPAIGN_API_URL;
  const prospectListId = process.env.ACTIVECAMPAIGN_PROSPECT_LIST_ID;
  const waitlistListId = process.env.ACTIVECAMPAIGN_WAITLIST_LIST_ID;

  if (!apiKey || !apiUrl || !prospectListId || !waitlistListId) {
    return NextResponse.json({ error: 'Missing ActiveCampaign configuration.' }, { status: 500 });
  }

  const listId = listType === 'prospect' ? prospectListId : waitlistListId;

  // Prepare ActiveCampaign API payload
  const contactPayload: Record<string, string | number> = {
    email,
    firstName,
    lastName,
    state,
  };
  contactPayload[`p[${listId}]`] = listId; // subscribe to list
  contactPayload[`status[${listId}]`] = 1; // 1 = active

  const payload = {
    contact: contactPayload
  };

  try {
    const res = await fetch(`${apiUrl}/api/3/contact/sync`, {
      method: 'POST',
      headers: {
        'Api-Token': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    let message = 'Unknown error';
    if (e && typeof e === 'object' && 'message' in e && typeof (e as any).message === 'string') {
      message = (e as { message: string }).message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
