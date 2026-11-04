'use client';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  MUC_DICH, chiCuaNam, danhGiaNgay, thongTinNgay, type KhoaMucDich, type NhanDiem,
} from '@/lib/lich/ngay';
import { CON_GIAP, DIA_CHI, THIEN_CAN } from '@/lib/lich/thuat-ngu-lich';

const hai = (n: number) => String(n).padStart(2, '0');
const CAC_THU = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const MAU_NHAN: Record<NhanDiem, { nen: string; vien: string; chu: string }> = {
  'Rất tốt': { nen: 'color-mix(in srgb, var(--hoa-loc) 22%, transparent)', vien: 'var(--hoa-loc)', chu: 'var(--hoa-loc)' },
  'Tốt': { nen: 'color-mix(in srgb, var(--hoa-loc) 10%, transparent)', vien: 'var(--hoa-loc)', chu: 'var(--hoa-loc)' },
  'Bình thường': { nen: 'transparent', vien: 'var(--bdr-med)', chu: 'var(--tx-3)' },
  'Xấu': { nen: 'color-mix(in srgb, var(--hoa-ky) 10%, transparent)', vien: 'var(--hoa-ky)', chu: 'var(--hoa-ky)' },
  'Nên tránh': { nen: 'color-mix(in srgb, var(--hoa-ky) 22%, transparent)', vien: 'var(--hoa-ky)', chu: 'var(--hoa-ky)' },
};

function soNgayTrongThang(thang: number, nam: number) {
  return new Date(Date.UTC(nam, thang, 0)).getUTCDate();
}

/** Thứ của ngày mùng 1, đổi để thứ hai là cột đầu (0 = thứ hai). */
function cotDauThang(thang: number, nam: number) {
  const chuNhat0 = new Date(Date.UTC(nam, thang - 1, 1)).getUTCDay();
  return (chuNhat0 + 6) % 7;
}

function tenNamAm(nam: number) {
  const chi = (((nam + 8) % 12) + 12) % 12;
  return `${THIEN_CAN[(((nam + 6) % 10) + 10) % 10]} ${DIA_CHI[chi]} (${CON_GIAP[chi]})`;
}

const kieuChon = {
  padding: '8px 10px', borderRadius: 8, fontSize: 15, border: '1px solid var(--bdr-heavy)',
  background: 'var(--bg-0)', color: 'var(--tx-1)',
} as const;

