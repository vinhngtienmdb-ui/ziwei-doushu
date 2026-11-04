import { redirect } from 'next/navigation';

export default function TrangTuViNam() {
  redirect(`/tu-vi-nam/${new Date().getFullYear()}`);
}
