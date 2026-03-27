import React, { useState } from 'react';
import { useSFVM } from '../context/SFVMContext';
import { Zap, Play, Pause, Activity } from 'lucide-react';

export const Module12 = () => {
  const { profile } = useSFVM();
  const [activeProgram, setActiveProgram] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!profile) return null;

  const programs = [
    { id: 'anti-aging', name: 'Anti-Aging & Cellular Repair', freq: '528 Hz', sfvm: 7 },
    { id: 'sleep', name: 'Deep Delta Sleep', freq: '3.4 Hz', sfvm: 4 },
    { id: 'chakra', name: 'Full Chakra Alignment', freq: '432 Hz', sfvm: 9 },
    { id: 'abundance', name: 'Abundance & Manifestation', freq: '888 Hz', sfvm: 8 },
    { id: 'rife', name: 'Rife Universal Healing', freq: '10000 Hz', sfvm: 1 },
    { id: 'brain', name: 'Gamma Brain Waves', freq: '40 Hz', sfvm: 5 },
  ];

  const togglePlay = (id: string) => {
    if (activeProgram === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveProgram(id);
      setIsPlaying(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Advanced PEMF Therapy Studio</h1>
        <p className="text-slate-400">iTorus Premium PEMF programs integrated with your SFVM field code.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 space-y-6">
          <h3 className="text-amber-500 font-bold uppercase tracking-wider flex items-center gap-2 border-b border-amber-500/20 pb-4">
            <Zap size={18} />
            Premium Energetics Programs
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {programs.map((p) => (
              <div 
                key={p.id} 
                className={`p-4 rounded-xl border transition-all ${activeProgram === p.id ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-slate-950 border-slate-800 hover:border-amber-500/30'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-200">{p.name}</h4>
                    <p className="text-xs text-slate-500 uppercase mt-1">Base: {p.freq}</p>
                  </div>
                  <button 
                    onClick={() => togglePlay(p.id)}
                    className={`p-2 rounded-full transition-colors ${activeProgram === p.id && isPlaying ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-amber-500 hover:bg-amber-500/20'}`}
                  >
                    {activeProgram === p.id && isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">SFVM Resonance:</span>
                  <span className={`font-mono font-bold ${profile.digits.includes(p.sfvm) ? 'text-green-400' : 'text-amber-400'}`}>
                    {profile.digits.includes(p.sfvm) ? 'High Match' : 'Standard'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
          {isPlaying && (
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at center, #f59e0b 0%, transparent 70%)' }} />
          )}
          
          <div className="text-center space-y-4 relative z-10">
            <h3 className="text-amber-500 uppercase tracking-widest text-sm font-bold">Coil Status</h3>
            <div className={`w-40 h-40 mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${isPlaying ? 'border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.4)] scale-105' : 'border-slate-800'}`}>
              <Activity size={48} className={`transition-all duration-1000 ${isPlaying ? 'text-amber-400 animate-pulse' : 'text-slate-600'}`} />
            </div>
          </div>

          <div className="w-full space-y-2 relative z-10">
            <div className="flex justify-between text-xs text-slate-400 uppercase">
              <span>Intensity</span>
              <span className="text-amber-400 font-mono">75%</span>
            </div>
            <input type="range" className="w-full accent-amber-500" defaultValue={75} disabled={!isPlaying} />
          </div>
        </div>
      </div>
    </div>
  );
};
