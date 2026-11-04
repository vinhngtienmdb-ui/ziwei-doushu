'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TrangThaiTaiKhoan {
  nguoiDung: { ten: string | null; email: string; anh: string | null } | null;
  daCauHinh: boolean;
}

const kieuNut = {
  fontSize: 13, padding: '6px 14px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap' as const,
  border: '1px solid var(--bdr-heavy)', background: 'transparent', color: 'var(--tx-1)',
};

/** Nút đăng nhập hoặc tên tài khoản trên thanh điều hướng. */
export default function TaiKhoanNut() {
  const duongDan = usePathname();
  const [trangThai, setTrangThai] = useState<TrangThaiTaiKhoan | null>(null);

  useEffect(() => {
    let huy = false;
    fetch('/api/auth/toi')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (!huy && d) setTrangThai(d); })
      .catch(() => { /* mất kết nối: giữ nguyên, hiện nút đăng nhập mặc định */ });
    return () => { huy = true; };
  }, [duongDan]);

  const dangXuat = async () => {
    await fetch('/api/auth/dang-xuat', { method: 'POST' }).catch(() => undefined);
    window.location.href = '/';
  };

  if (!trangThai) return null;

  if (!trangThai.nguoiDung) {
    // Dùng thẻ a vì đây là chuyển hướng sang Google, không phải trang trong ứng dụng
    const href = trangThai.daCauHinh ? `/api/auth/google?quay-lai=${encodeURIComponent(duongDan)}` : '/tai-khoan';
    return <a href={href} style={kieuNut}>Đăng nhập</a>;
  }

  const ten = trangThai.nguoiDung.ten || trangThai.nguoiDung.email;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Link href="/tai-khoan" style={{ ...kieuNut, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }} title={trangThai.nguoiDung.email}>
        {ten}
      </Link>
      <button type="button" onClick={dangXuat} style={kieuNut}>Đăng xuất</button>
    </div>
  );
}
