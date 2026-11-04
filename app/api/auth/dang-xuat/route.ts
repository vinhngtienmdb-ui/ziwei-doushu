import { dangXuat, nguonGocHopLe } from '@/lib/auth/phien';

export async function POST(request: Request) {
  if (!nguonGocHopLe(request)) return Response.json({ error: 'nguon-goc-khong-hop-le' }, { status: 403 });
  await dangXuat();
  return new Response(null, { status: 204 });
}
