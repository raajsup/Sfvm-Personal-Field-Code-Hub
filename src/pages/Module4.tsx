import React from 'react';
import { useSFVM } from '../context/SFVMContext';
import { Star, Moon, Sun, Compass } from 'lucide-react';

export const Module4 = () => {
  const { profile } = useSFVM();

  if (!profile) return null;

  const planets = [
    { name: 'Sun', sign: 'Leo', resonance: 94, impact: 'High' },
    { name: 'Moon', sign: 'Cancer', resonance: 88, impact: 'Medium' },
    { name: 'Mercury', sign: 'Virgo', resonance: 72, impact: 'Low' },
    { name: 'Venus', sign: 'Libra', resonance: 99, impact: 'Critical' },
    { name: 'Mars', sign: 'Aries', resonance: 85, impact: 'High' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Advanced Astrology Dashboard</h1>
        <p className="text-slate-400">Personal field-planet resonance and timing based on your SFVM code.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 space-y-6">
          <h3 className="text-amber-500 font-bold uppercase tracking-wider flex items-center gap-2 border-b border-amber-500/20 pb-4">
            <Star size={18} />
            Planetary Resonance Matrix
          </h3>
          
          <div className="space-y-4">
            {planets.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold">
                    {p.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">{p.name}</p>
                    <p className="text-xs text-slate-500 uppercase">{p.sign}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-amber-400">{p.resonance}% Match</p>
                  <p className={`text-xs uppercase font-bold ${p.impact === 'Critical' ? 'text-red-400' : p.impact === 'High' ? 'text-amber-500' : 'text-slate-400'}`}>
                    {p.impact} Impact
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5">
            <h3 className="text-amber-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Compass size={18} />
              Current Transits
            </h3>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="font-bold text-red-400 mb-1">Mercury Retrograde Warning</p>
                <p className="text-xs">Your field code {profile.code} is highly sensitive to the current transit. Delay major decisions until the 14th.</p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="font-bold text-green-400 mb-1">Venus Return Harmony</p>
                <p className="text-xs">Optimal timing for creative and relational endeavors. Resonance peak in 3 days.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5">
            <h3 className="text-amber-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Moon size={18} />
              Lunar Phase
            </h3>
            <div className="text-center space-y-2">
              <div className="w-24 h-24 mx-auto rounded-full bg-slate-800 border-4 border-slate-700 relative overflow-hidden">
                <div className="absolute inset-y-0 right-0 w-1/2 bg-amber-100/80 rounded-r-full" />
              </div>
              <p className="font-bold text-slate-200">First Quarter</p>
              <p className="text-xs text-slate-400 uppercase">Action & Growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
