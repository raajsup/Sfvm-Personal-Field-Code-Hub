import React, { useState } from 'react';
import { useSFVM } from '../context/SFVMContext';
import { Heart, Search, Users } from 'lucide-react';
import { calculateSFVM } from '../lib/sfvm';

export const Module7 = () => {
  const { profile } = useSFVM();
  const [partnerData, setPartnerData] = useState({
    firstName: '', lastName: '', dob: '', time: '', place: ''
  });
  const [matchResult, setMatchResult] = useState<any>(null);

  if (!profile) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const partnerCode = calculateSFVM(
      partnerData.firstName, partnerData.lastName, partnerData.dob, partnerData.time, partnerData.place
    );
    
    // Simple mock compatibility logic based on field codes
    let score = 50;
    profile.digits.forEach((d, i) => {
      if (d === partnerCode.digits[i]) score += 10;
      else if ((d + partnerCode.digits[i]) % 9 === 0) score += 5; // 3-6-9 resonance
    });
    
    setMatchResult({
      code: partnerCode.code,
      score: Math.min(100, score),
      biorhythmSync: {
        physical: Math.abs(profile.biorhythm.physical - partnerCode.biorhythm.physical),
        emotional: Math.abs(profile.biorhythm.emotional - partnerCode.biorhythm.emotional),
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Soul Match Dating System</h1>
        <p className="text-slate-400">Field code compatibility scanning and partnership visualization.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5">
          <h3 className="text-amber-500 font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
            <Search size={18} />
            Scan Partner Field
          </h3>
          
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" required
                onChange={e => setPartnerData({...partnerData, firstName: e.target.value})}
                className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-100" />
              <input type="text" placeholder="Last Name" required
                onChange={e => setPartnerData({...partnerData, lastName: e.target.value})}
                className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-100" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="date" required
                onChange={e => setPartnerData({...partnerData, dob: e.target.value})}
                className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-100" />
              <input type="time" required
                onChange={e => setPartnerData({...partnerData, time: e.target.value})}
                className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-100" />
            </div>
            <input type="text" placeholder="Place of Birth" required
              onChange={e => setPartnerData({...partnerData, place: e.target.value})}
              className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-100" />
            
            <button type="submit" className="w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500 text-amber-400 font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
              <Heart size={18} /> Calculate Compatibility
            </button>
          </form>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 flex flex-col items-center justify-center">
          {matchResult ? (
            <div className="text-center space-y-6 w-full">
              <div className="flex justify-center items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/50">
                  <span className="text-amber-400 font-bold text-xl">You</span>
                </div>
                <Heart className="text-red-500 animate-pulse" size={32} />
                <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/50">
                  <span className="text-pink-400 font-bold text-xl">Them</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-amber-500 uppercase tracking-widest text-sm font-bold">Resonance Score</h3>
                <div className="text-6xl font-mono font-bold text-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                  {matchResult.score}%
                </div>
                <p className="text-slate-400 font-mono text-sm">Partner Code: {matchResult.code}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase">Physical Sync</p>
                  <p className="text-amber-400 font-mono">{100 - matchResult.biorhythmSync.physical}%</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase">Emotional Sync</p>
                  <p className="text-pink-400 font-mono">{100 - matchResult.biorhythmSync.emotional}%</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 space-y-4">
              <Users size={48} className="mx-auto opacity-20" />
              <p>Enter partner details to scan field resonance.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
