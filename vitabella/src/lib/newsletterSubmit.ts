export async function newsletterSubmit(email: string, recaptchaToken: string) {
  const res = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, recaptchaToken }),
  });
  return res.json();
}
