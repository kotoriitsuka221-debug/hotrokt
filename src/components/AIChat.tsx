import { GoogleGenAI } from "@google/genai";
import { Send, User, Bot, Loader2, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

interface Message {
  role: "user" | "model";
  text: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Chào Minh Anh! Tôi là trợ lý AI chuyên ngành kế toán. Tôi đã sẵn sàng hỗ trợ bạn về chuẩn mực kế toán (VAS) và các công thức tính toán. Bạn cần giải thích phần nào?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Sử dụng native fetch patterns thông qua SDK hiện đại
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: "user", parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: "Bạn là một giảng viên kế toán giàu kinh nghiệm. Hãy trả lời các câu hỏi của sinh viên một cách chi tiết, dễ hiểu, sử dụng các thuật ngữ kế toán chuẩn Việt Nam. Trình bày theo phong cách học thuật, rõ ràng.",
        },
      });

      const botText = response.text || "Xin lỗi, tôi không thể trả lời lúc này.";
      setMessages((prev) => [...prev, { role: "model", text: botText }]);
    } catch (error) {
      console.error("AI Error:", error);
      
      // Xử lý lỗi dựa trên các tiêu chuẩn native (DOMException)
      let errorMessage = "Có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.";
      
      if (error instanceof Error) {
        // Kiểm tra nếu lỗi liên quan đến việc hủy bỏ hoặc timeout (native patterns)
        if (error.name === 'AbortError') {
          errorMessage = "Yêu cầu đã bị hủy bỏ bởi hệ thống.";
        } else if (error.message.includes('quota')) {
          errorMessage = "Hệ thống đang bận do quá tải (hết hạn mức). Vui lòng đợi giây lát.";
        }
      }
      
      setMessages((prev) => [
        ...prev,
        { role: "model", text: errorMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[700px] border border-ink bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.1)] overflow-hidden">
      <div className="bg-white border-b border-ink p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <h2 className="editorial-serif italic text-2xl">Trợ lý AI Kế Toán</h2>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">CHẾ ĐỘ GIẢNG VIÊN</span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scroll p-6 space-y-6 bg-[#f9f8f6]"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className="w-8 h-8 bg-ink flex-shrink-0 flex items-center justify-center text-[10px] text-white font-bold editorial-serif italic">
                  {m.role === "user" ? "UV" : "AI"}
                </div>
                <div
                  className={`p-4 border ${
                    m.role === "user"
                      ? "bg-ink text-white border-ink rounded-bl-xl shadow-sm"
                      : "bg-white text-ink border-black/20 rounded-br-xl shadow-sm"
                  }`}
                >
                  <div className="prose prose-sm prose-slate max-w-none text-xs leading-relaxed font-medium">
                    {m.text.split("\n").map((line, idx) => (
                      <p key={idx} className="mb-2 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-ink flex-shrink-0 flex items-center justify-center text-[10px] text-white font-bold opacity-20">AI</div>
                <div className="bg-white p-3 border border-dashed border-ink/20 opacity-60">
                   <Loader2 className="w-4 h-4 animate-spin" />
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-ink">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Đặt câu hỏi về nghiệp vụ kế toán..."
            className="w-full p-4 pr-16 border border-ink text-xs focus:outline-none focus:ring-1 focus:ring-ink italic font-medium"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 px-4 bg-ink text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-20"
          >
            GỬI
          </button>
        </div>
      </div>
    </div>
  );
}
