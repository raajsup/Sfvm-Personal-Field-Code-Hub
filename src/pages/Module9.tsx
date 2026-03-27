import React, { useState } from 'react';
import { useSFVM } from '../context/SFVMContext';
import { Sun, Lightbulb, Zap } from 'lucide-react';

export const Module9 = () => {
  const { profile } = useSFVM();
  const [activeColor, setActiveColor] = useState<string | null>(null);

  if (!profile) return null;

  const colors = [
    { name: 'Red', hex: '#ef4444', freq: '174Hz', chakra: 'Root', sfvm: 1 },
    { name: 'Orange', hex: '#f97316', freq: '285Hz', chakra: 'Sacral', sfvm: 2 },
    { name: 'Yellow', hex: '#eab308', freq: '396Hz', chakra: 'Solar Plexus', sfvm: 3 },
    { name: 'Green', hex: '#22c55e', freq: '417Hz', chakra: 'Heart', sfvm: 4 },
    { name: 'Blue', hex: '#3b82f6', freq: '432Hz', chakra: 'Throat', sfvm: 5 },
    { name: 'Indigo', hex: '#6366f1', freq: '480Hz', chakra: 'Third Eye', sfvm: 6 },
    { name: 'Violet', hex: '#a855f7', freq: '528Hz', chakra: 'Crown', sfvm: 7 },
    { name: 'Pink', hex: '#ec4899', freq: '567Hz', chakra: 'High Heart', sfvm: 8 },
    { name: 'White', hex: '#ffffff', freq: '639Hz', chakra: 'Soul Star', sfvm: 9 },
  ];

  const prescribedColors = profile.digits.map(d => colors[(d % 9) || 8]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Light Therapy Laboratory</h1>
        <p className="text-slate-400">Real-time color prescriptions based on your current energy state.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 space-y-6">
          <h3 className="text-amber-500 font-bold uppercase tracking-wider flex items-center gap-2 border-b border-amber-500/20 pb-4">
            <Sun size={18} />
            SFVM Color Prescription
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            {prescribedColors.slice(0, 6).map((c, i) => (
              <button 
                key={i}
                onClick={() => setActiveColor(c.hex)}
                className="flex flex-col items-center gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full shadow-lg" style={{ backgroundColor: c.hex, boxShadow: `0 0 20px ${c.hex}40` }} />
                <span className="text-xs font-bold text-slate-300 uppercase">{c.name}</span>
                <span className="text-[10px] text-slate-500">{c.chakra}</span>
              </button>
            ))}
          </div>

          <button className="w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500 text-amber-400 font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
            <Zap size={18} /> Sync with Smart Home
          </button>
        </div>

        <div 
          className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 flex flex-col items-center justify-center min-h-[400px] transition-colors duration-1000 relative overflow-hidden"
          style={{ backgroundColor: activeColor ? `${activeColor}20` : undefined }}
        >
          {activeColor && (
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at center, ${activeColor} 0%, transparent 70%)` }} />
          )}
          
          <div className="text-center space-y-6 relative z-10">
            <Lightbulb size={64} className="mx-auto" style={{ color: activeColor || '#94a3b8', filter: activeColor ? `drop-shadow(0 0 30px ${activeColor})` : 'none' }} />
            
            {activeColor ? (
              <div className="space-y-2">
                <h3 className="text-2xl font-bold uppercase tracking-widest" style={{ color: activeColor }}>Therapy Active</h3>
                <p className="text-slate-300">Bathing your field in resonant frequencies.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-slate-400 uppercase tracking-widest font-bold">Select a color</h3>
                <p className="text-slate-500">Choose a prescribed color to begin therapy.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
