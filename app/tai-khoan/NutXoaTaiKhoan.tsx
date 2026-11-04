'use client';
import { useState } from 'react';

/** Xóa tài khoản: phải gõ đúng chữ "XOA" để xác nhận, vì thao tác xóa cả lá số và hỏi đáp, không hoàn tác được. */
export default function NutXoaTaiKhoan({ email }: { email: string }) {
  const [mo, setMo] = useState(false);
  const [chu, setChu] = useState('');
  const [dang, setDang] = useState(false);
  const [loi, setLoi] = useState(false);

  const xoa = async () => {
    setDang(true);
    setLoi(false);
    try {
      const r = await fetch('/api/tai-khoan', { method: 'DELETE' });
      if (!r.ok) throw new Error('xoa-that-bai');
      window.location.assign('/tai-khoan');
    } catch {
      setLoi(true);
      setDang(false);
    }
  };

  return (
    <section style={{ marginTop: 40, padding: 20, borderRadius: 12, border: '1px solid var(--hoa-ky)' }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px', color: 'var(--hoa-ky)' }}>Xóa tài khoản</h2>
      <p style={{ margin: '0 0 12px', lineHeight: 1.7, fontSize: 15 }}>
        Xóa vĩnh viễn tài khoản {email} cùng mọi lá số và lịch sử hỏi đáp đã lưu. Không thể khôi phục.
      </p>
      {!mo ? (
        <button type="button" onClick={() => setMo(true)} style={{ padding: '8px 14px', borderRadius: 8, cursor: 'pointer', border: '1px solid var(--hoa-ky)', background: 'transparent', color: 'var(--hoa-ky)' }}>
          Tôi muốn xóa tài khoản
        </button>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 14 }}>
            Gõ <strong>XOA</strong> để xác nhận{' '}
            <input value={chu} onChange={(e) => setChu(e.target.value)} autoComplete="off" style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid var(--bdr-heavy)', background: 'var(--bg-0)', color: 'var(--tx-1)', width: 100 }} />
          </label>
          <button type="button" onClick={xoa} disabled={chu.trim().toUpperCase() !== 'XOA' || dang} style={{ padding: '8px 14px', borderRadius: 8, cursor: chu.trim().toUpperCase() === 'XOA' && !dang ? 'pointer' : 'not-allowed', border: '1px solid var(--hoa-ky)', background: 'var(--hoa-ky)', color: '#fff', opacity: chu.trim().toUpperCase() === 'XOA' ? 1 : 0.5 }}>
            {dang ? 'Đang xóa…' : 'Xóa vĩnh viễn'}
          </button>
          <button type="button" onClick={() => { setMo(false); setChu(''); }} style={{ padding: '8px 14px', borderRadius: 8, cursor: 'pointer', border: '1px solid var(--bdr-heavy)', background: 'transparent', color: 'var(--tx-1)' }}>
            Hủy
          </button>
          {loi && <span role="alert" style={{ fontSize: 14, color: 'var(--hoa-ky)' }}>Xóa không thành công, vui lòng thử lại.</span>}
        </div>
      )}
    </section>
  );
}
