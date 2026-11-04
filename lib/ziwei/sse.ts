/**
 * Đọc luồng phản hồi dạng sự kiện (mỗi dòng "data: {...}") từ /api/interpret.
 *
 * Một lần đọc của trình duyệt có thể cắt giữa một dòng, nên phải gom các mảnh vào bộ đệm và chỉ xử lý
 * khi đã đủ một dòng. Cách xử lý từng mảnh riêng lẻ làm mất những đoạn bị cắt và có thể dừng luồng giữa chừng.
 */
export async function docLuongVanBan(
  body: ReadableStream<Uint8Array>,
  khiCoVanBan: (doanMoi: string) => void,
): Promise<void> {
  const reader = body.getReader();
  const giaiMa = new TextDecoder();
  let boDem = '';

  const xuLyDong = (dong: string) => {
    if (!dong.startsWith('data: ')) return;
    const duLieu = dong.slice(6);
    if (duLieu === '[DONE]') return;
    try {
      const doan = JSON.parse(duLieu).delta?.text;
      if (typeof doan === 'string' && doan) khiCoVanBan(doan);
    } catch {
      // Dòng không phải JSON hợp lệ (ví dụ dòng chú thích): bỏ qua
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    boDem += giaiMa.decode(value, { stream: true });
    let viTri = boDem.indexOf('\n');
    while (viTri >= 0) {
      xuLyDong(boDem.slice(0, viTri).replace(/\r$/, ''));
      boDem = boDem.slice(viTri + 1);
      viTri = boDem.indexOf('\n');
    }
  }
  boDem += giaiMa.decode();
  if (boDem) xuLyDong(boDem.replace(/\r$/, ''));
}
