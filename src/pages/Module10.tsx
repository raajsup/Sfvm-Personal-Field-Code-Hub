import React, { useState } from 'react';
import { useSFVM } from '../context/SFVMContext';
import { Brain, Play, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const Module10 = () => {
  const { profile } = useSFVM();
  const [script, setScript] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!profile) return null;

  const generateMeditation = async () => {
    setLoading(true);
    try {
      const prompt = `You are a master meditation guide. Create a personalized, 5-minute guided meditation script for a user named ${profile.firstName}.
      Their Sacred Field Vibrational Matrix (SFVM) code is ${profile.code}.
      Their current biorhythm is: Physical ${profile.biorhythm.physical}%, Emotional ${profile.biorhythm.emotional}%, Intellectual ${profile.biorhythm.intellectual}%, Intuitive ${profile.biorhythm.intuitive}%.
      Incorporate sacred geometry visualizations and Marko Rodin's 3-6-9 vortex mathematics principles into the meditation.
      Keep it profound, calming, and specifically tailored to their numeric resonance.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt
      });

      setScript(response.text || "Failed to generate meditation.");
    } catch (error) {
      console.error("Meditation generation error", error);
      setScript("Error generating meditation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Meditation AI Studio</h1>
        <p className="text-slate-400">AI-generated personalized meditation scripts and sacred geometry visualizations.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 space-y-6">
          <h3 className="text-amber-500 font-bold uppercase tracking-wider flex items-center gap-2 border-b border-amber-500/20 pb-4">
            <Brain size={18} />
            Session Config
          </h3>
          
          <div className="space-y-4 text-sm text-slate-300">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-500 uppercase">Focus</p>
              <p className="text-amber-400 font-bold">Vortex Alignment (3-6-9)</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-500 uppercase">Duration</p>
              <p className="text-amber-400 font-bold">5 Minutes</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <p className="text-xs text-slate-500 uppercase">Biorhythm Target</p>
              <p className="text-amber-400 font-bold">Intuitive ({profile.biorhythm.intuitive}%)</p>
            </div>
          </div>

          <button 
            onClick={generateMeditation}
            disabled={loading}
            className="w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500 text-amber-400 font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Play size={18} />}
            {loading ? 'Generating...' : 'Generate Script'}
          </button>
        </div>

        <div className="md:col-span-2 bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 min-h-[400px]">
          <h3 className="text-amber-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-amber-500/20 pb-4">
            Your Personalized Script
          </h3>
          
          {script ? (
            <div className="prose prose-invert prose-amber max-w-none h-[400px] overflow-y-auto pr-4 custom-scrollbar">
              <ReactMarkdown>{script}</ReactMarkdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <Brain size={48} className="opacity-20" />
              <p>Click "Generate Script" to create your personalized meditation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
