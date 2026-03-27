import React, { useState } from 'react';
import { useSFVM } from '../context/SFVMContext';
import { calculateSFVM } from '../lib/sfvm';
import { Calculator, Save, AlertCircle } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const Module1 = () => {
  const { profile, saveProfile, user } = useSFVM();
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    dob: profile?.dob || '',
    time: profile?.time || '',
    place: profile?.place || '',
  });
  
  const [result, setResult] = useState(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const calculated = calculateSFVM(
      formData.firstName,
      formData.lastName,
      formData.dob,
      formData.time,
      formData.place
    );
    
    const newProfile = {
      ...formData,
      ...calculated
    };
    
    setResult(newProfile);
    saveProfile(newProfile);
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-amber-500 tracking-widest uppercase">Personal Field Code Center</h1>
        <p className="text-slate-400">Calculate your 6-digit Sacred Field Vibrational Matrix (SFVM) signature.</p>
      </div>

      {!user && (
        <div className="bg-slate-900 border border-amber-500/30 p-6 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AlertCircle className="text-amber-500" />
            <p className="text-slate-300">Sign in to save your Field Code and sync across all 13 modules.</p>
          </div>
          <button 
            onClick={handleLogin}
            className="px-6 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Sign In with Google
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5">
          <h2 className="text-2xl font-semibold text-amber-400 mb-6 flex items-center gap-2">
            <Calculator className="text-amber-500" />
            Input Parameters
          </h2>
          
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400 uppercase tracking-wider">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-100 focus:outline-none focus:border-amber-500"
                  placeholder="e.g. RAISSA"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400 uppercase tracking-wider">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-100 focus:outline-none focus:border-amber-500"
                  placeholder="e.g. HERMANS"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400 uppercase tracking-wider">Date of Birth</label>
                <input 
                  type="date" 
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400 uppercase tracking-wider">Time of Birth</label>
                <input 
                  type="time" 
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400 uppercase tracking-wider">Place of Birth</label>
              <input 
                type="text" 
                name="place"
                value={formData.place}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-100 focus:outline-none focus:border-amber-500"
                placeholder="e.g. GELEEN"
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-6 py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500 text-amber-400 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <Save size={18} />
              Calculate & Save
            </button>
          </form>
        </div>

        {result && (
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-500/5 flex flex-col justify-center items-center text-center space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at center, #f59e0b 0%, transparent 70%)' }} />
            
            <div className="relative z-10 space-y-2">
              <h3 className="text-amber-500 uppercase tracking-widest text-sm font-bold">Your Master Signature</h3>
              <div className="text-5xl md:text-6xl font-mono font-bold text-amber-300 tracking-widest drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                {result.code}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full relative z-10">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/20">
                <p className="text-xs text-slate-400 uppercase">Base Frequency</p>
                <p className="text-2xl font-mono text-amber-400">{result.frequency} Hz</p>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/20">
                <p className="text-xs text-slate-400 uppercase">Biorhythm Phase</p>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-red-400">P: {result.biorhythm.physical}%</span>
                  <span className="text-blue-400">E: {result.biorhythm.emotional}%</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-green-400">I: {result.biorhythm.intellectual}%</span>
                  <span className="text-purple-400">N: {result.biorhythm.intuitive}%</span>
                </div>
              </div>
            </div>

            <div className="w-full text-left space-y-2 relative z-10">
              <h4 className="text-sm text-amber-500 uppercase tracking-wider font-bold border-b border-amber-500/20 pb-2">Calculation Breakdown</h4>
              <ul className="text-sm text-slate-300 space-y-1 font-mono">
                <li>A (Life Path): {result.digits[0]}</li>
                <li>B (First Name): {result.digits[1]} {result.digits[1] > 9 && '(Master)'}</li>
                <li>C (Last Name): {result.digits[2]} {result.digits[2] > 9 && '(Master)'}</li>
                <li>D (Destiny): {result.digits[3]}</li>
                <li>E (Time): {result.digits[4]}</li>
                <li>F (Place): {result.digits[5]}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
