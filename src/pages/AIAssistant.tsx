import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Brain, 
  Heart, 
  BookOpen, 
  Activity,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Mic,
  Paperclip,
  Zap
} from "lucide-react";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
};

const SUGGESTED_QUESTIONS = [
  {
    question: "What are effective early intervention therapies for Down syndrome?",
    icon: Brain,
    category: "Therapy"
  },
  {
    question: "How can I support my child's speech and language development?",
    icon: Activity,
    category: "Development"
  },
  {
    question: "What are the best comprehensive inclusive education strategies?",
    icon: BookOpen,
    category: "Education"
  },
  {
    question: "Activities to improve fine and gross motor skills?",
    icon: Heart,
    category: "Activities"
  },
];

const QUICK_ACTIONS = [
  { label: "Summarize", icon: Zap },
  { label: "Explain More", icon: Brain },
  { label: "Give Examples", icon: BookOpen },
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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px';
  };

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

    // Simulate AI response
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
    <div className="flex flex-col h-[calc(100vh-74px)] overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/30 to-green-50/20">
      {/* Enhanced Header */}
      <header className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200/50 py-4 px-6 shrink-0 shadow-lg">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary via-primary-dark to-primary-light flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-linear-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent flex items-center gap-2">
                AI Assistant
                <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </h1>
              <p className="text-sm text-gray-600 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online • Ready to help
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setMessages([messages[0]])}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
              title="New conversation"
            >
              <RotateCcw className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Section */}
          {messages.length === 1 && (
            <div className="mb-8 animate-fade-in">
              {/* Suggested Topics */}
              <div className="p-6 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 transition-all hover:shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-primary" />
                  <h2 className="text-gray-800 font-bold text-lg">Suggested Topics</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SUGGESTED_QUESTIONS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(item.question)}
                        className="group text-left px-4 py-4 rounded-2xl border border-primary/20 bg-linear-to-br from-green-50/80 to-blue-50/50 hover:from-green-100 hover:to-blue-100 text-primary transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-xl bg-white/80 group-hover:bg-white transition-colors shadow-sm">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-semibold text-primary/60 uppercase tracking-wider">{item.category}</span>
                            <p className="text-sm mt-0.5 font-medium leading-snug">{item.question}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex items-start gap-4 animate-slide-up ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-all hover:scale-110 ${
                  msg.role === "user"
                    ? "bg-linear-to-br from-primary-dark to-primary text-white"
                    : "bg-white border-2 border-primary/30 text-primary"
                }`}
              >
                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6 text-primary" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[75%] group ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`rounded-2xl px-5 py-3.5 shadow-lg transition-all hover:shadow-xl ${
                    msg.role === "user"
                      ? "bg-linear-to-br from-primary to-primary-dark text-white rounded-tr-none"
                      : "bg-white/90 backdrop-blur-sm border border-gray-200/50 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p className="leading-relaxed text-sm whitespace-pre-wrap">{msg.text}</p>
                  <div className={`flex items-center gap-2 mt-2 pt-2 border-t ${
                    msg.role === "user" ? "border-white/20" : "border-gray-200/50"
                  }`}>
                    <p
                      className={`text-[10px] font-medium ${
                        msg.role === "user" ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    {msg.role === "bot" && (
                      <>
                        <button
                          onClick={() => handleCopy(msg.text, msg.id)}
                          className="p-1 rounded hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-gray-500" />
                          )}
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 cursor-pointer">
                          <ThumbsUp className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 cursor-pointer">
                          <ThumbsDown className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {/* Quick Actions for Bot Messages */}
                {msg.role === "bot" && index === messages.length - 1 && !isTyping && (
                  <div className="flex gap-2 mt-2 ml-1 animate-fade-in">
                    {QUICK_ACTIONS.map((action, i) => {
                      const ActionIcon = action.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(`${action.label} your last response`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-gray-200 hover:border-primary/30 hover:bg-white transition-all hover:scale-105 cursor-pointer text-xs text-gray-600 hover:text-primary shadow-sm"
                        >
                          <ActionIcon className="w-3 h-3" />
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-4 animate-slide-up">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg bg-white border-2 border-primary/30 text-primary">
                <Bot className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div className="max-w-[75%] rounded-2xl rounded-tl-none px-5 py-4 shadow-lg bg-white/90 backdrop-blur-sm border border-gray-200/50 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs text-gray-500 font-medium">AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Input Area */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 p-4 shrink-0 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={onSubmit}
            className="relative flex items-end gap-3 bg-linear-to-br from-gray-50 to-white border-2 border-gray-200/50 rounded-3xl p-2.5 focus-within:ring-4 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-inner hover:shadow-lg"
          >
            {/* Attachment Button */}
            <button
              type="button"
              className="p-2.5 rounded-2xl hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
              title="Attach file"
            >
              <Paperclip className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
            </button>
            
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleTextareaInput}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e);
                }
              }}
              placeholder="Ask me anything..."
              className="flex-1 max-h-32 min-h-11 bg-transparent border-none focus:ring-0 resize-none px-3 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
              rows={1}
            />
            
            {/* Voice Input Button */}
            <button
              type="button"
              className="p-2.5 rounded-2xl hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
              title="Voice input"
            >
              <Mic className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
            </button>
            
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-linear-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white p-3 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
            </button>
          </form>
          <div className="text-center mt-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary/60" />
            <p className="text-xs text-gray-500">AI can make mistakes. Consider verifying important information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
