'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TRANG_KHONG_HIEN = ['/', '/preview'];

export default function SiteFooter() {
  const duongDan = usePathname();
  if (TRANG_KHONG_HIEN.includes(duongDan)) return null;

  const kieuLienKet = { color: 'var(--tx-2)', textDecoration: 'underline', textUnderlineOffset: 3 } as const;

  return (
    <footer style={{ borderTop: '1px solid var(--bdr-med)', background: 'var(--bg-0)' }}>
      <div
        style={{
          maxWidth: 1480, margin: '0 auto', padding: '20px 16px',
          display: 'flex', flexWrap: 'wrap', gap: '8px 24px', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 13, color: 'var(--tx-3)', lineHeight: 1.6,
        }}
      >
        <p style={{ margin: 0 }}>
          Nội dung chỉ để tham khảo, không thay thế tư vấn y tế, đầu tư hay pháp lý.
          Mã nguồn theo giấy phép MIT, dữ liệu theo CC BY 4.0.
        </p>
        <nav aria-label="Liên kết chân trang" style={{ display: 'flex', gap: 16 }}>
          <Link href="/terms" style={kieuLienKet}>Điều khoản dịch vụ</Link>
          <Link href="/privacy" style={kieuLienKet}>Quyền riêng tư</Link>
          <Link href="/" style={kieuLienKet}>Trang chủ</Link>
        </nav>
      </div>
    </footer>
  );
}
