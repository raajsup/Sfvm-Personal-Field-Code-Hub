import React, { useEffect, useRef } from 'react';
import { useSFVM } from '../context/SFVMContext';
import { Hexagon, Play, Download } from 'lucide-react';

export const Module2 = () => {
  const { profile } = useSFVM();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!profile || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const cx = width / 2;
    const cy = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Draw Sacred Geometry based on SFVM digits
    const drawPolygon = (sides: number, radius: number, color: string, rotation = 0) => {
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const angle = rotation + (i * 2 * Math.PI) / sides;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#ffffff'];
    
    // Draw based on digits
    profile.digits.forEach((digit, index) => {
      const sides = (digit % 9) || 9; // 1-9
      const radius = 50 + (index * 30);
      const color = colors[sides - 1];
      
      // Animation rotation offset based on time
      const timeOffset = Date.now() / 10000;
      drawPolygon(sides, radius, color, timeOffset * (index % 2 === 0 ? 1 : -1));
    });

  }, [profile]);

  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Sacred Geometry Mandala</h1>
        <p className="text-slate-400">Dr. Robert Gilbert protocol implementation based on your Field Code.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 flex flex-col items-center justify-center">
          <canvas 
            ref={canvasRef} 
            width={400} 
            height={400} 
            className="w-full max-w-[400px] aspect-square bg-slate-950 rounded-full border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20">
            <h3 className="text-amber-500 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Hexagon size={18} />
              Your Geometric Signature
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {profile.digits.map((d, i) => {
                const shapes = ['Point', 'Line', 'Triangle', 'Square', 'Pentagon', 'Hexagon', 'Heptagon', 'Octagon', 'Nonagon'];
                const freqs = [174, 285, 396, 417, 432, 480, 528, 567, 639];
                const val = (d % 9) || 9;
                return (
                  <li key={i} className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="uppercase text-slate-400">Layer {i+1}</span>
                    <span className="font-bold text-amber-400">{shapes[val-1]}</span>
                    <span className="font-mono text-amber-200">{freqs[val-1]}Hz</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500 text-amber-400 font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
              <Play size={18} />
              Play Frequencies
            </button>
            <button className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
