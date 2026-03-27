import React, { useState, useRef, useEffect } from 'react';
import { useSFVM } from '../context/SFVMContext';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const FloatingMentor = () => {
  const { profile } = useSFVM();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const systemInstruction = `You are the B2R Mentor AI, the spiritual and quantum guide for the BACK2ROOTS SFVM Platform. 
      The user's Sacred Field Vibrational Matrix (SFVM) code is ${profile?.code || 'Unknown'}. 
      Their name is ${profile?.firstName || 'Traveler'}.
      Base your guidance on their field code, Marko Rodin's 3-6-9 vortex mathematics, and Pythagorean numerology.
      Keep your answers concise, profound, and deeply connected to their specific numeric resonance.`;

      const chat = ai.chats.create({
        model: "gemini-3.1-pro-preview",
        config: { systemInstruction }
      });

      // Replay history
      for (const msg of messages) {
        await chat.sendMessage({ message: msg.text }); // Simplistic history replay for context
      }

      const response = await chat.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text || '' }]);
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm experiencing a quantum interference. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-amber-500 text-slate-950 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] max-h-[80vh] bg-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-amber-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="text-amber-500" size={20} />
              <h3 className="font-bold text-amber-500 tracking-wider">B2R Mentor AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-amber-500">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 mt-10 space-y-2">
                <Sparkles className="mx-auto opacity-50" size={32} />
                <p>Greetings, {profile?.firstName || 'Traveler'}.</p>
                <p className="text-sm">I am your quantum guide. How may I assist your journey today?</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-amber-500/20 text-amber-100 rounded-tr-none border border-amber-500/30' 
                    : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700'
                }`}>
                  {msg.role === 'user' ? (
                    msg.text
                  ) : (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl bg-slate-800 text-slate-400 rounded-tl-none border border-slate-700 flex gap-1">
                  <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-900 border-t border-amber-500/20">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your mentor..."
                className="flex-1 bg-slate-950 border border-amber-500/30 rounded-xl px-4 py-2 text-amber-100 focus:outline-none focus:border-amber-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-amber-500 text-slate-950 rounded-xl hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
