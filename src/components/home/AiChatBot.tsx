"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Send, X, Sparkles, Loader2, Bot } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

export function AiChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I am your Rajseba AI Assistant. How can I help you with our home services today? (আপনি বাংলায়ও কথা বলতে পারেন।)",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    const updatedMessages = [...messages, { role: "user" as const, text: userMessage }];
    
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      const replyText = data.reply || "Sorry, I couldn't understand that. Please try again or call our hotline: +8801335106726.";

      setMessages((prev) => [...prev, { role: "model", text: replyText }]);
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Oops! Something went wrong connecting to the AI assistant. Please contact us at +8801335106726.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-[84px] right-4 md:bottom-6 md:right-6 z-[999]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-[#FF6014] to-[#FF7C71] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#FF6014]/25 hover:shadow-xl cursor-pointer relative"
          aria-label="AI Assistant"
        >
          {isOpen ? <X size={24} /> : <Headphones size={24} />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-[156px] right-4 md:bottom-24 md:right-6 w-[340px] sm:w-[380px] h-[480px] bg-white/95 backdrop-blur-md rounded-3xl border border-slate-100 shadow-2xl z-[998] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF6014] to-[#FF7C71] p-4 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                    Rajseba AI Assistant
                    <Sparkles size={12} className="text-amber-200 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-white/80 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    Online & Ready
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FFF8F4]/30 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-200">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-[20px] p-3.5 text-xs font-semibold leading-relaxed shadow-2xs ${
                      msg.role === "user"
                        ? "bg-[#FF6014] text-white rounded-tr-none"
                        : "bg-white text-slate-700 border border-slate-100/50 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-[20px] rounded-tl-none p-3.5 flex items-center gap-1.5 shadow-2xs">
                    <Loader2 size={12} className="animate-spin text-[#FF6014]" />
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">AI is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-slate-100 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl p-1.5 pr-2 focus-within:bg-white focus-within:border-[#FF6014]/30 focus-within:ring-4 focus-within:ring-[#FFF8F4] transition-all"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 bg-transparent text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none px-2"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="w-8 h-8 rounded-xl bg-[#FF6014] hover:bg-[#E0530A] text-white flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
