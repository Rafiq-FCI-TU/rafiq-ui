import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
};

const SUGGESTED_QUESTIONS = [
  "What are effective early intervention therapies for Down syndrome?",
  "How can I support my child's speech and language development?",
  "What are the best comprehensive inclusive education strategies?",
  "Activities to improve fine and gross motor skills?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      text: "Hello! I'm your Rafiq AI Assistant. I can help you with parenting advice, health questions, or navigating the platform. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: "I am currently a demo assistant. Once connected to a backend, I will provide insightful, personalized answers based on your specific questions!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-74px)] overflow-hidden bg-gray-50">
      <header className="bg-white border-b border-gray-100 py-4 px-6 shrink-0 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Assistant
          </h1>
          <p className="text-sm text-gray-500">Your personalized health and parenting guide</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 1 && (
            <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all">
              <h2 className="text-gray-800 font-semibold mb-4 text-center">Suggested Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SUGGESTED_QUESTIONS.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(question)}
                    className="text-left px-4 py-3 rounded-xl border border-primary/20 bg-green-50/50 hover:bg-green-100 text-primary transition-colors text-sm cursor-pointer"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user"
                    ? "bg-linear-to-r from-primary-dark to-primary text-white"
                    : "bg-white border-2 border-primary-light text-primary"
                  }`}
              >
                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6 text-primary" />}
              </div>

              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm ${msg.role === "user"
                    ? "bg-primary text-white rounded-tr-none"
                    : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                  }`}
              >
                <p className="leading-relaxed text-sm">{msg.text}</p>
                <p
                  className={`text-[10px] mt-2 font-medium ${msg.role === "user" ? "text-green-100" : "text-gray-400"
                    }`}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm bg-white border-2 border-primary-light text-primary">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div className="max-w-[75%] rounded-2xl rounded-tl-none px-5 py-4 shadow-sm bg-white border border-gray-100 text-gray-800 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                <span className="text-sm text-gray-500 font-medium tracking-widest animate-pulse">Typing...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={onSubmit}
            className="flex items-end gap-3 bg-gray-50 border border-gray-200 rounded-3xl p-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-inner"
          >
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e);
                }
              }}
              placeholder="Ask anything..."
              className="flex-1 max-h-32 min-h-11 bg-transparent border-none focus:ring-0 resize-none px-4 py-2.5 text-sm text-gray-800 outline-none"
              rows={1}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-primary hover:bg-primary-dark text-white p-3 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
            >
              <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-xs text-gray-400">AI can make mistakes. Consider verifying important information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
