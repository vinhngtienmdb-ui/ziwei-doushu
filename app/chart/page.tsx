'use client';
import { useState } from 'react';
import BirthForm from '@/components/BirthForm';
import ChartBoard from '@/components/ChartBoard';
import ChartSummary, { type PhanTomTat } from '@/components/ChartSummary';
import InsightPanel from '@/components/InsightPanel';
import { generateChart } from '@/lib/ziwei/algorithm';
import type { BirthInfo, ZiweiChart, Palace } from '@/lib/ziwei/types';

const CAC_THE: { khoa: PhanTomTat | 'ai'; nhan: string }[] = [
  { khoa: 'tong-quan', nhan: 'Tổng quan' },
  { khoa: 'cach-cuc', nhan: 'Cách cục' },
  { khoa: 'dai-han', nhan: 'Đại hạn' },
  { khoa: 'ai', nhan: 'AI luận giải' },
];

/**
 * 命盘页 —— 开源版「排盘引擎 Demo」
 *
 * 这是一个最小可运行示例：用本仓库的排盘引擎 generateChart() 配合基础 UI
 * 组件，渲染一张完整紫微命盘 + 基础解读，并支持本命 / 大限 / 流年切换。
 *
 * 说明：线上商业版的完整交互界面（重设计的新 UI、AI 流式解读、合盘、分享
 * 卡片等）不在开源范围内；但排盘内核——安星算法、四化、格局识别、古籍库——
 * 完全开放（见 lib/ziwei/*），可自由二次开发出你自己的界面。
 */
export default function ChartPage() {
  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [theDangMo, setTheDangMo] = useState<PhanTomTat | 'ai'>('tong-quan');

  // ── 未起盘：展示出生信息表单 ──
  if (!chart) {
    return (
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Lập lá số Tử Vi Đẩu Số</h1>
        <p style={{ color: '#888', marginBottom: 32, fontSize: 14, lineHeight: 1.7 }}>
          Nhập ngày giờ sinh, bộ máy an sao mã nguồn mở sẽ lập lá số ngay.
          <br />
          (Trang này chỉ là bản trình diễn của bộ máy; giao diện thương mại đầy đủ không thuộc phạm vi mã nguồn mở. Phần lõi an sao được công khai hoàn toàn.)
        </p>
        <BirthForm onSubmit={(info: BirthInfo) => setChart(generateChart(info))} />
      </main>
    );
  }

  // ── 已起盘：命盘 + 解读 ──
  return (
    <main style={{ maxWidth: 1480, margin: '0 auto', padding: '24px 16px' }}>
      <button
        type="button"
        onClick={() => { setChart(null); setSelectedPalace(null); }}
        style={{
          marginBottom: 16, padding: '6px 14px', cursor: 'pointer',
          border: '1px solid #ccc', borderRadius: 8, background: 'transparent',
        }}
      >
        ← Lập lá số khác
      </button>

      <div
        className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,440px)]"
        style={{
          gap: 20, marginTop: 16, alignItems: 'start',
        }}
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
                  onClick={() => setTheDangMo(khoa)}
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
            {theDangMo === 'ai'
              ? <InsightPanel chart={chart} selectedPalace={selectedPalace} />
              : <ChartSummary chart={chart} phan={theDangMo} />}
          </div>
        </aside>
      </div>
    </main>
  );
}
