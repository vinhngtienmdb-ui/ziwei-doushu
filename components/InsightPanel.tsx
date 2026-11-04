'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ZiweiChart, Palace } from '@/lib/ziwei/types';
import type { TimeView } from './TimeNav';
import { tenSao, tenCung, tenTuHoa } from '@/lib/ziwei/thuat-ngu';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  hidden?: boolean; // don't show user bubble for auto/topic messages
}

interface SelectedSiHua {
  starName: string;
  siHua: string;
  view: TimeView;
}

interface InsightPanelProps {
  chart: ZiweiChart;
  selectedPalace?: Palace | null;
  selectedSiHua?: SelectedSiHua | null;
}

const TOPICS = [
  { key: 'overview',     label: 'Mệnh cách' },
  { key: 'love',        label: 'Tình cảm' },
  { key: 'career',      label: 'Sự nghiệp' },
  { key: 'wealth',      label: 'Tài vận' },
  { key: 'health',      label: 'Sức khỏe' },
  { key: 'personality', label: 'Tính cách' },
] as const;

// Các lời nhắc bên dưới gửi tới máy chủ luận giải. Giữ nguyên dấu 【 】 vì AiContent dùng chúng để nhận diện tiêu đề từng phần.
const TOPIC_PROMPTS: Record<string, string> = {
  overview: `Hãy tạo bản tổng quan mệnh cách, trả lời bằng tiếng Việt, theo cấu trúc sau:

**【Định tính mệnh cách】**
Dùng một câu tóm tắt cách cục cốt lõi của lá số và khí chất của chủ mệnh.

**【Luận giải chính tinh】**
Đặc chất cốt lõi của chính tinh tại Mệnh cung, trích dẫn lời hoặc quan điểm của Nghê Hải Hạ.

**【Tam phương tứ chính】**
Phân tích sự liên động của ba cung Tài, Quan, Thiên Di và cách cục tổng thể.

**【Đại hạn hiện tại】**
Hướng vận của đại hạn hiện tại và những việc đáng chú ý nhất.

**【Ưu điểm và điều cần lưu ý】**
Ưu thế thiên phú của lá số, cùng những rủi ro hoặc bài học cần chú ý.`,

  love: `Hãy phân tích sâu vận tình cảm và hôn nhân, trả lời bằng tiếng Việt, theo cấu trúc sau:

**【Cách cục tình cảm】**
Định tính mệnh cách tình cảm bằng một câu.

**【Phân tích Phu Thê cung】**
Chính tinh, tứ hóa của Phu Thê cung, cùng cách luận giải cụ thể theo hệ thống Nghê Hải Hạ.

**【Liên động tam phương】**
Ảnh hưởng của các cung liên quan đến tình cảm.

**【Vận tình cảm đại hạn hiện tại】**
Xu hướng tình cảm trong 10 năm hiện tại và các mốc then chốt.

**【Lời khuyên thực tế】**
Những lời khuyên tình cảm cụ thể, khả thi.`,

  career: `Hãy phân tích sâu vận sự nghiệp, trả lời bằng tiếng Việt, theo cấu trúc sau:

**【Cách cục sự nghiệp】**
Định tính mệnh cách sự nghiệp bằng một câu, hợp làm công ăn lương hay khởi nghiệp.

**【Phân tích Quan Lộc cung】**
Chính tinh, tứ hóa của Quan Lộc cung, cùng nhận định của Nghê sư về cách bố trí này.

**【Liên động Tài Bạch cung】**
Mối quan hệ giữa tài vận và sự nghiệp, phân tích nguồn tài.

**【Vận sự nghiệp đại hạn hiện tại】**
Xu hướng sự nghiệp trong 10 năm hiện tại.

**【Lời khuyên thực tế】**
Hướng đi, ngành nghề và chiến lược phù hợp.`,

  wealth: `Hãy phân tích sâu tài vận, trả lời bằng tiếng Việt, theo cấu trúc sau:

**【Cách cục tài vận】**
Định tính mô thức tài vận bằng một câu, là tài chủ động hay tài bị động.

**【Phân tích Tài Bạch cung】**
Chính tinh, tứ hóa của Tài Bạch cung, nguồn tài và mô thức dòng tiền.

**【Điền Trạch cung (kho tài)】**
Phân tích khả năng tích lũy và vận bất động sản.

**【Tài vận đại hạn hiện tại】**
Xu hướng tài vận hiện tại và những điều cần chú ý.

**【Lời khuyên quản lý tiền】**
Những lời khuyên tài chính cụ thể.`,

  health: `Hãy phân tích vận sức khỏe, trả lời bằng tiếng Việt, theo cấu trúc sau:

**【Chính tinh Tật Ách cung】**
Các sao ở Tật Ách cung và ý nghĩa đối với sức khỏe.

**【Rủi ro chính】**
Kết hợp lý thuyết Tý Ngọ lưu chú của Nghê Hải Hạ, phân tích các mối nguy sức khỏe chính và bộ phận cần chú ý.

**【Xu hướng sức khỏe theo đại hạn】**
Xu hướng sức khỏe hiện tại và các khoảng thời gian then chốt.

**【Lời khuyên phòng ngừa】**
Những điều cần lưu ý cụ thể và hướng dưỡng sinh.`,

  personality: `Hãy phân tích sâu đặc chất tính cách, trả lời bằng tiếng Việt, theo cấu trúc sau:

**【Tính cách chính tinh Mệnh cung】**
Đặc chất tính cách cốt lõi của chính tinh Mệnh cung, trích dẫn lời Nghê sư.

**【Tổng hợp tính cách tam phương】**
Ảnh hưởng của ba cung Tài, Quan, Thiên Di đến tính cách, mô tả toàn cảnh.

**【Mô thức quan hệ giao tiếp】**
Cách tương tác với người khác, phong cách đối nhân xử thế.

**【Ưu điểm và bài học cuộc đời】**
Ưu thế thiên phú, cùng những bài học cuộc đời cần đối diện.`,
};

