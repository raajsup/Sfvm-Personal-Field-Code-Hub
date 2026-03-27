import React, { useState } from 'react';
import { useSFVM } from '../context/SFVMContext';
import { Type, ArrowRight, RefreshCw } from 'lucide-react';

const SYMBOL_SYSTEMS = [
  { id: 'arabic', name: 'Arabic Abjad', type: 'text' },
  { id: 'hebrew', name: 'Hebrew Gematria', type: 'text' },
  { id: 'runes', name: 'Elder Futhark Runes', type: 'text' },
  { id: 'morse', name: 'Morse Code', type: 'text' },
  { id: 'binary', name: 'Binary', type: 'text' }
];

// Simplified mapping for demonstration
const MAPPINGS: Record<string, Record<string, number>> = {
  arabic: { 'أ': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9, 'ي': 1, 'ك': 2, 'ل': 3, 'م': 4, 'ن': 5, 'س': 6, 'ع': 7, 'ف': 8, 'ص': 9 },
  hebrew: { 'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9, 'י': 1, 'כ': 2, 'ל': 3, 'מ': 4, 'נ': 5, 'ס': 6, 'ע': 7, 'פ': 8, 'צ': 9 },
  runes: { 'ᚠ': 1, 'ᚢ': 2, 'ᚦ': 3, 'ᚨ': 4, 'ᚱ': 5, 'ᚲ': 6, 'ᚷ': 7, 'ᚹ': 8, 'ᚺ': 9, 'ᚾ': 1, 'ᛁ': 2, 'ᛃ': 3, 'ᛇ': 4, 'ᛈ': 5, 'ᛉ': 6, 'ᛊ': 7, 'ᛏ': 8, 'ᛒ': 9 }
};

export const Module13 = () => {
  const { profile } = useSFVM();
  const [system, setSystem] = useState(SYMBOL_SYSTEMS[0].id);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<{char: string, val: number}[]>([]);

  const calculate = () => {
    if (!input) return;

    let sum = 0;
    const newBreakdown = [];

    if (system === 'binary') {
      const parts = input.split(' ');
      for (const p of parts) {
        const val = parseInt(p, 2);
        if (!isNaN(val)) {
          sum += val;
          newBreakdown.push({ char: p, val });
        }
      }
    } else if (system === 'morse') {
      // simplified morse to number mapping
      const morseMap: Record<string, number> = { '.-': 1, '-...': 2, '-.-.': 3, '-..': 4, '.': 5, '..-.': 6, '--.': 7, '....': 8, '..': 9 };
      const parts = input.split(' ');
      for (const p of parts) {
        const val = morseMap[p] || 0;
        sum += val;
        newBreakdown.push({ char: p, val });
      }
    } else {
      const map = MAPPINGS[system];
      for (const char of input) {
        if (char.trim() === '') continue;
        const val = map[char] || 0;
        sum += val;
        newBreakdown.push({ char, val });
      }
    }

    // Reduce to single digit or master
    let finalVal = sum;
    while (finalVal > 9 && ![11, 22, 33, 44, 55, 66, 77, 88, 99].includes(finalVal)) {
      finalVal = finalVal.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }

    setBreakdown(newBreakdown);
    setResult(finalVal);
  };

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <Type className="text-slate-600 w-16 h-16" />
        <h2 className="text-2xl font-bold text-slate-400">Module Locked</h2>
        <p className="text-slate-500 max-w-md">
          Please calculate and save your Field Code in the Field Code Center to unlock Universal Symbolic Input.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Universal Symbolic Input</h1>
        <p className="text-slate-400">Convert ancient and modern symbolic systems into SFVM quantum resonance codes.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-slate-400 uppercase tracking-wider">Select Symbolic System</label>
            <select 
              value={system}
              onChange={(e) => { setSystem(e.target.value); setInput(''); setResult(null); setBreakdown([]); }}
              className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-500"
            >
              {SYMBOL_SYSTEMS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400 uppercase tracking-wider">Input Symbols</label>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-32 bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-3 text-amber-100 text-2xl focus:outline-none focus:border-amber-500 font-serif"
              placeholder={system === 'binary' ? '01000001 01000010' : system === 'morse' ? '.- -...' : 'Enter characters...'}
              dir={system === 'arabic' || system === 'hebrew' ? 'rtl' : 'ltr'}
            />
          </div>

          <button 
            onClick={calculate}
            className="w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500 text-amber-400 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest"
          >
            <RefreshCw size={18} />
            Convert to SFVM
          </button>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 flex flex-col items-center justify-center min-h-[400px]">
          {result !== null ? (
            <div className="text-center space-y-8 w-full">
              <div className="space-y-2">
                <h3 className="text-amber-500 uppercase tracking-widest text-sm font-bold">Quantum Resonance Value</h3>
                <div className="text-6xl font-mono font-bold text-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                  {result}
                </div>
              </div>

              <div className="w-full bg-slate-950/80 p-4 rounded-xl border border-amber-500/20 text-left">
                <p className="text-xs text-slate-400 uppercase mb-3 border-b border-amber-500/20 pb-2">Conversion Breakdown</p>
                <div className="flex flex-wrap gap-2">
                  {breakdown.map((b, i) => (
                    <div key={i} className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                      <span className="text-amber-200 font-serif text-lg">{b.char}</span>
                      <ArrowRight size={12} className="text-slate-500" />
                      <span className="text-amber-500 font-mono">{b.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 space-y-4">
              <Type size={48} className="mx-auto opacity-20" />
              <p>Enter symbols to calculate their vibrational resonance.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
