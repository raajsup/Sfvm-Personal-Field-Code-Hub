import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface SFVMProfile {
  firstName: string;
  lastName: string;
  dob: string;
  time: string;
  place: string;
  code: string;
  digits: number[];
  biorhythm: { physical: number; emotional: number; intellectual: number; intuitive: number };
  frequency: number;
}

interface SFVMContextType {
  user: User | null;
  profile: SFVMProfile | null;
  setProfile: (profile: SFVMProfile) => void;
  saveProfile: (profile: SFVMProfile) => Promise<void>;
  loading: boolean;
}

const SFVMContext = createContext<SFVMContextType | undefined>(undefined);

export const SFVMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfileState] = useState<SFVMProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfileState(docSnap.data() as SFVMProfile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setProfileState(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveProfile = async (newProfile: SFVMProfile) => {
    setProfileState(newProfile);
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), newProfile);
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    }
  };

  return (
    <SFVMContext.Provider value={{ user, profile, setProfile: setProfileState, saveProfile, loading }}>
      {children}
    </SFVMContext.Provider>
  );
};

export const useSFVM = () => {
  const context = useContext(SFVMContext);
  if (context === undefined) {
    throw new Error('useSFVM must be used within a SFVMProvider');
  }
  return context;
};