// Khóa là tên cung chữ Hán do engine trả về; chỉ phần mô tả được dịch.
const PALACE_ROLES: Record<string, string> = {
  '命宫':   'bản thân, tính cách, cách cục bẩm sinh',
  '兄弟宫': 'quan hệ anh em, đối tác hợp tác',
  '夫妻宫': 'quan hệ tình cảm, tình trạng hôn nhân',
  '子女宫': 'duyên con cái, quan hệ cấp dưới',
  '财帛宫': 'nguồn tài vận, cách thu nhập',
  '疾厄宫': 'sức khỏe thân thể, tai nạn bất ngờ',
  '迁移宫': 'cơ hội ra ngoài, cách cục giao tiếp',
  '交友宫': 'vòng bạn bè, quý nhân, tiểu nhân',
  '官禄宫': 'thành tựu sự nghiệp, địa vị xã hội',
  '田宅宫': 'bất động sản, môi trường gia đình',
  '福德宫': 'hưởng thụ tinh thần, phúc phần nội tâm',
  '父母宫': 'quan hệ cha mẹ, văn thư hợp đồng',
};

/** Render AI markdown: **【Title】** → gold header, **bold** → strong */
function AiContent({ text, streaming }: { text: string; streaming?: boolean }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        const sectionMatch = line.match(/^\*\*【(.+?)】\*\*$/);
        if (sectionMatch) {
          return (
            <div key={i} className="pt-3 pb-0.5 first:pt-0">
              <span className="text-[11px] font-semibold tracking-wide" style={{ color: 'var(--t-gold)' }}>
                【{sectionMatch[1]}】
              </span>
            </div>
          );
        }
        if (line.trim() === '') return <div key={i} className="h-1" />;
        const parts = line.split(/\*\*(.+?)\*\*/);
        return (
          <div key={i} className="text-[11px] leading-relaxed" style={{ color: 'var(--t-text2)' }}>
            {parts.map((part, j) =>
              j % 2 === 0
                ? part
                : <strong key={j} className="font-medium" style={{ color: 'var(--t-text)' }}>{part}</strong>
            )}
          </div>
        );
      })}
      {streaming && (
        <span
          className="inline-block w-1.5 h-3 ml-0.5 animate-pulse rounded-sm align-middle"
          style={{ background: 'var(--t-gold)', opacity: 0.6 }}
        />
      )}
    </div>
  );
}

