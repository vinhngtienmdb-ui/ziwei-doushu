'use client';
import { useState } from 'react';
import { tenConGiap, tenDiaChi } from '@/lib/ziwei/thuat-ngu';

const khung = { padding: 16, borderRadius: 12, border: '1px solid var(--bdr-med)', background: 'var(--bg-card)' } as const;
const nut = { padding: '8px 12px', borderRadius: 8, fontSize: 15, border: '1px solid var(--ac)', background: 'var(--bg-0)', color: 'var(--ac)', cursor: 'pointer' } as const;

const THONG_BAO_LOI: Record<string, string> = {
  'chua-cau-hinh': 'Chưa cấu hình khóa API cho dịch vụ AI.',
  'qua-han-muc': 'Hôm nay đã sinh đủ số bài cho phép, vui lòng quay lại sau.',
  'khong-sinh-duoc': 'Chưa sinh được bài, vui lòng thử lại.',
};

function NoiDung({ chu }: { chu: string }) {
  return (
    <div style={{ fontSize: 17, lineHeight: 1.8 }}>
      {chu.split('\n').map((dong, i) => {
        const t = dong.replace(/\*+/g, '').trim();
        if (!t) return null;
        const m = /^【([^】]+)】[.:]?\s*(.*)$/.exec(t);
        // Bỏ dòng tiêu đề chung mà mô hình đôi khi tự thêm ở đầu bài
        if (!m && /^Tử vi năm\b/i.test(t)) return null;
        return m ? (
          <p key={i} style={{ margin: '8px 0' }}><strong style={{ color: 'var(--ac)' }}>{m[1]}.</strong> {m[2]}</p>
        ) : (
          <p key={i} style={{ margin: '8px 0' }}>{t}</p>
        );
      })}
    </div>
  );
}

export default function BangConGiap({ nam, daCo }: { nam: number; daCo: Record<number, string> }) {
  const [bai, setBai] = useState<Record<number, string>>(daCo);
  const [dang, setDang] = useState<number | null>(null);
  const [loi, setLoi] = useState<string | null>(null);

  const sinh = async (chi: number): Promise<boolean> => {
    setDang(chi);
    setLoi(null);
    try {
      const r = await fetch('/api/tu-vi-nam', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nam, chi }) });
      const d = (await r.json()) as { noiDung?: string; error?: string };
      if (!r.ok || !d.noiDung) {
        setLoi(THONG_BAO_LOI[d.error ?? ''] ?? 'Không tải được bài, vui lòng thử lại.');
        return false;
      }
      setBai((cu) => ({ ...cu, [chi]: d.noiDung as string }));
      return true;
    } catch {
      setLoi('Không tải được bài, vui lòng thử lại.');
      return false;
    } finally {
      setDang(null);
    }
  };

  const sinhHetCoConThieu = async () => {
    for (let chi = 0; chi < 12; chi++) {
      if (bai[chi]) continue;
      if (!(await sinh(chi))) break;
    }
  };

  const soThieu = 12 - Object.keys(bai).length;

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {soThieu > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <button type="button" onClick={sinhHetCoConThieu} disabled={dang !== null} style={{ ...nut, cursor: dang !== null ? 'wait' : 'pointer' }}>
            {dang !== null ? 'Đang viết…' : `Viết nốt ${soThieu} con giáp còn thiếu`}
          </button>
          <span style={{ color: 'var(--tx-2)', fontSize: 14 }}>Mỗi bài được viết một lần rồi lưu lại cho mọi người cùng đọc.</span>
        </div>
      )}
      {loi && <p role="alert" style={{ color: 'var(--hoa-ky)', margin: 0 }}>{loi}</p>}
      {Array.from({ length: 12 }, (_, chi) => (
        <section key={chi} id={`con-giap-${chi}`} style={khung} aria-label={`Tuổi ${tenDiaChi(chi)}`}>
          <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>Tuổi {tenDiaChi(chi)} · con {tenConGiap(chi)}</h2>
          {bai[chi] ? (
            <NoiDung chu={bai[chi]} />
          ) : (
            <button type="button" onClick={() => sinh(chi)} disabled={dang !== null} style={{ ...nut, cursor: dang !== null ? 'wait' : 'pointer' }}>
              {dang === chi ? 'Đang viết…' : 'Xem bài của tuổi này'}
            </button>
          )}
        </section>
      ))}
    </div>
  );
}
