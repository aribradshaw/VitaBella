// Utility to fetch Calendly availability using V2 API
export async function fetchCalendlyAvailability(userUri: string, apiKey: string) {
  // Example endpoint: https://api.calendly.com/scheduled_events
  // You may need to adjust endpoints for availability
  const url = `https://api.calendly.com/event_types?user=${encodeURIComponent(userUri)}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch Calendly data');
  return res.json();
}
