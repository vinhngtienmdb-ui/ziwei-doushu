'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BirthForm, { type BirthFormState } from '@/components/BirthForm';
import ChartBoard from '@/components/ChartBoard';
import ChartSummary, { type PhanTomTat } from '@/components/ChartSummary';
import InsightPanel from '@/components/InsightPanel';
import { generateChart } from '@/lib/ziwei/algorithm';
import { formToBirthInfo } from '@/lib/ziwei/share';
import type { BirthInfo, ZiweiChart, Palace } from '@/lib/ziwei/types';

const CAC_THE: { khoa: PhanTomTat | 'ai'; nhan: string }[] = [
  { khoa: 'tong-quan', nhan: 'Tổng quan' },
  { khoa: 'cach-cuc', nhan: 'Cách cục' },
  { khoa: 'dai-han', nhan: 'Đại hạn' },
  { khoa: 'ai', nhan: 'AI luận giải' },
];

type TrangThaiLuu = 'chua-luu' | 'dang-luu' | 'da-luu' | 'loi' | 'day';

const kieuNutPhu = {
  padding: '6px 14px', cursor: 'pointer', borderRadius: 8, fontSize: 14, textDecoration: 'none',
  border: '1px solid var(--bdr-heavy)', background: 'transparent', color: 'var(--tx-1)',
} as const;

/** Tên gợi ý cho lá số: tên đã nhập, nếu bỏ trống thì dùng ngày sinh dd/mm/yyyy. */
function tenGoiY(bieuMau: BirthFormState): string {
  if (bieuMau.name.trim()) return bieuMau.name.trim();
  const hai = (v: string) => v.padStart(2, '0');
  return `Lá số ${hai(bieuMau.day)}/${hai(bieuMau.month)}/${bieuMau.year}`;
}