function NoiDungTrangLich() {
  const thamSo = useSearchParams();
  const homNay = useMemo(() => {
    const d = new Date();
    return { ngay: d.getDate(), thang: d.getMonth() + 1, nam: d.getFullYear() };
  }, []);

  const [thang, setThang] = useState(() => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(thamSo.get('ngay') ?? '');
    return m ? Number(m[2]) : homNay.thang;
  });
  const [nam, setNam] = useState(() => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(thamSo.get('ngay') ?? '');
    return m ? Number(m[1]) : homNay.nam;
  });
  const [ngayChon, setNgayChon] = useState(() => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(thamSo.get('ngay') ?? '');
    return m ? Number(m[3]) : homNay.ngay;
  });
  const [mucDich, setMucDich] = useState<KhoaMucDich | ''>(() => {
    const md = thamSo.get('mucdich');
    return MUC_DICH.some((m) => m.khoa === md) ? (md as KhoaMucDich) : '';
  });
  const [namSinh, setNamSinh] = useState(thamSo.get('namsinh') ?? '');

  // Nhớ năm sinh ở trình duyệt để lần sau không phải nhập lại
  useEffect(() => {
    if (thamSo.get('namsinh')) return;
    try {
      const daLuu = localStorage.getItem('lich-nam-sinh');
      if (daLuu) setNamSinh(daLuu);
    } catch { /* trình duyệt chặn lưu trữ: bỏ qua */ }
  }, [thamSo]);
  useEffect(() => {
    try { localStorage.setItem('lich-nam-sinh', namSinh); } catch { /* bỏ qua */ }
  }, [namSinh]);

  const chiNamSinh = /^\d{4}$/.test(namSinh) && Number(namSinh) >= 1900 && Number(namSinh) <= 2100 ? chiCuaNam(Number(namSinh)) : undefined;

  const soNgay = soNgayTrongThang(thang, nam);
  const cacNgay = useMemo(() => {
    return Array.from({ length: soNgay }, (_, i) => {
      const tt = thongTinNgay(i + 1, thang, nam);
      return { tt, dg: danhGiaNgay(tt, mucDich || undefined, chiNamSinh) };
    });
  }, [soNgay, thang, nam, mucDich, chiNamSinh]);

  // Đồng bộ lựa chọn lên đường dẫn để chia sẻ được
  useEffect(() => {
    const p = new URLSearchParams();
    p.set('ngay', `${nam}-${hai(thang)}-${hai(Math.min(ngayChon, soNgay))}`);
    if (mucDich) p.set('mucdich', mucDich);
    if (chiNamSinh !== undefined) p.set('namsinh', namSinh);
    window.history.replaceState(null, '', `/lich?${p.toString()}`);
  }, [nam, thang, ngayChon, mucDich, namSinh, chiNamSinh, soNgay]);

  const chuyenThang = (delta: number) => {
    let m = thang + delta;
    let y = nam;
    if (m < 1) { m = 12; y -= 1; }
    if (m > 12) { m = 1; y += 1; }
    if (y < 1901 || y > 2099) return;
    setThang(m);
    setNam(y);
  };

  const ngayDangXem = Math.min(ngayChon, soNgay);
  const chon = cacNgay[ngayDangXem - 1];
  const dau = cotDauThang(thang, nam);
  const ngayTot = mucDich
    ? cacNgay.filter((n) => n.dg.diem >= 2).sort((a, b) => b.dg.diem - a.dg.diem).slice(0, 8)
    : [];
  const tenMucDich = MUC_DICH.find((m) => m.khoa === mucDich)?.ten;

  const khung = { padding: 16, borderRadius: 12, border: '1px solid var(--bdr-med)', background: 'var(--bg-card)' } as const;

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px 64px', color: 'var(--tx-1)' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Lịch vạn niên Việt Nam · Xem ngày tốt xấu</h1>
      <p style={{ color: 'var(--tx-2)', marginBottom: 20, lineHeight: 1.7 }}>
        Âm lịch và tiết khí tính theo múi giờ GMT+7. Việc nên làm, kiêng kỵ và đánh giá ngày dựa trên quy tắc cổ truyền, chỉ để tham khảo.
      </p>

      {/* Bộ lọc */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 20, alignItems: 'flex-end' }}>
        <label style={{ display: 'grid', gap: 4, fontSize: 14, color: 'var(--tx-2)' }}>
          Xem ngày tốt cho
          <select value={mucDich} onChange={(e) => setMucDich(e.target.value as KhoaMucDich | '')} style={kieuChon} className="chon-ngay">
            <option value="">Chung (không chọn việc)</option>
            {MUC_DICH.map((m) => <option key={m.khoa} value={m.khoa}>{m.ten}</option>)}
          </select>
        </label>
        <label style={{ display: 'grid', gap: 4, fontSize: 14, color: 'var(--tx-2)' }}>
          Năm sinh của bạn (để xét hợp, xung tuổi)
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="Ví dụ 1990"
            value={namSinh}
            onChange={(e) => setNamSinh(e.target.value.replace(/\D/g, ''))}
            style={{ ...kieuChon, width: 160 }}
          />
        </label>
        {chiNamSinh !== undefined && (
          <p style={{ margin: 0, paddingBottom: 8, fontSize: 15 }}>Tuổi {tenNamAm(Number(namSinh))}</p>
        )}
      </div>

      {/* Điều khiển tháng */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <button type="button" onClick={() => chuyenThang(-1)} aria-label="Tháng trước" style={{ ...kieuChon, cursor: 'pointer' }}>‹</button>
        <select aria-label="Tháng" value={thang} onChange={(e) => setThang(Number(e.target.value))} style={kieuChon} className="chon-ngay">
          {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>)}
        </select>
        <select aria-label="Năm" value={nam} onChange={(e) => setNam(Number(e.target.value))} style={kieuChon} className="chon-ngay">
          {Array.from({ length: 199 }, (_, i) => 1901 + i).map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <button type="button" onClick={() => chuyenThang(1)} aria-label="Tháng sau" style={{ ...kieuChon, cursor: 'pointer' }}>›</button>
        <button
          type="button"
          onClick={() => { setThang(homNay.thang); setNam(homNay.nam); setNgayChon(homNay.ngay); }}
          style={{ ...kieuChon, cursor: 'pointer' }}
        >
          Hôm nay
        </button>
        <span style={{ marginLeft: 'auto', fontSize: 15, color: 'var(--tx-2)' }}>
          Năm {tenNamAm(cacNgay[0]?.tt.am.nam ?? nam)}
        </span>
      </div>

      {/* Lưới tháng */}
      <div role="grid" aria-label={`Lịch tháng ${thang} năm ${nam}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 4 }}>
        {CAC_THU.map((t, i) => (
          <div key={t} role="columnheader" style={{ textAlign: 'center', padding: '6px 0', fontWeight: 600, fontSize: 14, color: i >= 5 ? 'var(--hoa-ky)' : 'var(--tx-2)' }}>{t}</div>
        ))}
        {Array.from({ length: dau }, (_, i) => <div key={`trong-${i}`} aria-hidden="true" />)}
        {cacNgay.map(({ tt, dg }, i) => {
          const ngay = i + 1;
          const mau = MAU_NHAN[dg.nhan];
          const dangChon = ngay === ngayDangXem;
          const amHienThi = tt.am.ngay === 1 ? `${tt.am.ngay}/${tt.am.thang}${tt.am.nhuan ? ' nhuận' : ''}` : String(tt.am.ngay);
          return (
            <button
              key={ngay}
              type="button"
              role="gridcell"
              aria-selected={dangChon}
              aria-label={`${tt.thuTrongTuan} ${ngay} tháng ${thang}, âm lịch ${tt.am.ngay} tháng ${tt.am.thang}, ${dg.nhan}`}
              onClick={() => setNgayChon(ngay)}
              style={{
                minHeight: 64, padding: '6px 4px', borderRadius: 8, cursor: 'pointer', textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
                border: `${dangChon ? 2 : 1}px solid ${dangChon ? 'var(--ac)' : mau.vien}`,
                background: mau.nen, color: 'var(--tx-1)',
                outline: ngay === homNay.ngay && thang === homNay.thang && nam === homNay.nam ? '2px dotted var(--ac)' : 'none',
                outlineOffset: 2,
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>{ngay}</span>
              <span style={{ fontSize: 12, color: 'var(--tx-2)' }}>{amHienThi}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: mau.chu }} className="hidden sm:inline">
                {tt.than.hoangDao ? '● ' : '○ '}{dg.nhan === 'Bình thường' ? '' : dg.nhan}
              </span>
            </button>
          );
        })}
      </div>
      <p style={{ marginTop: 10, fontSize: 14, color: 'var(--tx-3)' }}>
        ● Hoàng đạo · ○ Hắc đạo · Màu xanh là ngày tốt, màu đỏ là ngày xấu
        {tenMucDich ? ` (đánh giá cho việc "${tenMucDich}")` : ''}.
      </p>

      {/* Ngày tốt cho việc đã chọn */}
      {mucDich && (
        <section style={{ ...khung, marginTop: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Ngày tốt trong tháng cho việc &quot;{tenMucDich}&quot;</h2>
          {ngayTot.length === 0 ? (
            <p style={{ color: 'var(--tx-2)' }}>Tháng này chưa có ngày nào đạt mức tốt cho việc này. Hãy xem tháng khác.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ngayTot.map(({ tt, dg }) => (
                <button
                  key={tt.duong.ngay}
                  type="button"
                  onClick={() => setNgayChon(tt.duong.ngay)}
                  style={{ ...kieuChon, cursor: 'pointer', borderColor: 'var(--hoa-loc)' }}
                >
                  {tt.thuTrongTuan} {hai(tt.duong.ngay)}/{hai(thang)} · {dg.nhan} ({dg.diem > 0 ? '+' : ''}{dg.diem})
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Chi tiết ngày */}
      {chon && (
        <section style={{ ...khung, marginTop: 20 }} aria-live="polite">
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
            {chon.tt.thuTrongTuan}, {hai(ngayDangXem)}/{hai(thang)}/{nam}
          </h2>
          <p style={{ color: 'var(--tx-2)', marginBottom: 12, lineHeight: 1.7 }}>
            Âm lịch: ngày {chon.tt.am.ngay} tháng {chon.tt.am.thang}{chon.tt.am.nhuan ? ' nhuận' : ''} năm {tenNamAm(chon.tt.am.nam)}
            {chon.tt.tietKhi ? ` · Tiết ${chon.tt.tietKhi}` : ''}
            <br />
            Ngày {chon.tt.canChiNgay} · Tháng {chon.tt.canChiThang} · Năm {chon.tt.canChiNam}
          </p>

          <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 999, fontWeight: 700, marginBottom: 12, border: `2px solid ${MAU_NHAN[chon.dg.nhan].vien}`, color: MAU_NHAN[chon.dg.nhan].chu, background: MAU_NHAN[chon.dg.nhan].nen }}>
            {chon.dg.nhan} ({chon.dg.diem > 0 ? '+' : ''}{chon.dg.diem} điểm)
          </div>
          <ul style={{ margin: '0 0 16px', paddingLeft: 20, lineHeight: 1.8, fontSize: 15 }}>
            {chon.dg.lyDo.map((ly) => <li key={ly}>{ly}</li>)}
          </ul>

          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: 16 }}>
            <p style={{ margin: 0 }}><strong>{chon.tt.than.hoangDao ? 'Hoàng đạo' : 'Hắc đạo'}:</strong> {chon.tt.than.ten}</p>
            <p style={{ margin: 0 }}><strong>Trực:</strong> {chon.tt.truc.ten}</p>
            <p style={{ margin: 0 }}><strong>Nhị thập bát tú:</strong> {chon.tt.tu.ten}</p>
            <p style={{ margin: 0 }}><strong>Con giáp xung:</strong> {chon.tt.conGiapXung}</p>
            {chon.tt.ngayDacBiet.length > 0 && <p style={{ margin: 0, color: 'var(--hoa-ky)' }}><strong>Lưu ý:</strong> {chon.tt.ngayDacBiet.join(', ')}</p>}
          </div>

          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Giờ trong ngày (giờ Hoàng đạo tô màu xanh)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 6, marginBottom: 16 }}>
            {chon.tt.gio.map((g) => (
              <div
                key={g.chi}
                style={{
                  padding: '6px 10px', borderRadius: 8, fontSize: 14,
                  border: `1px solid ${g.hoangDao ? 'var(--hoa-loc)' : 'var(--bdr-med)'}`,
                  background: g.hoangDao ? 'color-mix(in srgb, var(--hoa-loc) 10%, transparent)' : 'transparent',
                }}
              >
                <strong>Giờ {g.chi}</strong> <span style={{ color: 'var(--tx-2)' }}>{g.khungGio}</span>
                <div style={{ color: g.hoangDao ? 'var(--hoa-loc)' : 'var(--tx-3)' }}>{g.than}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: 'var(--hoa-loc)' }}>Việc nên làm</h3>
              <p style={{ margin: 0, lineHeight: 1.8 }}>{chon.tt.viecNen.join(' · ') || 'Không ghi'}</p>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: 'var(--hoa-ky)' }}>Việc kiêng kỵ</h3>
              <p style={{ margin: 0, lineHeight: 1.8 }}>{chon.tt.viecKy.join(' · ') || 'Không ghi'}</p>
            </div>
          </div>

          <details style={{ marginTop: 16 }}>
            <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Cát thần và hung thần trong ngày</summary>
            <p style={{ lineHeight: 1.8, marginTop: 8 }}><strong style={{ color: 'var(--hoa-loc)' }}>Cát thần:</strong> {chon.tt.catThan.join(', ') || 'Không có'}</p>
            <p style={{ lineHeight: 1.8 }}><strong style={{ color: 'var(--hoa-ky)' }}>Hung thần:</strong> {chon.tt.hungThan.join(', ') || 'Không có'}</p>
          </details>
        </section>
      )}

      <p style={{ marginTop: 20, fontSize: 14, color: 'var(--tx-3)', lineHeight: 1.7 }}>
        Việc nên làm, kiêng kỵ, cát thần và hung thần lấy từ bảng lịch vạn niên truyền thống; ở rất ít ngày có tiết khí rơi vào khoảng 23:00–24:00 giờ Việt Nam, các bảng này có thể khác một chút so với lịch Việt.
        Mọi đánh giá chỉ để tham khảo, không thay thế quyết định của bạn.
      </p>
    </main>
  );
}

export default function TrangLich() {
  return (
    <Suspense fallback={null}>
      <NoiDungTrangLich />
    </Suspense>
  );
}
