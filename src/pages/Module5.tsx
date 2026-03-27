import React, { useState } from 'react';
import { useSFVM } from '../context/SFVMContext';
import { Gem, Upload, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const Module5 = () => {
  const { profile } = useSFVM();
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!profile) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCrystal = async () => {
    if (!image) return;
    setLoading(true);
    
    try {
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const prompt = `You are a master crystal healer and geologist. Identify the crystal in this image. 
      Then, analyze its energetic compatibility with the user whose Sacred Field Vibrational Matrix (SFVM) code is ${profile.code}.
      Provide:
      1. Crystal Name
      2. Compatibility Score (0-100%)
      3. Base Frequency (Hz)
      4. Associated Chakra
      5. A brief explanation of how it resonates with their specific SFVM code.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: prompt }
          ]
        }
      });

      setResult(response.text || "Analysis failed.");
    } catch (error) {
      console.error("Crystal analysis error", error);
      setResult("Error analyzing the crystal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Crystal & Mineral Scanner</h1>
        <p className="text-slate-400">AI-powered camera-based crystal identification and SFVM compatibility.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 space-y-6">
          <h3 className="text-amber-500 font-bold uppercase tracking-wider flex items-center gap-2 border-b border-amber-500/20 pb-4">
            <Gem size={18} />
            Scan Crystal
          </h3>
          
          <div className="border-2 border-dashed border-amber-500/30 rounded-xl p-8 text-center hover:bg-amber-500/5 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {image ? (
              <img src={image} alt="Crystal" className="max-h-64 mx-auto rounded-lg shadow-lg" />
            ) : (
              <div className="space-y-4">
                <Upload size={48} className="mx-auto text-amber-500/50" />
                <p className="text-slate-400">Click or drag an image of a crystal to analyze</p>
              </div>
            )}
          </div>

          <button 
            onClick={analyzeCrystal}
            disabled={!image || loading}
            className="w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500 text-amber-400 font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Gem size={18} />}
            {loading ? 'Analyzing Resonance...' : 'Analyze Crystal'}
          </button>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5">
          <h3 className="text-amber-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-amber-500/20 pb-4">
            Analysis Results
          </h3>
          
          {result ? (
            <div className="prose prose-invert prose-amber max-w-none">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 min-h-[300px]">
              <Gem size={48} className="opacity-20" />
              <p>Upload a crystal image to see its resonance with your field code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
