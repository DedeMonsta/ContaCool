// Sistem de teme pentru ContaCool
// Paletă "playful-fintech" - modernă, prietenoasă, dar profesională

export const COLORS = {
  light: {
    // Primary
    primary: '#4F46E5',        // Indigo - acțiuni principale
    primaryDark: '#3730A3',
    primaryLight: '#818CF8',
    
    // Status
    success: '#10B981',         // Emerald - corect
    error: '#EF4444',           // Red - greșit
    warning: '#F59E0B',         // Amber - atenție
    xp: '#F59E0B',              // Amber - XP/puncte
    streak: '#FB923C',          // Orange - streak flame
    
    // Surface
    background: '#F8FAFC',      // Aproape alb
    surface: '#FFFFFF',         // Carduri
    surfaceAlt: '#F1F5F9',
    
    // Text
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    
    // Border
    border: '#E2E8F0',
    borderStrong: '#CBD5E1',
    
    // Module colors
    moduleAchizitie: '#06B6D4',  // Cyan
    moduleVanzare: '#8B5CF6',    // Violet
    modulePlata: '#EC4899',      // Pink
    moduleIncasare: '#10B981',   // Emerald
    
    // Level colors
    level1: '#10B981',  // Verde - explorare
    level2: '#F59E0B',  // Portocaliu - identificare erori
    level3: '#8B5CF6',  // Mov - completare
    
    // Special
    gold: '#FBBF24',
    silver: '#94A3B8',
    bronze: '#A16207',
  },
  dark: {
    primary: '#818CF8',
    primaryDark: '#6366F1',
    primaryLight: '#A5B4FC',
    
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
    xp: '#FBBF24',
    streak: '#FB923C',
    
    background: '#0F172A',
    surface: '#1E293B',
    surfaceAlt: '#334155',
    
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#64748B',
    
    border: '#334155',
    borderStrong: '#475569',
    
    moduleAchizitie: '#22D3EE',
    moduleVanzare: '#A78BFA',
    modulePlata: '#F472B6',
    moduleIncasare: '#34D399',
    
    level1: '#34D399',
    level2: '#FBBF24',
    level3: '#A78BFA',
    
    gold: '#FBBF24',
    silver: '#CBD5E1',
    bronze: '#D97706',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  display: 36,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};
