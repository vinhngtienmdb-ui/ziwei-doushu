'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/** Nút xóa một lá số đã lưu, có bước xác nhận. */
export default function NutXoaLaSo({ laSoId, ten }: { laSoId: string; ten: string }) {
  const router = useRouter();
  const [dangXoa, setDangXoa] = useState(false);
  const [loi, setLoi] = useState(false);

  const xoa = async () => {
    if (!window.confirm(`Xóa lá số "${ten}" cùng toàn bộ hỏi đáp của nó? Thao tác này không hoàn tác được.`)) return;
    setDangXoa(true);
    setLoi(false);
    try {
      const r = await fetch(`/api/la-so/${encodeURIComponent(laSoId)}`, { method: 'DELETE' });
      if (!r.ok) throw new Error('xoa-that-bai');
      router.refresh();
    } catch {
      setLoi(true);
      setDangXoa(false);
    }
  };

  return (
    <span>
      <button
        type="button"
        onClick={xoa}
        disabled={dangXoa}
        style={{ padding: '6px 12px', borderRadius: 8, fontSize: 14, cursor: 'pointer', border: '1px solid var(--bdr-heavy)', background: 'transparent', color: 'var(--hoa-ky)' }}
      >
        {dangXoa ? 'Đang xóa…' : 'Xóa'}
      </button>
      {loi && <span role="alert" style={{ marginLeft: 8, fontSize: 13, color: 'var(--hoa-ky)' }}>Xóa không thành công.</span>}
    </span>
  );
}
