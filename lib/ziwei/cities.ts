export interface CityInfo {
  name: string;
  longitude: number; // độ Đông
}

export interface ProvinceInfo {
  name: string;
  cities: CityInfo[];
}

// Danh sách nơi sinh theo 34 tỉnh, thành phố của Việt Nam (hiệu lực từ ngày 1/7/2025).
// Mỗi tỉnh liệt kê trung tâm tỉnh lỵ và các thành phố, thị xã lớn, kể cả tỉnh lỵ cũ của các tỉnh đã sáp nhập,
// để người sinh trước năm 2025 vẫn chọn đúng nơi sinh. Kinh độ lấy ở trung tâm đô thị, sai số khoảng 0,1 độ
// (tương ứng khoảng 0,4 phút giờ mặt trời thật).
export const PROVINCES: ProvinceInfo[] = [
  // ─── Thành phố trực thuộc trung ương ─────────────────────────────
  { name: 'Hà Nội', cities: [
    { name: 'Hà Nội', longitude: 105.85 },
    { name: 'Hà Đông', longitude: 105.77 },
    { name: 'Sơn Tây', longitude: 105.51 },
  ] },
  { name: 'Huế', cities: [
    { name: 'Huế', longitude: 107.59 },
  ] },
  { name: 'Hải Phòng', cities: [
    { name: 'Hải Phòng', longitude: 106.68 },
    { name: 'Hải Dương', longitude: 106.33 },
  ] },
  { name: 'Đà Nẵng', cities: [
    { name: 'Đà Nẵng', longitude: 108.22 },
    { name: 'Hội An', longitude: 108.33 },
    { name: 'Tam Kỳ', longitude: 108.48 },
  ] },
  { name: 'TP. Hồ Chí Minh', cities: [
    { name: 'TP. Hồ Chí Minh', longitude: 106.70 },
    { name: 'Thủ Dầu Một', longitude: 106.65 },
    { name: 'Vũng Tàu', longitude: 107.08 },
    { name: 'Bà Rịa', longitude: 107.17 },
  ] },
  { name: 'Cần Thơ', cities: [
    { name: 'Cần Thơ', longitude: 105.79 },
    { name: 'Sóc Trăng', longitude: 105.97 },
    { name: 'Vị Thanh', longitude: 105.47 },
  ] },

  // ─── Tỉnh ────────────────────────────────────────────────────────
  { name: 'Tuyên Quang', cities: [
    { name: 'Tuyên Quang', longitude: 105.22 },
    { name: 'Hà Giang', longitude: 104.98 },
  ] },
  { name: 'Lào Cai', cities: [
    { name: 'Lào Cai', longitude: 103.97 },
    { name: 'Yên Bái', longitude: 104.87 },
  ] },
  { name: 'Thái Nguyên', cities: [
    { name: 'Thái Nguyên', longitude: 105.84 },
    { name: 'Bắc Kạn', longitude: 105.83 },
  ] },
  { name: 'Phú Thọ', cities: [
    { name: 'Việt Trì', longitude: 105.40 },
    { name: 'Vĩnh Yên', longitude: 105.60 },
    { name: 'Hòa Bình', longitude: 105.34 },
  ] },
  { name: 'Bắc Ninh', cities: [
    { name: 'Bắc Ninh', longitude: 106.07 },
    { name: 'Bắc Giang', longitude: 106.19 },
  ] },
  { name: 'Hưng Yên', cities: [
    { name: 'Hưng Yên', longitude: 106.05 },
    { name: 'Thái Bình', longitude: 106.34 },
  ] },
  { name: 'Ninh Bình', cities: [
    { name: 'Ninh Bình', longitude: 105.97 },
    { name: 'Phủ Lý', longitude: 105.91 },
    { name: 'Nam Định', longitude: 106.18 },
  ] },
  { name: 'Quảng Ninh', cities: [
    { name: 'Hạ Long', longitude: 107.08 },
    { name: 'Cẩm Phả', longitude: 107.28 },
    { name: 'Móng Cái', longitude: 107.97 },
  ] },
  { name: 'Thanh Hóa', cities: [
    { name: 'Thanh Hóa', longitude: 105.78 },
  ] },
  { name: 'Nghệ An', cities: [
    { name: 'Vinh', longitude: 105.69 },
  ] },
  { name: 'Hà Tĩnh', cities: [
    { name: 'Hà Tĩnh', longitude: 105.90 },
  ] },
  { name: 'Quảng Trị', cities: [
    { name: 'Đông Hà', longitude: 107.10 },
    { name: 'Đồng Hới', longitude: 106.62 },
  ] },
  { name: 'Quảng Ngãi', cities: [
    { name: 'Quảng Ngãi', longitude: 108.80 },
    { name: 'Kon Tum', longitude: 108.00 },
  ] },
  { name: 'Gia Lai', cities: [
    { name: 'Pleiku', longitude: 108.00 },
    { name: 'Quy Nhơn', longitude: 109.22 },
  ] },
  { name: 'Khánh Hòa', cities: [
    { name: 'Nha Trang', longitude: 109.19 },
    { name: 'Phan Rang - Tháp Chàm', longitude: 108.99 },
  ] },
  { name: 'Lâm Đồng', cities: [
    { name: 'Đà Lạt', longitude: 108.44 },
    { name: 'Phan Thiết', longitude: 108.10 },
    { name: 'Gia Nghĩa', longitude: 107.70 },
  ] },
  { name: 'Đắk Lắk', cities: [
    { name: 'Buôn Ma Thuột', longitude: 108.04 },
    { name: 'Tuy Hòa', longitude: 109.30 },
  ] },
  { name: 'Đồng Nai', cities: [
    { name: 'Biên Hòa', longitude: 106.82 },
    { name: 'Đồng Xoài', longitude: 106.90 },
  ] },
  { name: 'Tây Ninh', cities: [
    { name: 'Tây Ninh', longitude: 106.10 },
    { name: 'Tân An', longitude: 106.41 },
  ] },
  { name: 'Vĩnh Long', cities: [
    { name: 'Vĩnh Long', longitude: 105.97 },
    { name: 'Bến Tre', longitude: 106.38 },
    { name: 'Trà Vinh', longitude: 106.34 },
  ] },
  { name: 'Đồng Tháp', cities: [
    { name: 'Cao Lãnh', longitude: 105.63 },
    { name: 'Mỹ Tho', longitude: 106.36 },
  ] },
  { name: 'An Giang', cities: [
    { name: 'Long Xuyên', longitude: 105.44 },
    { name: 'Rạch Giá', longitude: 105.08 },
    { name: 'Phú Quốc', longitude: 103.96 },
  ] },
  { name: 'Cà Mau', cities: [
    { name: 'Cà Mau', longitude: 105.15 },
    { name: 'Bạc Liêu', longitude: 105.72 },
  ] },
  { name: 'Cao Bằng', cities: [
    { name: 'Cao Bằng', longitude: 106.25 },
  ] },
  { name: 'Lạng Sơn', cities: [
    { name: 'Lạng Sơn', longitude: 106.76 },
  ] },
  { name: 'Lai Châu', cities: [
    { name: 'Lai Châu', longitude: 103.46 },
  ] },
  { name: 'Điện Biên', cities: [
    { name: 'Điện Biên Phủ', longitude: 103.02 },
  ] },
  { name: 'Sơn La', cities: [
    { name: 'Sơn La', longitude: 103.91 },
  ] },
];
