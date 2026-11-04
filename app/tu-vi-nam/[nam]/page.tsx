import Link from 'next/link';
import { notFound } from 'next/navigation';
import { layTuViNam } from '@/lib/db/du-lieu';
import { khoangNamHopLe } from '@/lib/ziwei/tu-vi-nam';
import { tenNamAmLich } from '@/lib/ziwei/thuat-ngu';
import BangConGiap from './BangConGiap';

export const metadata = {
  title: 'Tử vi chung theo năm · Lá số Tử Vi',
  description: 'Xu hướng chung của năm cho mười hai con giáp theo Tử Vi Đẩu Số và lịch Việt Nam',
};

// Nội dung đọc từ cơ sở dữ liệu nên luôn dựng theo từng yêu cầu
export const dynamic = 'force-dynamic';

export default async function TrangTuViNamTheoNam({ params }: { params: Promise<{ nam: string }> }) {
  const { nam: namChuoi } = await params;
  const nam = Number(namChuoi);
  const [tu, den] = khoangNamHopLe(new Date().getFullYear());
  if (!Number.isInteger(nam) || nam < tu || nam > den) notFound();

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px 64px', color: 'var(--tx-1)' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Tử vi chung năm {tenNamAmLich(nam)}</h1>
      <p style={{ color: 'var(--tx-2)', marginBottom: 16, lineHeight: 1.7 }}>
        Xu hướng chung cho từng con giáp, dựa trên can chi của năm, Tứ Hóa lưu niên và quan hệ hợp xung của tuổi. Đây không phải lá số cá nhân; muốn xem sát hơn, hãy xem trang <Link href="/van-han" style={{ color: 'var(--ac)' }}>Vận hạn</Link> theo lá số của bạn. Chỉ để tham khảo.
      </p>
      <nav aria-label="Chọn năm" style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {Array.from({ length: den - tu + 1 }, (_, i) => tu + i).map((n) => (
          <Link key={n} href={`/tu-vi-nam/${n}`} aria-current={n === nam ? 'page' : undefined} style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${n === nam ? 'var(--ac)' : 'var(--bdr-heavy)'}`, color: n === nam ? 'var(--ac)' : 'var(--tx-1)', textDecoration: 'none' }}>
            {n}
          </Link>
        ))}
      </nav>
      <BangConGiap key={nam} nam={nam} daCo={layTuViNam(nam)} />
    </main>
  );
}
