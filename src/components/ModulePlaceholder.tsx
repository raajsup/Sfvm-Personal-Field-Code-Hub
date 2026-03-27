import React from 'react';
import { useSFVM } from '../context/SFVMContext';
import { Lock } from 'lucide-react';

export const ModulePlaceholder = ({ title, description }: { title: string, description: string }) => {
  const { profile } = useSFVM();

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <Lock className="text-slate-600 w-16 h-16" />
        <h2 className="text-2xl font-bold text-slate-400">Module Locked</h2>
        <p className="text-slate-500 max-w-md">
          Please calculate and save your Field Code in the Field Code Center to unlock {title}.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">{title}</h1>
        <p className="text-slate-400">{description}</p>
      </div>
      
      <div className="bg-slate-900/50 p-8 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 text-center">
        <p className="text-amber-400 mb-4">Your Field Code: <span className="font-mono font-bold">{profile.code}</span></p>
        <p className="text-slate-300">
          This module is currently calibrating to your specific vibrational frequency.
          The AI is processing your parameters to generate personalized {title.toLowerCase()} protocols.
        </p>
      </div>
    </div>
  );
};
