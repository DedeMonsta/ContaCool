import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProgressContext = createContext();

const INITIAL_STATE = {
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  completedLessons: {},
  totalCorrect: 0,
  totalWrong: 0,
  unlocked: ['achizitie', 'vanzare', 'plata', 'incasare'],
  badges: [],
  hapticsEnabled: true,
  tutorialCompleted: false,
};

const STORAGE_KEY = '@contacool_progress_v3';

export const ProgressProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [loaded, setLoaded] = useState(false);
  const stateRef = useRef(state);

  // Sincronizez state-ul cu ref-ul pentru a evita closure stale
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Încărcare la pornire
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value) {
        try {
          const parsed = JSON.parse(value);
          const merged = { ...INITIAL_STATE, ...parsed };
          setState(merged);
        } catch (e) {
          console.warn('Eroare parse progres:', e);
        }
      }
      setLoaded(true);
    }).catch((e) => {
      console.warn('Eroare AsyncStorage:', e);
      setLoaded(true);
    });
  }, []);

  // Helper pentru a salva imediat
  const persist = async (newState) => {
    setState(newState);
    stateRef.current = newState;
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.warn('Eroare salvare:', e);
    }
  };

  const addXP = async (amount) => {
    const current = stateRef.current;
    const today = new Date().toDateString();
    let newStreak = current.streak;

    if (current.lastActiveDate !== today) {
      if (current.lastActiveDate) {
        const lastDate = new Date(current.lastActiveDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastDate) / 86400000);
        if (diffDays === 1) newStreak += 1;
        else if (diffDays > 1) newStreak = 1;
      } else {
        newStreak = 1;
      }
    }

    await persist({
      ...current,
      xp: current.xp + amount,
      streak: newStreak,
      lastActiveDate: today,
    });
  };

  const completeLesson = async (lessonId, stars) => {
    const current = stateRef.current;
    const existing = current.completedLessons[lessonId];
    const newCompleted = {
      ...current.completedLessons,
      [lessonId]: {
        stars: Math.max(stars, existing?.stars || 0),
        attempts: (existing?.attempts || 0) + 1,
        completedAt: new Date().toISOString(),
      },
    };
    await persist({ ...current, completedLessons: newCompleted });
  };

  const unlockModule = async (moduleId) => {
    const current = stateRef.current;
    if (!current.unlocked.includes(moduleId)) {
      await persist({ ...current, unlocked: [...current.unlocked, moduleId] });
    }
  };

  const incrementCorrect = async () => {
    const current = stateRef.current;
    await persist({ ...current, totalCorrect: current.totalCorrect + 1 });
  };

  const incrementWrong = async () => {
    const current = stateRef.current;
    await persist({ ...current, totalWrong: current.totalWrong + 1 });
  };

  const addBadge = async (badge) => {
    const current = stateRef.current;
    if (!current.badges.includes(badge)) {
      await persist({ ...current, badges: [...current.badges, badge] });
    }
  };

  const toggleHaptics = async () => {
    const current = stateRef.current;
    await persist({ ...current, hapticsEnabled: !current.hapticsEnabled });
  };

  const setTutorialCompleted = async (value) => {
    const current = stateRef.current;
    await persist({ ...current, tutorialCompleted: value });
  };

  const resetProgress = async () => {
    await persist(INITIAL_STATE);
  };

  const getLevel = () => Math.floor(Math.sqrt(state.xp / 100)) + 1;
  const getXPForNextLevel = () => {
    const level = getLevel();
    return level * level * 100;
  };
  const getCurrentLevelXP = () => {
    const level = getLevel();
    return (level - 1) * (level - 1) * 100;
  };

  if (!loaded) return null;

  return (
    <ProgressContext.Provider
      value={{
        ...state,
        addXP,
        completeLesson,
        unlockModule,
        incrementCorrect,
        incrementWrong,
        addBadge,
        toggleHaptics,
        setTutorialCompleted,
        resetProgress,
        getLevel,
        getXPForNextLevel,
        getCurrentLevelXP,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
