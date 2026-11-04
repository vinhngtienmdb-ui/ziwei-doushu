'use client';
import { useEffect, useMemo, useState } from 'react';
import BirthForm, { type BirthFormState } from '@/components/BirthForm';
import { generateChart } from '@/lib/ziwei/algorithm';
import { formToBirthInfo } from '@/lib/ziwei/share';
import { tinhVanHan, lietKeThangCuaNamAm, type TangVan, type TangVanKetQua, type TuHoaVan, type VanHanKetQua } from '@/lib/ziwei/van-han';
import { soNgayJulius, ngayTuSoJulius } from '@/lib/lich/am-lich-viet';
import { tenCung, tenSao, tenTuHoa, tenThienCan, tenDiaChi, tenNamAmLich } from '@/lib/ziwei/thuat-ngu';
import { docLuongVanBan } from '@/lib/ziwei/sse';
import type { BirthInfo, ZiweiChart } from '@/lib/ziwei/types';

interface LaSoDaLuu { id: string; ten: string; bieuMau: BirthFormState }

const hai = (n: number) => String(n).padStart(2, '0');
const khung = { padding: 16, borderRadius: 12, border: '1px solid var(--bdr-med)', background: 'var(--bg-card)' } as const;
const kieuChon = { padding: '8px 10px', borderRadius: 8, fontSize: 15, border: '1px solid var(--bdr-heavy)', background: 'var(--bg-0)', color: 'var(--tx-1)' } as const;
const TEN_TANG: Record<TangVan, string> = { nam: 'Năm', thang: 'Tháng', ngay: 'Ngày' };
const MAU_HOA: Record<string, string> = { '禄': 'var(--hoa-loc)', '权': 'var(--hoa-quyen)', '科': 'var(--hoa-khoa)', '忌': 'var(--hoa-ky)' };

function homNay() {
  const d = new Date();
  return `${d.getFullYear()}-${hai(d.getMonth() + 1)}-${hai(d.getDate())}`;
}

function BangTuHoa({ ds }: { ds: TuHoaVan[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
      {ds.map((h) => (
        <li key={h.loai} style={{ fontSize: 15 }}>
          <strong style={{ color: MAU_HOA[h.loai] }}>{tenTuHoa(h.loai, { kemChuHan: false })}</strong>{' '}
          {tenSao(h.sao, { kemChuHan: false })}
          {h.tenCungGoc && <span style={{ color: 'var(--tx-2)' }}> · đang ở cung {tenCung(h.tenCungGoc, { kemChuHan: false })}</span>}
        </li>
      ))}
    </ul>
  );
}

function TheTang({ ten, t }: { ten: string; t: TangVanKetQua }) {
  return (
    <section style={khung} aria-label={ten}>
      <h3 style={{ margin: '0 0 4px', fontSize: 18 }}>{ten}</h3>
      <p style={{ margin: '0 0 12px', color: 'var(--tx-2)', fontSize: 15, lineHeight: 1.6 }}>
        Mệnh vận ở <strong>{tenThienCan(t.canIndex)} {tenDiaChi(t.chiIndex)}</strong>, trùng cung <strong>{tenCung(t.cungGocTaiMenh, { kemChuHan: false })}</strong> của lá số gốc.
      </p>
      <BangTuHoa ds={t.tuHoa} />
      <details style={{ marginTop: 12 }}>
        <summary style={{ cursor: 'pointer', fontSize: 14, color: 'var(--ac)' }}>Xem 12 cung của tầng vận này</summary>
        <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 4, fontSize: 14 }}>
          {t.muoiHaiCung.map((c) => (
            <li key={c.chi}>{tenCung(c.tenCungVan, { kemChuHan: false })} vận → {tenCung(c.tenCungGoc, { kemChuHan: false })} ({tenDiaChi(c.chi)})</li>
          ))}
        </ul>
      </details>
    </section>
  );
}