function NoiDungTrangLaSo() {
  const thamSo = useSearchParams();
  const maMo = thamSo.get('mo');

  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [theDangMo, setTheDangMo] = useState<PhanTomTat | 'ai'>('tong-quan');
  // Khung AI chỉ dựng khi mở lần đầu, sau đó giữ nguyên (chỉ ẩn) để không tự luận giải lại và mất cuộc trò chuyện
  const [aiDaMo, setAiDaMo] = useState(false);
  const [bieuMau, setBieuMau] = useState<BirthFormState | null>(null);
  const [laSoId, setLaSoId] = useState<string | null>(null);
  const [trangThaiLuu, setTrangThaiLuu] = useState<TrangThaiLuu>('chua-luu');
  const [daDangNhap, setDaDangNhap] = useState<boolean | null>(null);
  const [thongBaoMo, setThongBaoMo] = useState<string | null>(null);

  // Biết người dùng đã đăng nhập hay chưa để hiện nút lưu phù hợp
  useEffect(() => {
    fetch('/api/auth/toi')
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { nguoiDung: unknown } | null) => setDaDangNhap(!!d?.nguoiDung))
      .catch(() => setDaDangNhap(false));
  }, []);

  // Mở lá số đã lưu: /chart?mo=<mã>
  useEffect(() => {
    if (!maMo) return;
    let huy = false;
    fetch(`/api/la-so/${encodeURIComponent(maMo)}`)
      .then(async (r) => {
        if (r.status === 401) { setThongBaoMo('Hãy đăng nhập để mở lá số đã lưu.'); return; }
        if (!r.ok) { setThongBaoMo('Không tìm thấy lá số này trong tài khoản của bạn.'); return; }
        const { laSo } = (await r.json()) as { laSo: { bieuMau: BirthFormState } };
        if (huy) return;
        try {
          setChart(generateChart(formToBirthInfo(laSo.bieuMau)));
          setBieuMau(laSo.bieuMau);
          setLaSoId(maMo);
          setTrangThaiLuu('da-luu');
          if (thamSo.get('the') === 'ai') { setTheDangMo('ai'); setAiDaMo(true); }
        } catch {
          setThongBaoMo('Không lập lại được lá số từ dữ liệu đã lưu.');
        }
      })
      .catch(() => setThongBaoMo('Không tải được lá số, vui lòng thử lại.'));
    return () => { huy = true; };
  }, [maMo, thamSo]);

  const luuLaSo = async () => {
    if (!bieuMau) return;
    setTrangThaiLuu('dang-luu');
    try {
      const r = await fetch('/api/la-so', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ten: tenGoiY(bieuMau), bieuMau }),
      });
      if (r.status === 409) { setTrangThaiLuu('day'); return; }
      if (!r.ok) { setTrangThaiLuu('loi'); return; }
      const { id } = (await r.json()) as { id: string };
      setLaSoId(id);
      setTrangThaiLuu('da-luu');
    } catch {
      setTrangThaiLuu('loi');
    }
  };

  const lapLaSoKhac = () => {
    setChart(null);
    setSelectedPalace(null);
    setLaSoId(null);
    setAiDaMo(false);
    setTheDangMo('tong-quan');
    setTrangThaiLuu('chua-luu');
    setThongBaoMo(null);
    if (maMo) window.history.replaceState(null, '', '/chart');
  };

  // ── Chưa có lá số: biểu mẫu nhập ──
  if (!chart) {
    return (
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Lập lá số Tử Vi Đẩu Số</h1>
        <p style={{ color: 'var(--tx-3)', marginBottom: 32, fontSize: 14, lineHeight: 1.7 }}>
          Nhập ngày giờ sinh, bộ máy an sao mã nguồn mở sẽ lập lá số ngay.
          <br />
          (Trang này chỉ là bản trình diễn của bộ máy; giao diện thương mại đầy đủ không thuộc phạm vi mã nguồn mở. Phần lõi an sao được công khai hoàn toàn.)
        </p>
        {thongBaoMo && (
          <p role="alert" style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--bdr-heavy)', color: 'var(--tx-1)' }}>
            {thongBaoMo}{' '}
            {thongBaoMo.startsWith('Hãy đăng nhập') && (
              <a href={`/api/auth/google?quay-lai=${encodeURIComponent(`/chart?mo=${maMo ?? ''}`)}`} style={{ color: 'var(--ac)' }}>Đăng nhập</a>
            )}
          </p>
        )}
        <BirthForm
          onSubmit={(info: BirthInfo) => { setLaSoId(null); setTrangThaiLuu('chua-luu'); setChart(generateChart(info)); }}
          onFormSave={setBieuMau}
        />
      </main>
    );
  }

  // ── Đã có lá số: bàn lá số và các phần phân tích ──
  return (
    <main style={{ maxWidth: 1480, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <button type="button" onClick={lapLaSoKhac} style={kieuNutPhu}>← Lập lá số khác</button>

        {trangThaiLuu === 'da-luu' ? (
          <span style={{ fontSize: 14, color: 'var(--tx-2)' }}>
            Đã lưu vào tài khoản · <a href="/tai-khoan" style={{ color: 'var(--ac)' }}>xem các lá số đã lưu</a>
          </span>
        ) : daDangNhap ? (
          <button type="button" onClick={luuLaSo} disabled={trangThaiLuu === 'dang-luu' || !bieuMau} style={kieuNutPhu}>
            {trangThaiLuu === 'dang-luu' ? 'Đang lưu…' : 'Lưu lá số'}
          </button>
        ) : daDangNhap === false ? (
          <a href={`/api/auth/google?quay-lai=${encodeURIComponent('/chart')}`} style={kieuNutPhu}>Đăng nhập để lưu lá số</a>
        ) : null}

        {trangThaiLuu === 'loi' && <span role="alert" style={{ fontSize: 14, color: 'var(--hoa-ky)' }}>Lưu không thành công, vui lòng thử lại.</span>}
        {trangThaiLuu === 'day' && <span role="alert" style={{ fontSize: 14, color: 'var(--hoa-ky)' }}>Đã đủ số lá số được lưu. Hãy xóa bớt ở trang tài khoản.</span>}
      </div>

      <div
        className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,440px)]"
        style={{ gap: 20, marginTop: 16, alignItems: 'start' }}
      >
        <ChartBoard chart={chart} onPalaceSelect={setSelectedPalace} />
        <aside
          className="xl:sticky xl:top-16 xl:max-h-[calc(100vh-5rem)] xl:overflow-y-auto"
          style={{ minWidth: 0 }}
          aria-label="Phân tích lá số"
        >
          <div role="tablist" aria-label="Các phần phân tích" style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
            {CAC_THE.map(({ khoa, nhan }) => {
              const dangMo = theDangMo === khoa;
              return (
                <button
                  key={khoa}
                  role="tab"
                  type="button"
                  aria-selected={dangMo}
                  onClick={() => { setTheDangMo(khoa); if (khoa === 'ai') setAiDaMo(true); }}
                  style={{
                    padding: '8px 14px', borderRadius: 999, fontSize: 14, cursor: 'pointer',
                    border: '1px solid ' + (dangMo ? 'var(--ac)' : 'var(--bdr-heavy)'),
                    background: dangMo ? 'var(--ac-bg)' : 'transparent',
                    color: dangMo ? 'var(--ac)' : 'var(--tx-2)',
                    fontWeight: dangMo ? 600 : 400,
                  }}
                >
                  {nhan}
                </button>
              );
            })}
          </div>
          <div role="tabpanel">
            {theDangMo !== 'ai' && <ChartSummary chart={chart} phan={theDangMo} />}
            {aiDaMo && (
              <div hidden={theDangMo !== 'ai'}>
                <InsightPanel chart={chart} laSoId={laSoId} selectedPalace={selectedPalace} />
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

export default function ChartPage() {
  return (
    <Suspense fallback={null}>
      <NoiDungTrangLaSo />
    </Suspense>
  );
}
