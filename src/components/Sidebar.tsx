import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Calculator, Hexagon, Bot, Star, Gem, Leaf, Heart, 
  Music, Sun, Brain, Globe, Zap, Type, Menu, X
} from 'lucide-react';
import { useSFVM } from '../context/SFVMContext';

const modules = [
  { id: 1, path: '/', name: 'Field Code Center', icon: Calculator },
  { id: 2, path: '/mandala', name: 'Sacred Geometry', icon: Hexagon },
  { id: 3, path: '/mentor', name: 'B2R Mentor AI', icon: Bot },
  { id: 4, path: '/astrology', name: 'Astrology Dashboard', icon: Star },
  { id: 5, path: '/crystals', name: 'Crystal Scanner', icon: Gem },
  { id: 6, path: '/plants', name: 'Plant Identifier', icon: Leaf },
  { id: 7, path: '/soulmatch', name: 'Soul Match Dating', icon: Heart },
  { id: 8, path: '/sound', name: 'Sound Healing', icon: Music },
  { id: 9, path: '/light', name: 'Light Therapy', icon: Sun },
  { id: 10, path: '/meditation', name: 'Meditation AI', icon: Brain },
  { id: 11, path: '/geobiology', name: 'Geobiology', icon: Globe },
  { id: 12, path: '/pemf', name: 'PEMF Therapy', icon: Zap },
  { id: 13, path: '/symbolic', name: 'Symbolic Input', icon: Type },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useSFVM();

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-amber-500 rounded-lg border border-amber-500/30"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-amber-500/20 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col
      `}>
        <div className="p-6 border-b border-amber-500/20">
          <h1 className="text-xl font-bold text-amber-500 tracking-wider flex items-center gap-2">
            <Hexagon className="text-amber-500" />
            BACK2ROOTS
          </h1>
          <p className="text-xs text-amber-500/60 mt-1 uppercase tracking-widest">SFVM Platform</p>
          
          {profile && (
            <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-amber-500/30">
              <p className="text-xs text-slate-400">Current Field Code</p>
              <p className="text-lg font-mono text-amber-400 tracking-widest">{profile.code}</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {modules.map((mod) => (
              <li key={mod.id}>
                <NavLink
                  to={mod.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                      : 'text-slate-400 hover:bg-slate-900 hover:text-amber-200'}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <mod.icon size={18} className={isActive ? 'text-amber-400' : 'text-slate-500'} />
                      <span className="text-sm font-medium">{mod.name}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
