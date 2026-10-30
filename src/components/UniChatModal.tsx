import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  ExternalLink, 
  DollarSign, 
  Calendar,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira, generateWhatsAppUrl } from '../utils/formatters';

export const UniChatModal: React.FC = () => {
  const { 
    currentUser, 
    isChatModalOpen, 
    setIsChatModalOpen, 
    activeConversation, 
    sendChatMessage,
    showToast 
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; time: string; isMe: boolean }>>([
    {
      sender: activeConversation?.buyerName || 'Buyer',
      text: activeConversation?.lastMessage || "Hi, I saw your listing on UniMarket. Is it still available for campus pickup?",
      time: '10 mins ago',
      isMe: false
    }
  ]);

  if (!isChatModalOpen || !activeConversation) return null;

  const whatsAppUrl = generateWhatsAppUrl(
    '2348039281144',
    activeConversation.productTitle,
    activeConversation.productPrice
  );

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMsg = {
      sender: currentUser?.fullName || 'Me',
      text: text.trim(),
      time: 'Just now',
      isMe: true
    };

    setMessages(prev => [...prev, newMsg]);
    sendChatMessage(activeConversation.id, text.trim());
    if (!textToSend) setInputMessage('');

    // Simulate polite seller automated response after 1.2 seconds
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: activeConversation.sellerName,
          text: "Yes, it is 100% available! I can bring it to SUB Food Court or the Library Quad for you to inspect anytime between 1pm and 5pm today.",
          time: 'Just now',
          isMe: false
        }
      ]);
    }, 1200);
  };

  const handleQuickTemplate = (template: string) => {
    handleSend(template);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto flex flex-col h-[580px]">
        
        {/* Header with Product Preview */}
        <div className="bg-emerald-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeConversation.productImage}
              alt=""
              className="w-10 h-10 rounded-xl object-cover border border-emerald-400 bg-white"
            />
            <div>
              <div className="font-extrabold text-xs sm:text-sm truncate max-w-[220px]">
                {activeConversation.productTitle}
              </div>
              <div className="text-[11px] text-emerald-200 font-bold">
                {formatNaira(activeConversation.productPrice)} • {activeConversation.sellerName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-200 hover:text-white transition-colors"
              title="Switch to WhatsApp"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsChatModalOpen(false)}
              className="p-1.5 rounded-xl text-emerald-300 hover:text-white hover:bg-emerald-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Safe Campus Escrow reminder badge */}
        <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-[11px] text-emerald-900">
          <span className="flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Trade inside campus gates. Do not pay upfront for courier delivery.
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[10px] text-gray-400 mb-0.5 px-1">
                {m.sender} • {m.time}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                  m.isMe
                    ? 'bg-emerald-600 text-white rounded-br-xs'
                    : 'bg-white text-gray-800 border border-gray-200/80 rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Chips */}
        <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-gray-400 flex-shrink-0 text-[10px]">Quick:</span>
          <button
            onClick={() => handleQuickTemplate("Can we meet at SUB Food Court today for physical inspection?")}
            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 text-gray-700 flex-shrink-0 cursor-pointer"
          >
            📍 Meet at SUB
          </button>
          <button
            onClick={() => handleQuickTemplate("Is the price slightly negotiable if I pay right now?")}
            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 text-gray-700 flex-shrink-0 cursor-pointer"
          >
            💰 Negotiate Price
          </button>
          <button
            onClick={() => handleQuickTemplate("Can I test the battery and power charger before handoff?")}
            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 text-gray-700 flex-shrink-0 cursor-pointer"
          >
            ⚡ Test Device
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message to seller..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
