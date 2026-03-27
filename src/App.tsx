/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SFVMProvider } from './context/SFVMContext';
import { Sidebar } from './components/Sidebar';
import { FloatingMentor } from './components/FloatingMentor';
import { Module1 } from './pages/Module1';
import { Module2 } from './pages/Module2';
import { Module4 } from './pages/Module4';
import { Module5 } from './pages/Module5';
import { Module6 } from './pages/Module6';
import { Module7 } from './pages/Module7';
import { Module8 } from './pages/Module8';
import { Module9 } from './pages/Module9';
import { Module10 } from './pages/Module10';
import { Module11 } from './pages/Module11';
import { Module12 } from './pages/Module12';
import { Module13 } from './pages/Module13';
import { ModulePlaceholder } from './components/ModulePlaceholder';

export default function App() {
  return (
    <SFVMProvider>
      <BrowserRouter>
        <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-amber-500/30">
          <Sidebar />
          
          <main className="flex-1 h-full overflow-y-auto md:ml-64 relative">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                 style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f59e0b\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            
            <div className="relative z-10 p-4 md:p-8 min-h-full">
              <Routes>
                <Route path="/" element={<Module1 />} />
                <Route path="/mandala" element={<Module2 />} />
                <Route path="/mentor" element={<ModulePlaceholder title="B2R Mentor AI Dashboard" description="Proactive daily insights based on your field code." />} />
                <Route path="/astrology" element={<Module4 />} />
                <Route path="/crystals" element={<Module5 />} />
                <Route path="/plants" element={<Module6 />} />
                <Route path="/soulmatch" element={<Module7 />} />
                <Route path="/sound" element={<Module8 />} />
                <Route path="/light" element={<Module9 />} />
                <Route path="/meditation" element={<Module10 />} />
                <Route path="/geobiology" element={<Module11 />} />
                <Route path="/pemf" element={<Module12 />} />
                <Route path="/symbolic" element={<Module13 />} />
              </Routes>
            </div>
          </main>

          <FloatingMentor />
        </div>
      </BrowserRouter>
    </SFVMProvider>
  );
}