const nutNho = (dangChon: boolean) => ({
  ...kieuChon, padding: '6px 10px', fontSize: 14, cursor: 'pointer',
  borderColor: dangChon ? 'var(--ac)' : 'var(--bdr-heavy)', color: dangChon ? 'var(--ac)' : 'var(--tx-1)', fontWeight: dangChon ? 600 : 400,
}) as const;

/** Chọn nhanh: tầng Năm có nút sang năm trước/sau; tầng Tháng có dải tháng âm lịch của năm; tầng Ngày thêm lưới ngày của tháng đang xem. */
function BoChonNhanh({ vh, tang, chon }: { vh: VanHanKetQua; tang: TangVan; chon: (ngay: number, thang: number, nam: number) => void }) {
  const cacThang = useMemo(() => lietKeThangCuaNamAm(vh.am.nam), [vh.am.nam]);
  const thangHienTai = cacThang.find((t) => t.thang === vh.am.thang && t.nhuan === vh.am.nhuan);
  const cacNgay = useMemo(() => {
    if (!thangHienTai) return [];
    const goc = soNgayJulius(thangHienTai.mungMot.ngay, thangHienTai.mungMot.thang, thangHienTai.mungMot.nam);
    return Array.from({ length: thangHienTai.soNgay }, (_, i) => {
      const [d, m, nam] = ngayTuSoJulius(goc + i);
      return { amNgay: i + 1, d, m, nam };
    });
  }, [thangHienTai]);

  const sangNam = (delta: number) => {
    // Giữ nguyên ngày âm lịch nếu năm kia có, không thì về mùng một của tháng đó
    const namMoi = vh.am.nam + delta;
    const thangKia = lietKeThangCuaNamAm(namMoi).find((t) => t.thang === vh.am.thang && t.nhuan === vh.am.nhuan) ?? lietKeThangCuaNamAm(namMoi)[0];
    if (!thangKia) return;
    const goc = soNgayJulius(thangKia.mungMot.ngay, thangKia.mungMot.thang, thangKia.mungMot.nam);
    const [d, m, nam] = ngayTuSoJulius(goc + Math.min(vh.am.ngay, thangKia.soNgay) - 1);
    chon(d, m, nam);
  };

  return (
    <section style={{ ...khung, display: 'grid', gap: 12 }} aria-label="Chọn nhanh">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <button type="button" onClick={() => sangNam(-1)} style={nutNho(false)} aria-label="Năm âm lịch trước">‹ Năm trước</button>
        <strong>Năm {tenNamAmLich(vh.am.nam)}</strong>
        <button type="button" onClick={() => sangNam(1)} style={nutNho(false)} aria-label="Năm âm lịch sau">Năm sau ›</button>
      </div>
      {tang !== 'nam' && (
        <div role="group" aria-label="Tháng âm lịch" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {cacThang.map((t) => (
            <button
              key={`${t.thang}-${t.nhuan}`}
              type="button"
              aria-pressed={t === thangHienTai}
              onClick={() => chon(t.mungMot.ngay, t.mungMot.thang, t.mungMot.nam)}
              style={nutNho(t === thangHienTai)}
            >
              Tháng {t.thang}{t.nhuan ? ' nhuận' : ''}
            </button>
          ))}
        </div>
      )}
      {tang === 'ngay' && (
        <div role="group" aria-label="Ngày âm lịch" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: 6 }}>
          {cacNgay.map((o) => {
            const dangChon = o.amNgay === vh.am.ngay;
            return (
              <button key={o.amNgay} type="button" aria-pressed={dangChon} onClick={() => chon(o.d, o.m, o.nam)} style={{ ...nutNho(dangChon), display: 'grid', padding: '4px 6px', textAlign: 'center' }}>
                <span style={{ fontSize: 16 }}>{o.amNgay}</span>
                <span style={{ fontSize: 11, color: 'var(--tx-3)' }}>{hai(o.d)}/{hai(o.m)}</span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function TrangVanHan() {
  const [daDangNhap, setDaDangNhap] = useState<boolean | null>(null);
  const [laSoDaLuu, setLaSoDaLuu] = useState<LaSoDaLuu[]>([]);
  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [tenLaSo, setTenLaSo] = useState('');
  const [loi, setLoi] = useState<string | null>(null);
  const [ngay, setNgay] = useState(homNay);
  const [tang, setTang] = useState<TangVan>('nam');
  const [vanBan, setVanBan] = useState('');
  const [dangGoi, setDangGoi] = useState(false);

  useEffect(() => {
    fetch('/api/la-so')
      .then(async (r) => {
        if (!r.ok) { setDaDangNhap(false); return; }
        const d = (await r.json()) as { laSo: LaSoDaLuu[] };
        setLaSoDaLuu(d.laSo);
        setDaDangNhap(true);
      })
      .catch(() => setDaDangNhap(false));
  }, []);

  const chonLaSo = (l: LaSoDaLuu) => {
    try {
      setChart(generateChart(formToBirthInfo(l.bieuMau)));
      setTenLaSo(l.ten);
      setLoi(null);
      setVanBan('');
    } catch {
      setLoi('Không lập lại được lá số từ dữ liệu đã lưu.');
    }
  };

  const [n, t, y] = useMemo(() => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ngay);
    return m ? [Number(m[3]), Number(m[2]), Number(m[1])] : [0, 0, 0];
  }, [ngay]);
  const vh = useMemo(() => (chart && y >= 1901 && y <= 2099 ? tinhVanHan(chart, n, t, y) : null), [chart, n, t, y]);

  const hoiAi = async () => {
    if (!chart || !vh) return;
    setDangGoi(true);
    setVanBan('');
    try {
      const res = await fetch('/api/van-han', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chart, ngay: n, thang: t, nam: y, tang }),
      });
      if (!res.ok || !res.body) {
        setVanBan(
          res.status === 503 ? 'Chưa cấu hình khóa API cho dịch vụ AI.'
            : res.status === 429 ? 'Bạn đã hỏi quá nhiều trong một giờ, vui lòng quay lại sau.'
            : 'Không luận giải được, vui lòng thử lại.',
        );
        return;
      }
      let tich = '';
      await docLuongVanBan(res.body, (doan) => { tich += doan; setVanBan(tich); });
    } catch {
      setVanBan('Không luận giải được, vui lòng thử lại.');
    } finally {
      setDangGoi(false);
    }
  };

  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 16px 64px', color: 'var(--tx-1)' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Vận hạn theo năm · tháng · ngày</h1>
      <p style={{ color: 'var(--tx-2)', marginBottom: 20, lineHeight: 1.7 }}>
        Chọn lá số của bạn và một ngày bất kỳ, hệ thống an lưu niên, lưu nguyệt, lưu nhật theo âm lịch Việt Nam (GMT+7) rồi chỉ ra Tứ Hóa của từng tầng vận đang rơi vào cung nào. Chỉ để tham khảo.
      </p>

      {!chart ? (
        <div style={{ display: 'grid', gap: 24 }}>
          {daDangNhap && laSoDaLuu.length > 0 && (
            <section style={khung}>
              <h2 style={{ fontSize: 18, margin: '0 0 12px' }}>Lá số đã lưu</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {laSoDaLuu.map((l) => (
                  <button key={l.id} type="button" onClick={() => chonLaSo(l)} style={{ ...kieuChon, cursor: 'pointer' }}>{l.ten}</button>
                ))}
              </div>
            </section>
          )}
          {daDangNhap === false && (
            <p style={{ ...khung, lineHeight: 1.7 }}>
              <a href="/api/auth/google?quay-lai=%2Fvan-han" style={{ color: 'var(--ac)' }}>Đăng nhập</a> để chọn nhanh lá số đã lưu, hoặc nhập ngày sinh bên dưới.
            </p>
          )}
          {loi && <p role="alert" style={{ color: 'var(--hoa-ky)' }}>{loi}</p>}
          <section>
            <h2 style={{ fontSize: 18, margin: '0 0 12px' }}>Nhập ngày sinh</h2>
            <BirthForm onSubmit={(info: BirthInfo) => { setChart(generateChart(info)); setTenLaSo(info.name || 'Lá số vừa nhập'); setVanBan(''); }} />
          </section>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <strong style={{ fontSize: 17 }}>{tenLaSo}</strong>
            <button type="button" onClick={() => { setChart(null); setVanBan(''); }} style={{ ...kieuChon, cursor: 'pointer' }}>Đổi lá số</button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
            <label style={{ display: 'grid', gap: 4, fontSize: 14, color: 'var(--tx-2)' }}>
              Ngày xem (dương lịch)
              <input type="date" value={ngay} min="1901-01-01" max="2099-12-31" onChange={(e) => { setNgay(e.target.value); setVanBan(''); }} style={kieuChon} />
            </label>
            <div role="tablist" aria-label="Tầng vận" style={{ display: 'flex', gap: 4 }}>
              {(['nam', 'thang', 'ngay'] as TangVan[]).map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={tang === k}
                  type="button"
                  onClick={() => { setTang(k); setVanBan(''); }}
                  style={{ ...kieuChon, cursor: 'pointer', borderColor: tang === k ? 'var(--ac)' : 'var(--bdr-heavy)', color: tang === k ? 'var(--ac)' : 'var(--tx-1)', fontWeight: tang === k ? 600 : 400 }}
                >
                  {TEN_TANG[k]}
                </button>
              ))}
            </div>
          </div>

          {!vh ? (
            <p role="alert" style={{ color: 'var(--hoa-ky)' }}>Ngày không hợp lệ hoặc ngoài phạm vi 1901–2099.</p>
          ) : (
            <>
              <BoChonNhanh vh={vh} tang={tang} chon={(d, m, nam) => { setNgay(`${nam}-${hai(m)}-${hai(d)}`); setVanBan(''); }} />
              <p style={{ ...khung, margin: 0, lineHeight: 1.7 }}>
                Ngày {vh.duong.ngay}/{vh.duong.thang}/{vh.duong.nam} dương lịch là ngày <strong>{vh.am.ngay} tháng {vh.am.nhuan ? 'nhuận ' : ''}{vh.am.thang} năm {tenNamAmLich(vh.am.nam)}</strong> âm lịch. Tuổi mụ: <strong>{vh.tuoiMu}</strong>.
                {vh.daiHan && <> Đại hạn {vh.daiHan.tuoiTu}–{vh.daiHan.tuoiDen} tuổi ở cung <strong>{tenCung(vh.daiHan.tenCungGoc, { kemChuHan: false })}</strong>.</>}
              </p>
              {vh.daiHan && (
                <section style={khung} aria-label="Đại hạn">
                  <h3 style={{ margin: '0 0 12px', fontSize: 18 }}>Tứ Hóa đại hạn</h3>
                  <BangTuHoa ds={vh.daiHan.tuHoa} />
                </section>
              )}
              <TheTang ten="Lưu niên (năm)" t={vh.nam} />
              {tang !== 'nam' && <TheTang ten="Lưu nguyệt (tháng)" t={vh.thang} />}
              {tang === 'ngay' && <TheTang ten="Lưu nhật (ngày)" t={vh.ngay} />}

              <section style={khung}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 18 }}>AI luận giải vận hạn {TEN_TANG[tang].toLowerCase()}</h3>
                  <button type="button" disabled={dangGoi} onClick={hoiAi} style={{ ...kieuChon, cursor: dangGoi ? 'wait' : 'pointer', borderColor: 'var(--ac)', color: 'var(--ac)' }}>
                    {dangGoi ? 'Đang luận giải…' : vanBan ? 'Luận giải lại' : 'Luận giải'}
                  </button>
                </div>
                {vanBan && <div style={{ whiteSpace: 'pre-wrap', fontSize: 17, lineHeight: 1.8 }}>{vanBan}</div>}
              </section>
            </>
          )}
        </div>
      )}
    </main>
  );
}
