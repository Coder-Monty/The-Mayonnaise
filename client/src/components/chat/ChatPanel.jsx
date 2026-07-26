import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Sparkles, Tag, Bot, User, AlertCircle, Info, BarChart3, CheckCircle2, RefreshCw, Maximize2, Minimize2, GripVertical } from 'lucide-react';
import { useResultContext } from '../../context/ResultContext';

export default function ChatPanel() {
  const {
    isChatOpen,
    setIsChatOpen,
    latestPredictorResult,
    latestResearchResult,
  } = useResultContext();

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hey there! 👋 I am your Reelytics AI Assistant. How can I help you improve your reel script, analyze your scores, or brainstorm viral content ideas today?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [taggedType, setTaggedType] = useState('none'); // 'none' | 'predictor' | 'research'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Resizing state (Width adjustment)
  const [panelWidth, setPanelWidth] = useState(420); // Default 420px
  const [isResizing, setIsResizing] = useState(false);

  const messagesEndRef = useRef(null);

  const hasPredictorResult = Boolean(latestPredictorResult);
  const hasResearchResult = Boolean(latestResearchResult);
  const hasAnyResult = hasPredictorResult || hasResearchResult;

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen, loading]);

  // Handle Drag Resizing
  const startResizing = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      const clampedWidth = Math.max(320, Math.min(850, Math.min(newWidth, window.innerWidth - 30)));
      setPanelWidth(clampedWidth);
    },
    [isResizing]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    } else {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  // Toggle quick expand/collapse width preset
  const toggleExpand = () => {
    setPanelWidth((prev) => (prev >= 600 ? 420 : 650));
  };

  // Quick Action Prompts
  const quickPrompts = [
    { label: '🔥 Improve my hook', text: 'Can you improve the hook of my script to boost 3-second retention?' },
    { label: '🎬 Rewrite full script', text: 'Please rewrite my script into a high-retention structure with visual cues and a strong CTA.' },
    { label: '💡 Brainstorm viral angles', text: 'What are 3 high-converting content angles or hooks I can try for this topic?' },
  ];

  // Handle tag change
  const handleTagChange = (type) => {
    if (type === 'predictor' && !hasPredictorResult) return;
    if (type === 'research' && !hasResearchResult) return;
    setTaggedType((prev) => (prev === type ? 'none' : type));
  };

  const handleSendMessage = async (textToSend = null) => {
    const messageText = (textToSend || inputMessage).trim();
    if (!messageText || loading) return;

    const userMsg = { role: 'user', content: messageText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setLoading(true);
    setError(null);

    // Prepare taggedContext payload
    let taggedData = null;
    if (taggedType === 'predictor' && hasPredictorResult) {
      taggedData = latestPredictorResult;
    } else if (taggedType === 'research' && hasResearchResult) {
      taggedData = latestResearchResult;
    }

    const payload = {
      message: messageText,
      chatHistory: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
      taggedContext: {
        type: taggedData ? taggedType : 'none',
        data: taggedData,
      },
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg = {
        role: 'assistant',
        content: data.reply || 'No response returned.',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat API error:', err);
      setError(err.message || 'Failed to send chat message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isChatOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-gray-900/30 backdrop-blur-xs z-40 transition-opacity duration-300"
        onClick={() => setIsChatOpen(false)}
      />

      {/* Slide-in panel with dynamic width */}
      <aside
        style={{ width: `${panelWidth}px`, select: isResizing ? 'none' : 'auto' }}
        className={`fixed top-0 right-0 z-50 h-full bg-white border-l border-gray-200/80 shadow-2xl flex flex-col font-sans transition-all duration-75 ease-out sm:rounded-l-2xl overflow-hidden ${
          isResizing ? 'select-none' : ''
        }`}
      >
        {/* Left Drag Handle (Resizer) */}
        <div
          onMouseDown={startResizing}
          title="Drag to resize panel width"
          className="absolute left-0 top-0 bottom-0 w-2.5 hover:w-3.5 bg-transparent hover:bg-[#6FCB65]/30 cursor-col-resize cursor-ew-resize transition-all duration-150 flex items-center justify-center z-50 group"
        >
          <div className="w-1 h-10 rounded-full bg-gray-300/80 group-hover:bg-[#6FCB65] transition-colors flex items-center justify-center">
            <GripVertical className="w-3 h-3 text-white opacity-0 group-hover:opacity-100" />
          </div>
        </div>

        {/* Panel Header */}
        <div className="pl-5 pr-4 py-3.5 border-b border-gray-200/80 flex items-center justify-between bg-gradient-to-r from-[#A8E6A1]/20 via-emerald-50/40 to-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#A8E6A1] to-[#6FCB65] flex items-center justify-center text-[#1F2937] shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-[#1F2937]">Reelytics AI</h2>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#A8E6A1]/60 text-[#1F2937]">
                  PRO
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#6B7280]">
                Content Strategy Assistant ({panelWidth}px)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Quick Expand / Collapse Button */}
            <button
              type="button"
              onClick={toggleExpand}
              aria-label={panelWidth >= 600 ? 'Collapse width' : 'Expand width'}
              title={panelWidth >= 600 ? 'Collapse width (420px)' : 'Expand width (650px)'}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition duration-150 cursor-pointer"
            >
              {panelWidth >= 600 ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              aria-label="Close chat"
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition duration-150 cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Tag Context Selector */}
        <div className="pl-5 pr-4 py-3 border-b border-gray-200/80 bg-gray-50/50 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#1F2937] flex items-center gap-1.5 uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[#6FCB65]" />
              Attach Context Data
            </span>
            {taggedType !== 'none' && (
              <button
                type="button"
                onClick={() => setTaggedType('none')}
                className="text-[11px] font-semibold text-[#6B7280] hover:text-[#1F2937] transition cursor-pointer"
              >
                Clear Tag
              </button>
            )}
          </div>

          {!hasAnyResult ? (
            <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-amber-800 text-xs flex items-center gap-2 shadow-xs">
              <Info className="w-4 h-4 shrink-0 text-amber-600" />
              <span className="text-[11px] font-medium">No results generated yet — run Predictor or Research first.</span>
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-2">
            {/* Predictor Pill */}
            <button
              type="button"
              disabled={!hasPredictorResult}
              onClick={() => handleTagChange('predictor')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 flex items-center justify-between gap-1.5 ${
                !hasPredictorResult
                  ? 'bg-gray-100/70 border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                  : taggedType === 'predictor'
                  ? 'bg-[#A8E6A1] border-[#6FCB65] text-[#1F2937] shadow-xs'
                  : 'bg-white border-gray-200 text-[#4B5563] hover:bg-gray-100/80 cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#6FCB65]" />
                <span className="truncate">Predictor</span>
              </div>
              {taggedType === 'predictor' && <CheckCircle2 className="w-3.5 h-3.5 text-[#1F2937] shrink-0" />}
            </button>

            {/* Research Pill */}
            <button
              type="button"
              disabled={!hasResearchResult}
              onClick={() => handleTagChange('research')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 flex items-center justify-between gap-1.5 ${
                !hasResearchResult
                  ? 'bg-gray-100/70 border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                  : taggedType === 'research'
                  ? 'bg-[#A8E6A1] border-[#6FCB65] text-[#1F2937] shadow-xs'
                  : 'bg-white border-gray-200 text-[#4B5563] hover:bg-gray-100/80 cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <BarChart3 className="w-3.5 h-3.5 shrink-0 text-[#6FCB65]" />
                <span className="truncate">Research</span>
              </div>
              {taggedType === 'research' && <CheckCircle2 className="w-3.5 h-3.5 text-[#1F2937] shrink-0" />}
            </button>
          </div>
        </div>

        {/* Chat Thread with Custom Scrollbar */}
        <div className="flex-1 pl-5 pr-4 py-4 overflow-y-auto custom-scrollbar space-y-4 bg-gradient-to-b from-white to-gray-50/30">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={idx}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#A8E6A1] to-[#6FCB65] flex items-center justify-center text-[#1F2937] shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs transition-all ${
                    isUser
                      ? 'bg-gradient-to-r from-[#A8E6A1] to-[#8BE081] text-[#1F2937] font-medium rounded-2xl rounded-tr-xs'
                      : 'bg-white border border-gray-200/90 text-[#1F2937] rounded-2xl rounded-tl-xs whitespace-pre-wrap'
                  }`}
                >
                  {msg.content}
                </div>
                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Action Suggestion Chips */}
          {messages.length <= 2 && !loading && (
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1">
                Suggested Prompts
              </span>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((qp, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSendMessage(qp.text)}
                    className="text-left px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-[#1F2937] hover:bg-[#A8E6A1]/20 hover:border-[#6FCB65] transition-all cursor-pointer shadow-2xs"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-gray-200 text-xs text-gray-600 max-w-[75%] shadow-xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#6FCB65]" />
              <span>AI is thinking & formatting script...</span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs shadow-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="pl-5 pr-4 py-3.5 border-t border-gray-200/80 bg-white flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask AI assistant..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A8E6A1] focus:bg-white transition-all text-[#1F2937] placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className={`p-2.5 rounded-xl font-bold transition-all duration-150 flex items-center justify-center shrink-0 ${
              loading || !inputMessage.trim()
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#A8E6A1] to-[#6FCB65] text-[#1F2937] hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer'
            }`}
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </aside>
    </>
  );
}
