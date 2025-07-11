import { redirect } from 'next/navigation';

export default function NotFound() {
  redirect('/dupr');
  return null;
}
