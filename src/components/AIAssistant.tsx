import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, X, Send, Bot, Sparkles, RefreshCw, ArrowRight, AlertCircle, ChevronDown, Minimize2 } from "lucide-react";
import { sendChatMessage, fetchSystemHealth } from "../services/api";
import { ChatMessage } from "../types";

export default function AIAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: "Hello! I am the Korvex AI Assistant. I can help explore our software capabilities, explain our AI and RAG architectures, or help prepare your project requirements for an enquiry. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<string>("rules");
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "What services does Korvex offer?",
    "Can you help build an AI SaaS product?",
    "I need a custom business website.",
    "How do I automate my workflow?",
    "What information should I prepare before starting a project?",
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check engine health mode
    fetchSystemHealth().then(res => {
      if (res.aiEngine?.mode) {
        setActiveMode(res.aiEngine.mode);
      }
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(36),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    const apiPayload = newHistory.map(m => ({ role: m.role, content: m.content }));
    const result = await sendChatMessage(apiPayload);

    setLoading(false);
    if (result.mode) {
      setActiveMode(result.mode);
    }

    const assistantMsg: ChatMessage = {
      id: (Date.now() + 1).toString(36),
      role: "assistant",
      content: result.reply,
      mode: result.mode,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages(prev => [...prev, assistantMsg]);
    if (result.suggested_questions && result.suggested_questions.length > 0) {
      setSuggestedQuestions(result.suggested_questions);
    }
  };

  const handoffToEnquiry = () => {
    // Collect user messages to summarize project intent
    const userQueries = messages
      .filter(m => m.role === "user")
      .map(m => m.content)
      .join("\n- ");

    const initialDescription = userQueries
      ? `Discussion with Korvex AI Assistant:\n- ${userQueries}\n\nPlease contact me to review technical feasibility and scope.`
      : "I discussed my project requirements with the Korvex AI assistant and would like to review feasibility.";

    setIsOpen(false);
    navigate("/contact", {
      state: {
        category: "Custom web application",
        description: initialDescription,
      },
    });
  };

  return (
    <div className="ai-assistant-widget">
      {/* Floating Launcher Trigger */}
      {!isOpen && (
        <button
          type="button"
          className="ai-widget-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open Korvex AI Assistant"
        >
          <div className="launcher-glow" />
          <Bot size={22} />
          <span className="launcher-text">Korvex AI</span>
          <span className="status-dot-pulse" title={`Status: ${activeMode.toUpperCase()} Engine`} />
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="ai-chat-window" role="dialog" aria-label="Korvex AI Assistant Window">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="header-left">
              <div className="ai-avatar">
                <Bot size={18} />
              </div>
              <div className="ai-meta">
                <h4>Korvex AI Assistant</h4>
                <div className="ai-status-row">
                  <span className={`status-indicator ${activeMode === "llm" ? "online" : "rules"}`} />
                  <span className="status-mode-label">
                    {activeMode === "llm" ? "Claude Engine Active" : "Knowledge & Rules Active"}
                  </span>
                </div>
              </div>
            </div>
            <div className="header-actions">
              <button
                type="button"
                className="btn-icon"
                onClick={() => setIsOpen(false)}
                title="Minimize assistant"
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="ai-messages-container">
            {messages.map(m => (
              <div key={m.id} className={`chat-bubble-wrap ${m.role}`}>
                <div className="chat-bubble">
                  <div className="bubble-content">{m.content}</div>
                  <span className="bubble-time">{m.timestamp}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble-wrap assistant">
                <div className="chat-bubble loading">
                  <div className="typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="typing-label">Analyzing technical requirements...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {suggestedQuestions.length > 0 && !loading && (
            <div className="ai-suggestions-bar">
              <div className="suggestions-scroll">
                {suggestedQuestions.slice(0, 3).map((q, idx) => (
                  <button
                    type="button"
                    key={idx}
                    className="suggestion-chip"
                    onClick={() => handleSend(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Handoff Bar */}
          {messages.length >= 3 && (
            <div className="ai-handoff-banner">
              <span>Ready to submit specifications?</span>
              <button type="button" className="handoff-btn" onClick={handoffToEnquiry}>
                Start Enquiry <ArrowRight size={13} />
              </button>
            </div>
          )}

          {/* Input Footer */}
          <form
            className="ai-chat-input-form"
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Ask about AI, RAG, software, or workflow automation..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              aria-label="Message to AI Assistant"
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
