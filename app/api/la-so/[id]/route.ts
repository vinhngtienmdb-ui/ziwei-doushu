import { layNguoiDungHienTai, nguonGocHopLe } from '@/lib/auth/phien';
import { layLaSo, xoaLaSo } from '@/lib/db/du-lieu';

type NguCanh = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: NguCanh) {
  const nguoiDung = await layNguoiDungHienTai();
  if (!nguoiDung) return Response.json({ error: 'chua-dang-nhap' }, { status: 401 });
  const { id } = await params;
  const laSo = layLaSo(nguoiDung.id, id);
  if (!laSo) return Response.json({ error: 'khong-tim-thay' }, { status: 404 });
  return Response.json({ laSo }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function DELETE(request: Request, { params }: NguCanh) {
  if (!nguonGocHopLe(request)) return Response.json({ error: 'nguon-goc-khong-hop-le' }, { status: 403 });
  const nguoiDung = await layNguoiDungHienTai();
  if (!nguoiDung) return Response.json({ error: 'chua-dang-nhap' }, { status: 401 });
  const { id } = await params;
  return xoaLaSo(nguoiDung.id, id)
    ? new Response(null, { status: 204 })
    : Response.json({ error: 'khong-tim-thay' }, { status: 404 });
}
