import { layNguoiDungHienTai } from '@/lib/auth/phien';

/**
 * Giới hạn tần suất gọi AI theo cửa sổ trượt, lưu trong bộ nhớ của tiến trình.
 * Phù hợp khi chỉ chạy một bản ứng dụng; chạy nhiều bản thì mỗi bản đếm riêng.
 */
export const THOI_GIAN_CUA_SO_MS = 60 * 60 * 1000;
export const SO_LAN_TOI_DA_KHACH = 10;
export const SO_LAN_TOI_DA_DA_DANG_NHAP = 40;
const SO_KHOA_TOI_DA = 5000;

const kho = globalThis as unknown as { __gioiHanAi?: Map<string, number[]> };

export interface KetQuaGioiHan {
  duoc: boolean;
  /** Số giây nên chờ trước khi thử lại, chỉ có khi bị chặn. */
  choGiay: number;
}

export function kiemTraGioiHan(khoa: string, toiDa: number, bayGio = Date.now(), soDo: Map<string, number[]> = (kho.__gioiHanAi ??= new Map())): KetQuaGioiHan {
  const batDau = bayGio - THOI_GIAN_CUA_SO_MS;
  const lanGoi = (soDo.get(khoa) ?? []).filter((t) => t > batDau);
  if (lanGoi.length >= toiDa) {
    soDo.set(khoa, lanGoi);
    return { duoc: false, choGiay: Math.max(1, Math.ceil((lanGoi[0] + THOI_GIAN_CUA_SO_MS - bayGio) / 1000)) };
  }
  lanGoi.push(bayGio);
  soDo.set(khoa, lanGoi);
  if (soDo.size > SO_KHOA_TOI_DA) {
    for (const [k, v] of soDo) if (v.every((t) => t <= batDau)) soDo.delete(k);
  }
  return { duoc: true, choGiay: 0 };
}

/** Địa chỉ người gọi: phía sau máy chủ trung gian của nền tảng, lấy địa chỉ đầu của X-Forwarded-For. */
function diaChiNguoiGoi(request: Request): string {
  const chuoi = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '';
  return chuoi.split(',')[0].trim() || 'khong-ro';
}

/** Trả về phản hồi 429 nếu người gọi vượt giới hạn, ngược lại trả về null. */
export async function chanNeuVuotGioiHan(request: Request): Promise<Response | null> {
  const nguoiDung = await layNguoiDungHienTai();
  const ketQua = nguoiDung
    ? kiemTraGioiHan(`nd:${nguoiDung.id}`, SO_LAN_TOI_DA_DA_DANG_NHAP)
    : kiemTraGioiHan(`ip:${diaChiNguoiGoi(request)}`, SO_LAN_TOI_DA_KHACH);
  if (ketQua.duoc) return null;
  return Response.json({ error: 'qua-gioi-han' }, { status: 429, headers: { 'Retry-After': String(ketQua.choGiay) } });
}
