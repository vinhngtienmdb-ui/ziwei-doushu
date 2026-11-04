import { nguonGocHopLe } from '@/lib/auth/phien';
import { SO_LAN_SINH_TOI_DA_MOI_NGAY, demLanSinhGanDay, layTuViNam, luuTuViNam } from '@/lib/db/du-lieu';
import { sinhVanBanClaude } from '@/lib/ai/luong-claude';
import { LOI_DAN_TU_VI_NAM, khoangNamHopLe, loiYeuCauTuViNam } from '@/lib/ziwei/tu-vi-nam';

// Một khóa (năm, con giáp) chỉ được sinh một lần tại một thời điểm, các yêu cầu trùng đợi cùng kết quả
const dangSinh = (globalThis as unknown as { __dangSinhTuVi?: Map<string, Promise<string | null>> });
dangSinh.__dangSinhTuVi ??= new Map();
const hangDoi = dangSinh.__dangSinhTuVi;

/** Lấy hoặc sinh tử vi chung của một con giáp trong một năm. Nội dung gửi lên: { nam, chi }. Không cần đăng nhập. */
export async function POST(request: Request) {
  if (!nguonGocHopLe(request)) return Response.json({ error: 'nguon-goc-khong-hop-le' }, { status: 403 });
  let nd: { nam?: unknown; chi?: unknown };
  try {
    nd = await request.json();
  } catch {
    return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });
  }
  const { nam, chi } = nd;
  const [tu, den] = khoangNamHopLe(new Date().getFullYear());
  if (typeof nam !== 'number' || !Number.isInteger(nam) || nam < tu || nam > den || typeof chi !== 'number' || !Number.isInteger(chi) || chi < 0 || chi > 11) {
    return Response.json({ error: 'du-lieu-khong-hop-le' }, { status: 400 });
  }

  const daCo = layTuViNam(nam)[chi];
  if (daCo) return Response.json({ noiDung: daCo });

  const khoa = `${nam}-${chi}`;
  let cho = hangDoi.get(khoa);
  if (!cho) {
    if (!process.env.ANTHROPIC_API_KEY) return Response.json({ error: 'chua-cau-hinh' }, { status: 503 });
    if (demLanSinhGanDay() >= SO_LAN_SINH_TOI_DA_MOI_NGAY) return Response.json({ error: 'qua-han-muc' }, { status: 429 });
    cho = sinhVanBanClaude(LOI_DAN_TU_VI_NAM, loiYeuCauTuViNam(nam, chi), 2000)
      .then((chu) => {
        if (chu) luuTuViNam(nam, chi, chu);
        return chu ? (layTuViNam(nam)[chi] ?? chu) : null;
      })
      .finally(() => hangDoi.delete(khoa));
    hangDoi.set(khoa, cho);
  }
  const noiDung = await cho;
  return noiDung ? Response.json({ noiDung }) : Response.json({ error: 'khong-sinh-duoc' }, { status: 502 });
}
