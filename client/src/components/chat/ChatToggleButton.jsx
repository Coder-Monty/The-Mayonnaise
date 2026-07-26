import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useResultContext } from '../../context/ResultContext';

export default function ChatToggleButton() {
  const { toggleChat, isChatOpen } = useResultContext();

  return (
    <button
      type="button"
      onClick={toggleChat}
      aria-label="Open AI Assistant Chat"
      title="AI Assistant Chat"
      className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer hover:scale-105 active:scale-95 border border-[#6FCB65]/30 shrink-0 ${
        isChatOpen ? 'ring-2 ring-[#6FCB65] ring-offset-1' : ''
      }`}
      style={{
        backgroundColor: 'var(--color-accent, #A8E6A1)',
        color: 'var(--color-text, #1F2937)',
      }}
    >
      <MessageCircle className="w-[19px] h-[19px] stroke-[2]" />
    </button>
  );
}
