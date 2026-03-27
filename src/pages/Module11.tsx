import React, { useState } from 'react';
import { useSFVM } from '../context/SFVMContext';
import { Globe, MapPin, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const Module11 = () => {
  const { profile } = useSFVM();
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!profile) return null;

  const analyzeLocation = async () => {
    if (!location.trim()) return;
    setLoading(true);
    
    try {
      const prompt = `You are a master geobiologist and energy worker. Analyze the energetic resonance of the location: "${location}".
      The user's Sacred Field Vibrational Matrix (SFVM) code is ${profile.code}.
      Provide:
      1. A brief description of the location's energetic signature.
      2. Its compatibility with the user's SFVM code.
      3. Any known ley lines, sacred sites, or energetic anomalies nearby.
      4. Recommendations for grounding and connecting with the earth in this specific location.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleMaps: {} }]
        }
      });

      setResult(response.text || "Analysis failed.");
    } catch (error) {
      console.error("Geobiology analysis error", error);
      setResult("Error analyzing the location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Geobiology & Earth Connection</h1>
        <p className="text-slate-400">GPS coordinate to field-code conversion and sacred sites database.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 space-y-6">
          <h3 className="text-amber-500 font-bold uppercase tracking-wider flex items-center gap-2 border-b border-amber-500/20 pb-4">
            <Globe size={18} />
            Location Resonance Scanner
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400 uppercase tracking-wider">Enter Location (City, Landmark, or Coordinates)</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && analyzeLocation()}
                className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-3 text-amber-100 focus:outline-none focus:border-amber-500"
                placeholder="e.g. Stonehenge, UK or 51.1789° N, 1.8262° W"
              />
            </div>

            <button 
              onClick={analyzeLocation}
              disabled={!location.trim() || loading}
              className="w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500 text-amber-400 font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <MapPin size={18} />}
              {loading ? 'Scanning Ley Lines...' : 'Analyze Location Resonance'}
            </button>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 min-h-[400px]">
          <h3 className="text-amber-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-amber-500/20 pb-4">
            Geobiological Analysis
          </h3>
          
          {result ? (
            <div className="prose prose-invert prose-amber max-w-none h-[350px] overflow-y-auto pr-4 custom-scrollbar">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <Globe size={48} className="opacity-20" />
              <p>Enter a location to analyze its energetic resonance with your field code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
