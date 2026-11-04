'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import TaiKhoanNut from '@/components/TaiKhoanNut';

const LIEN_KET = [
  { href: '/chart', nhan: 'Lập lá số' },
  { href: '/heming', nhan: 'Hợp bàn' },
  { href: '/library', nhan: 'Cổ thư' },
  { href: '/knowledge', nhan: 'Tri thức' },
];

/** Các trang tự có thanh điều hướng riêng nên không hiện thanh chung. */
const TRANG_KHONG_HIEN = ['/', '/preview'];

export default function SiteHeader() {
  const duongDan = usePathname();
  const { theme, toggle } = useTheme();
  if (TRANG_KHONG_HIEN.includes(duongDan)) return null;

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'var(--bg-0)', borderBottom: '1px solid var(--bdr-med)',
      }}
    >
      <div
        style={{
          maxWidth: 1480, margin: '0 auto', padding: '0 16px', minHeight: 52,
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: 15, fontWeight: 700, color: 'var(--tx-0)', textDecoration: 'none',
            padding: '12px 4px', whiteSpace: 'nowrap',
          }}
        >
          <span aria-hidden="true" style={{ color: 'var(--ac)', marginRight: 6 }}>☯</span>
          Lá số Tử Vi
        </Link>

        <nav aria-label="Điều hướng chính" style={{ display: 'flex', gap: 4, flex: 1, flexWrap: 'wrap' }}>
          {LIEN_KET.map(({ href, nhan }) => {
            const dangMo = duongDan === href || duongDan.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                aria-current={dangMo ? 'page' : undefined}
                style={{
                  fontSize: 14, textDecoration: 'none', padding: '8px 12px', borderRadius: 8,
                  color: dangMo ? 'var(--ac)' : 'var(--tx-2)',
                  fontWeight: dangMo ? 600 : 400,
                  background: dangMo ? 'var(--ac-bg)' : 'transparent',
                }}
              >
                {nhan}
              </Link>
            );
          })}
        </nav>

        <TaiKhoanNut />

        <button
          type="button"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
          style={{
            fontSize: 13, padding: '6px 14px', borderRadius: 999, cursor: 'pointer',
            border: '1px solid var(--bdr-heavy)', background: 'transparent', color: 'var(--tx-1)',
          }}
        >
          {theme === 'dark' ? '☀ Sáng' : '☾ Tối'}
        </button>
      </div>
    </header>
  );
}