export default function InsightPanel({ chart, selectedPalace, selectedSiHua }: InsightPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string>('overview');
  const messagesRef = useRef<Message[]>([]); // always-current copy for closures
  const loadingRef = useRef(false);
  const autoLoaded = useRef(false);
  const lastPalaceBranch = useRef<number | undefined>(undefined);
  const lastSiHuaKey = useRef<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep refs in sync
  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => { loadingRef.current = loading; }, [loading]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-generate 命格总览 on mount
  useEffect(() => {
    if (autoLoaded.current) return;
    autoLoaded.current = true;
    sendMessage(TOPIC_PROMPTS.overview, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Inject palace analysis when palace selected
  useEffect(() => {
    if (!selectedPalace || selectedPalace.branch === lastPalaceBranch.current) return;
    lastPalaceBranch.current = selectedPalace.branch;

    const majorStars = selectedPalace.stars.filter(s => s.type === 'major');
    const starDesc = majorStars.length > 0
      ? majorStars.map(s => `${tenSao(s.name)}${s.siHua ? ' ' + tenTuHoa(s.siHua) : ''}`).join(', ')
      : 'cung trống (mượn đối cung)';
    const role = PALACE_ROLES[selectedPalace.name] ?? '';

    const tenCungHienThi = tenCung(selectedPalace.name);
    const prompt = `Hãy tập trung phân tích【${tenCungHienThi}】(chủ quản: ${role}), chính tinh của cung này là ${starDesc}. Trả lời bằng tiếng Việt, theo cấu trúc sau:

**【Định tính cung vị】**
Ý nghĩa của ${tenCungHienThi} trong lá số, cùng nhận định tổng thể về cách bố trí sao này.

**【Luận giải chính tinh】**
Cách luận giải chính tinh tại cung này theo hệ thống Nghê Hải Hạ, trích dẫn quan điểm cụ thể.

**【Liên động tam phương tứ chính】**
Ảnh hưởng của các cung tam phương tứ chính đối với cung này.

**【Lời khuyên thực tế】**
Lời khuyên cụ thể dựa trên cung này.`;

    sendMessage(prompt, true);
  }, [selectedPalace]); // eslint-disable-line react-hooks/exhaustive-deps

  // 注入四化飞化分析
  useEffect(() => {
    if (!selectedSiHua) return;
    const key = `${selectedSiHua.starName}-${selectedSiHua.siHua}-${selectedSiHua.view}`;
    if (key === lastSiHuaKey.current) return;
    lastSiHuaKey.current = key;

    // 找出该星所在宫位
    const palaceOfStar = chart.palaces.find(p =>
      p.stars.some(s => s.name === selectedSiHua.starName)
    );
    const palaceName = palaceOfStar ? tenCung(palaceOfStar.name) : 'cung vị chưa xác định';
    const viewLabel = selectedSiHua.view === 'daxian' ? 'Đại hạn' : 'Lưu niên';

    const tenSaoHienThi = tenSao(selectedSiHua.starName);
    const tenHoa = tenTuHoa(selectedSiHua.siHua);
    const prompt = `Hãy phân tích ảnh hưởng phi hóa của【${viewLabel} ${tenSaoHienThi} ${tenHoa}】. Trả lời bằng tiếng Việt, theo cấu trúc sau:

**【Ý nghĩa cơ bản của ${tenHoa}】**
Ý nghĩa cốt lõi của ${tenHoa} trong hệ thống Nghê Hải Hạ, và ý nghĩa đặc biệt của ${tenSaoHienThi} ${tenHoa}.

**【Ảnh hưởng khi rơi vào cung】**
${tenSaoHienThi} ${tenHoa} rơi vào【${palaceName}】, lĩnh vực do cung này chủ quản chịu ảnh hưởng thế nào, Nghê sư luận giải ra sao.

**【Đường phi hóa tam phương tứ chính】**
Sau khi ${tenHoa} nhập ${palaceName}, ảnh hưởng liên động đến tam phương tứ chính của cung đó (đối cung và hai cung tam hợp).

**【Ảnh hưởng đến vận thế hiện tại】**
Ở chiều thời gian ${viewLabel}, ảnh hưởng cụ thể của ${tenHoa} này đối với vận thế gần đây của chủ mệnh.

**【Lời khuyên thực tế】**
Lời khuyên cụ thể có thể thực hiện dựa trên tứ hóa này.`;

    sendMessage(prompt, true);
  }, [selectedSiHua]); // eslint-disable-line react-hooks/exhaustive-deps

  const streamResponse = async (apiMessages: { role: 'user' | 'assistant'; content: string }[]) => {
    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chart, messages: apiMessages }),
      });
      if (res.status === 404 || res.status === 503) throw new Error('api-missing');
      if (!res.ok) throw new Error('Yêu cầu thất bại');
      if (!res.body) throw new Error('Không có luồng phản hồi');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const delta = JSON.parse(data).delta?.text ?? '';
            assistantText += delta;
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: 'assistant', content: assistantText };
              return updated;
            });
          } catch { /* skip */ }
        }
      }
    } catch (e) {
      const missing = e instanceof Error && e.message === 'api-missing';
      setMessages(prev => [...prev, { role: 'assistant', content: missing ? "Chưa cấu hình khóa API cho tính năng AI. Hãy đặt ANTHROPIC_API_KEY trong tệp .env.local ở thư mục gốc dự án, rồi khởi động lại máy chủ (npm run dev). Việc lập lá số không cần khóa API." : 'Luận giải thất bại, vui lòng thử lại sau.' }]);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  const sendMessage = (text: string, hidden = false) => {
    if (!text.trim() || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    const userMsg: Message = { role: 'user', content: text, hidden };
    // Capture current messages synchronously via ref (avoids stale closure)
    const apiMessages = [...messagesRef.current, userMsg].map(m => ({
      role: m.role,
      content: m.content,
    }));

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    streamResponse(apiMessages);
  };

  const handleTopicClick = (topicKey: string) => {
    if (loadingRef.current) return;
    setActiveTopic(topicKey);
    sendMessage(TOPIC_PROMPTS[topicKey], true);
  };

  const handleSend = () => {
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden card-glass">

      {/* ── Topic buttons ── */}
      <div className="flex-shrink-0 px-2 pt-2.5 pb-2" style={{ borderBottom: '1px solid var(--t-border)' }}>
        <div className="grid grid-cols-6 gap-1">
          {TOPICS.map(t => {
            const isActive = activeTopic === t.key;
            return (
              <button
                key={t.key}
                onClick={() => handleTopicClick(t.key)}
                disabled={loading}
                className="py-1.5 text-[10px] font-medium rounded-lg transition-all duration-150 disabled:opacity-40"
                style={{
                  background: isActive ? 'rgba(212,168,67,0.12)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(212,168,67,0.3)' : 'var(--t-border)'}`,
                  color: isActive ? 'var(--t-gold)' : 'var(--t-faint)',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Messages ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">

        {/* Loading state before first message */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-4xl mb-3" style={{ color: 'var(--t-gold)', opacity: 0.1 }}>✦</div>
            <p className="text-[10px] animate-pulse" style={{ color: 'var(--t-faint)' }}>Đang tạo luận giải mệnh cách…</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            if (msg.role === 'user' && msg.hidden) return null;

            if (msg.role === 'user') {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div
                    className="max-w-[85%] rounded-xl px-3 py-2 text-[11px]"
                    style={{
                      background: 'rgba(212,168,67,0.08)',
                      border: '1px solid rgba(212,168,67,0.18)',
                      color: 'var(--t-gold)',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              );
            }

            // Assistant message
            const isLastMsg = i === messages.length - 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="text-[9px] tracking-wide mb-2 flex items-center gap-1.5"
                  style={{ color: 'var(--t-faint)' }}
                >
                  <span style={{ color: 'var(--t-gold)', opacity: 0.4 }}>✦</span>
                  Luận giải mệnh lý
                </div>
                <AiContent text={msg.content} streaming={loading && isLastMsg} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Input ── */}
      <div className="flex-shrink-0 px-3 pb-3 pt-2" style={{ borderTop: '1px solid var(--t-border)' }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Hỏi tiếp, ví dụ: Năm nay có hợp đổi việc không?"
            disabled={loading}
            className="flex-1 rounded-lg px-3 py-2 text-[11px] focus:outline-none transition-colors"
            style={{
              background: 'var(--t-card)',
              border: '1px solid var(--t-border)',
              color: 'var(--t-text)',
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-3 py-2 rounded-lg text-[11px] font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(212,168,67,0.15)',
              border: '1px solid rgba(212,168,67,0.25)',
              color: 'var(--t-gold)',
            }}
          >
            {loading ? '…' : 'Hỏi tiếp'}
          </button>
        </div>
      </div>

    </div>
  );
}
