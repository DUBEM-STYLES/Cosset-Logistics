import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Sparkles, AlertCircle, Bot, User } from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am **Cosset AI**, your premium logistics specialist. 👋\n\nHow can I help you coordinate your moving, delivery, or hauling today? I can also assist with real-time estimates and service area coverages across Canada!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setErrorLocal(null);
    const userMsgId = String(Date.now());
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMessage]);
    setMessageText("");
    setLoading(true);

    try {
      const chatPayload = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatPayload }),
      });

      if (!res.ok) {
        throw new Error("Unable to reach AI core terminal.");
      }

      const data = await res.json();
      
      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "assistant",
          content: data.content,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (err: any) {
      setErrorLocal(err?.message || "Something went wrong.");
      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now() + 2),
          role: "assistant",
          content: "⚠️ I encountered an error communicating with our logistical server nodes. Check your connections or call our central support directly at **+1 (431) 373-5054**.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(messageText);
  };

  const handleFAQClick = (faqText: string) => {
    handleSendMessage(faqText);
  };

  // Basic paragraph & bold styling converter for Gemini response markup
  const renderMessageContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      // Check if it's a list item
      if (paragraph.trim().startsWith("- ") || paragraph.trim().startsWith("* ")) {
        const items = paragraph.split(/\n[-*]\s+/).filter(Boolean);
        return (
          <ul key={index} className="list-disc pl-5 my-2 space-y-1 text-xs leading-relaxed">
            {items.map((item, i) => (
              <li key={i} className="text-slate-700 dark:text-slate-350" dangerouslySetInnerHTML={{ __html: formatBoldMarkdown(item) }}></li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="text-xs leading-relaxed text-slate-800 dark:text-slate-300 my-1 pb-1" dangerouslySetInnerHTML={{ __html: formatBoldMarkdown(paragraph) }}>
        </p>
      );
    });
  };

  const formatBoldMarkdown = (text: string) => {
    // Escape standard HTML tags
    let formatted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    // Convert bold identifiers (**word** or *word*)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold text-slate-900 dark:text-white'>$1</strong>");
    formatted = formatted.replace(/\*(.*?)\*/g, "<strong class='font-bold text-slate-900 dark:text-white'>$1</strong>");
    
    // Replace inline code blocks
    formatted = formatted.replace(/`(.*?)`/g, "<code class='bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-[10px] text-royal-blue'>$1</code>");
    return formatted;
  };

  const faqPrompts = [
    "What are your base rates for Moving?",
    "Which cities do you serve in Canada?",
    "Can you help me clear junk/appliances?",
    "How can I track my shipment CS-98421?"
  ];

  return (
    <>
      {/* Floating launcher badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-tr from-royal-blue to-blue-500 hover:from-royal-blue-hover hover:to-blue-600 rounded-full text-white shadow-2xl flex items-center justify-center cursor-pointer transform hover:scale-105 transition-all group"
          aria-label="Open AI Assistant"
        >
          <MessageSquare className="w-6 h-6 animate-pulse group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
          </span>
        </button>
      )}

      {/* Expanded chat panel sidebar */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[340px] sm:w-[380px] h-[520px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-40 overflow-hidden flex flex-col justify-between">
          
          {/* Header */}
          <div className="bg-slate-950 text-white p-4 flex items-center justify-between relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-royal-blue to-emerald-400"></div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-royal-blue to-blue-500 flex items-center justify-center text-white">
                <Bot className="w-5 h-5 text-white animate-bounce" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest block font-sans">
                  Cosset AI Chat
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping inline-block"></span>
                  Connected & Smart
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/40">
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div key={msg.id} className={`flex items-start gap-2.5 ${!isAssistant ? "flex-row-reverse" : "flex-row"}`}>
                  
                  {/* Avatar Icon */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    isAssistant 
                      ? "bg-slate-900 border-slate-800 text-royal-blue" 
                      : "bg-royal-blue border-white/10 text-white"
                  }`}>
                    {isAssistant ? <Bot className="w-4 h-4 text-royal-blue" /> : <User className="w-4 h-4 text-white" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[75%] rounded-2xl p-3 shadow-xs ${
                    isAssistant 
                      ? "bg-white dark:bg-slate-850 text-slate-800 rounded-tl-none border border-slate-100 dark:border-slate-800" 
                      : "bg-royal-blue text-white rounded-tr-none"
                  }`}>
                    {renderMessageContent(msg.content)}
                    <span className={`text-[8.5px] block mt-1 text-right  ${
                      isAssistant ? "text-slate-400" : "text-blue-100"
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 bg-white dark:bg-slate-850 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 w-max shrink-0">
                <Loader2 className="w-4 h-5 animate-spin text-royal-blue" />
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                  Consulting fleet grids...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* FAQ quick suggestions panel when idle */}
          {messages.length === 1 && !loading && (
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono block mb-1 px-1">
                Frequently Asked Corridors:
              </span>
              <div className="grid grid-cols-2 gap-1 px-1">
                {faqPrompts.map((faq) => (
                  <button
                    key={faq}
                    onClick={() => handleFAQClick(faq)}
                    className="p-1.5 text-left border border-slate-150 dark:border-slate-800 rounded-lg hover:border-royal-blue hover:bg-slate-50 dark:hover:bg-slate-850 transition-all text-[10px] font-medium text-slate-600 dark:text-slate-400 leading-tight block w-full truncate cursor-pointer"
                  >
                    {faq}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Form Footer */}
          <form onSubmit={handleSubmit} className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-150 dark:border-slate-800/80 flex gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Ask Cosset AI anything..."
              className="flex-1 bg-slate-55 dark:bg-slate-850 text-slate-850 dark:text-slate-150 border border-slate-200 dark:border-slate-750 p-2 rounded-xl text-xs focus:outline-none focus:border-royal-blue"
              maxLength={400}
              disabled={loading}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2.5 bg-royal-blue hover:bg-royal-blue-hover text-white rounded-xl transition-all font-mono"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
