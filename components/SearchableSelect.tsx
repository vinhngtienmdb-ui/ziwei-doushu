'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
  /** Kiểu của ô nhập, lấy từ biểu mẫu để đồng bộ giao diện */
  style?: React.CSSProperties;
  /** Màu nền và viền của danh sách thả xuống */
  listBackground: string;
  listBorder: string;
  listColor: string;
  highlightBackground: string;
  noResultsText: string;
  ariaLabel: string;
}

/** Bỏ dấu và đưa về chữ thường để tìm không phân biệt dấu, ví dụ "ha noi" khớp "Hà Nội". */
function chuanHoaDeTim(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase();
}

export default function SearchableSelect({
  value, onChange, options, placeholder, disabled, style,
  listBackground, listBorder, listColor, highlightBackground, noResultsText, ariaLabel,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    const needle = chuanHoaDeTim(query.trim());
    if (!needle) return options;
    return options.filter(option => chuanHoaDeTim(option).includes(needle));
  }, [options, query]);

  // Bấm ra ngoài thì đóng danh sách và trả ô nhập về giá trị đang chọn
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  // Giữ mục đang chọn bằng bàn phím luôn nằm trong vùng nhìn thấy
  useEffect(() => {
    if (!open || !listRef.current) return;
    const item = listRef.current.children[activeIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  const choose = (option: string) => {
    onChange(option);
    setOpen(false);
    setQuery('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(index => Math.min(index + 1, Math.max(filtered.length - 1, 0)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex(index => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      if (open) {
        event.preventDefault();
        if (filtered[activeIndex]) choose(filtered[activeIndex]);
      }
    } else if (event.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <input
        type="text"
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-autocomplete="list"
        autoComplete="off"
        disabled={disabled}
        // Khi đóng hiện giá trị đã chọn; khi mở hiện chữ đang gõ để tìm
        value={open ? query : value}
        placeholder={open && value ? value : placeholder}
        onFocus={() => { setOpen(true); setActiveIndex(0); }}
        onChange={event => { setQuery(event.target.value); setOpen(true); setActiveIndex(0); }}
        onKeyDown={handleKeyDown}
        style={style}
      />
      {open && !disabled && (
        <ul
          ref={listRef}
          role="listbox"
          style={{
            position: 'absolute', zIndex: 30, left: 0, right: 0, top: 'calc(100% + 4px)',
            maxHeight: '240px', overflowY: 'auto', margin: 0, padding: '4px',
            listStyle: 'none', borderRadius: '10px',
            background: listBackground, border: `1px solid ${listBorder}`, color: listColor,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)', fontSize: '13px',
          }}
        >
          {filtered.length === 0 ? (
            <li style={{ padding: '8px 10px', opacity: 0.7 }}>{noResultsText}</li>
          ) : filtered.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={option === value}
              onMouseDown={event => { event.preventDefault(); choose(option); }}
              onMouseEnter={() => setActiveIndex(index)}
              style={{
                padding: '7px 10px', borderRadius: '6px', cursor: 'pointer',
                background: index === activeIndex ? highlightBackground : 'transparent',
                fontWeight: option === value ? 600 : 400,
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
