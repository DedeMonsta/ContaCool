import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, SHADOWS, SPACING, FONT_SIZE } from '../theme/theme';
import { playTap } from '../utils/feedback';
import { useProgress } from '../context/ProgressContext';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null,
  style = {},
}) => {
  const { colors } = useTheme();
  const { hapticsEnabled } = useProgress();
  const scale = useSharedValue(1);

  const bgColors = {
    primary: colors.primary,
    secondary: colors.surfaceAlt,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
  };

  const textColors = {
    primary: '#FFFFFF',
    secondary: colors.text,
    success: '#FFFFFF',
    error: '#FFFFFF',
    warning: '#FFFFFF',
  };

  const handlePress = () => {
    playTap(hapticsEnabled);
    onPress?.();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const paddingV = size === 'sm' ? 10 : size === 'lg' ? 16 : 13;
  const paddingH = size === 'sm' ? 16 : size === 'lg' ? 28 : 22;
  const fontSize =
    size === 'sm' ? FONT_SIZE.sm : size === 'lg' ? FONT_SIZE.lg : FONT_SIZE.md;

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        onPress={handlePress}
        onPressIn={() => (scale.value = withSpring(0.96, { damping: 15 }))}
        onPressOut={() => (scale.value = withSpring(1, { damping: 15 }))}
        disabled={disabled}
        style={[
          styles.button,
          {
            backgroundColor: disabled ? colors.borderStrong : bgColors[variant],
            paddingVertical: paddingV,
            paddingHorizontal: paddingH,
          },
          SHADOWS.sm,
        ]}
      >
        {icon && <Text style={styles.buttonIcon}>{icon}</Text>}
        <Text style={[styles.buttonText, { color: textColors[variant], fontSize }]}>
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export const Card = ({ children, style = {}, onPress = null, color = null }) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (onPress) {
    return (
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={onPress}
          onPressIn={() => (scale.value = withSpring(0.98, { damping: 15 }))}
          onPressOut={() => (scale.value = withSpring(1, { damping: 15 }))}
          style={[
            styles.card,
            { backgroundColor: color || colors.surface, borderColor: colors.border },
            SHADOWS.sm,
            style,
          ]}
        >
          {children}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: color || colors.surface, borderColor: colors.border },
        SHADOWS.sm,
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const ProgressBar = ({
  progress = 0,
  height = 12,
  color = null,
  backgroundColor = null,
  showLabel = false,
}) => {
  const { colors } = useTheme();
  const width = useSharedValue(0);

  React.useEffect(() => {
    width.value = withTiming(progress * 100, { duration: 600 });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View
      style={[
        styles.progressContainer,
        {
          height,
          backgroundColor: backgroundColor || colors.surfaceAlt,
          borderRadius: height / 2,
        },
      ]}
    >
      <Animated.View
        style={[
          { height: '100%', backgroundColor: color || colors.primary, borderRadius: height / 2 },
          animatedStyle,
        ]}
      />
      {showLabel && (
        <Text style={[styles.progressLabel, { color: colors.text }]}>
          {Math.round(progress * 100)}%
        </Text>
      )}
    </View>
  );
};

export const StatsHeader = () => {
  const { colors } = useTheme();
  const { xp, streak, getLevel } = useProgress();
  const level = getLevel();

  return (
    <View style={styles.statsHeader}>
      <View style={[styles.statBox, { backgroundColor: colors.surface }]}>
        <Text style={styles.statIcon}>⭐</Text>
        <View>
          <Text style={[styles.statValue, { color: colors.text }]}>Nivel {level}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{xp} XP</Text>
        </View>
      </View>
      <View style={[styles.statBox, { backgroundColor: colors.surface }]}>
        <Text style={styles.statIcon}>🔥</Text>
        <View>
          <Text style={[styles.statValue, { color: colors.text }]}>{streak}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>streak zile</Text>
        </View>
      </View>
    </View>
  );
};

export const Stars = ({ count = 0, size = 24 }) => {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3].map((i) => (
        <Text key={i} style={{ fontSize: size, marginHorizontal: 2 }}>
          {i <= count ? '⭐' : '☆'}
        </Text>
      ))}
    </View>
  );
};

export const Badge = ({ text, color = '#4F46E5', textColor = '#FFFFFF' }) => {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={[styles.badgeText, { color: textColor }]}>{text}</Text>
    </View>
  );
};

// Buton mic care copiază în clipboard
export const CopyButton = ({ value, label = null, style = {} }) => {
  const { colors } = useTheme();
  
  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(String(value));
      if (Platform.OS === 'android') {
        ToastAndroid.show(`Copiat: ${value}`, ToastAndroid.SHORT);
      } else {
        Alert.alert('Copiat', String(value));
      }
    } catch (e) {
      console.warn('Eroare copy:', e);
    }
  };

  return (
    <Pressable
      onPress={handleCopy}
      style={[
        styles.copyBtn,
        { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' },
        style,
      ]}
      hitSlop={8}
    >
      <Text style={[styles.copyText, { color: colors.primary }]}>📋 {label || value}</Text>
    </Pressable>
  );
};

// Text cu valori cheie evidențiate ca butoane de copiere + tot textul selectabil
export const ScenariuTextCuCopy = ({ text, style = {} }) => {
  const { colors } = useTheme();
  
  // Pattern-uri extinse pentru toate valorile care apar tipic în scenarii contabile
  // Ordinea contează - cele mai specifice primele, ca să nu fie "mâncate" de cele generale
  const patterns = [
    // IBAN: RO + 2 cifre + 4 litere bancă + 16 caractere (cifre/litere)
    { regex: /\bRO\d{2}[A-Z]{4}[A-Z0-9]{16}\b/g, type: 'iban' },
    // CUI cu prefix RO (firme plătitoare de TVA)
    { regex: /\bRO\d{2,10}\b/g, type: 'cui' },
    // CNP (13 cifre care încep cu 1-8)
    { regex: /\b[1-8]\d{12}\b/g, type: 'cnp' },
    // Serie + număr factură / aviz / chitanță / OP / NIR (ex: FF-2025-0001, NIR-001)
    { regex: /\b[A-Z]{1,5}[-]\d{2,5}([-]\d{2,5})?\b/g, type: 'serie' },
    // Date format DD.MM.YYYY
    { regex: /\b\d{1,2}\.\d{1,2}\.\d{4}\b/g, type: 'data' },
    // Cod registru comerț: J12/123/2020
    { regex: /\bJ\d{1,2}\/\d+\/\d{4}\b/g, type: 'regcom' },
    // Sume cu unitatea "lei" (mai multe formate: 18.150 lei, 18150 lei, 18.150,50 lei)
    { regex: /\b\d{1,3}(?:\.\d{3})*(?:,\d+)?\s*lei\b/gi, type: 'suma' },
    { regex: /\b\d{4,}(?:,\d+)?\s*lei\b/gi, type: 'suma' },
    // Procente (TVA 21%, etc)
    { regex: /\b\d{1,2}(?:,\d+)?\s*%/g, type: 'procent' },
    // Numere cu zecimale (sume fără "lei")
    { regex: /\b\d+(?:\.\d{3})*,\d{2}\b/g, type: 'numar' },
    // Cantități (5 buc, 10 kg, etc)
    { regex: /\b\d+(?:[.,]\d+)?\s*(buc|kg|l|m|tone|t)\b/gi, type: 'cantitate' },
    // Numere de cont contabil (3-4 cifre)
    { regex: /\bcontul?\s+\d{3,4}\b/gi, type: 'cont' },
  ];

  // Identifică toate match-urile
  let matches = [];
  patterns.forEach(({ regex, type }) => {
    const r = new RegExp(regex);
    let m;
    while ((m = r.exec(text)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, value: m[0], type });
      if (m.index === r.lastIndex) r.lastIndex++;
    }
  });

  // Sortez și elimin suprapuneri (păstrez prima ocurență)
  matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
  const filtered = [];
  let lastEnd = -1;
  matches.forEach((m) => {
    if (m.start >= lastEnd) {
      filtered.push(m);
      lastEnd = m.end;
    }
  });

  // Construiesc elementele
  const elements = [];
  let cursor = 0;
  filtered.forEach((m) => {
    if (m.start > cursor) {
      elements.push({ tip: 'text', valoare: text.substring(cursor, m.start) });
    }
    // Pentru pattern-ul "contul XXX", extrag doar numărul, păstrând "contul" ca text
    let valoareCopy = m.value;
    let valoareAfisaj = m.value;
    if (m.type === 'cont') {
      const num = m.value.match(/\d+/);
      valoareCopy = num ? num[0] : m.value;
    }
    if (m.type === 'suma') {
      // Pentru sume, copiem doar cifrele fără "lei" (mai util la completare)
      valoareCopy = m.value.replace(/\s*lei\b/i, '').trim();
    }
    if (m.type === 'procent') {
      valoareCopy = m.value.replace(/\s*%/, '').trim();
    }
    if (m.type === 'cantitate') {
      valoareCopy = m.value.match(/\d+(?:[.,]\d+)?/)[0];
    }
    elements.push({ tip: 'copy', valoare: valoareCopy, afisaj: valoareAfisaj, type: m.type });
    cursor = m.end;
  });
  if (cursor < text.length) {
    elements.push({ tip: 'text', valoare: text.substring(cursor) });
  }

  const copy = async (val) => {
    try {
      await Clipboard.setStringAsync(String(val));
      if (Platform.OS === 'android') {
        ToastAndroid.show(`✓ Copiat: ${val}`, ToastAndroid.SHORT);
      } else {
        Alert.alert('Copiat', String(val));
      }
    } catch (e) {
      console.warn('Copy error:', e);
    }
  };

  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }, style]}>
      {elements.map((el, i) => {
        if (el.tip === 'text') {
          return (
            <Text
              key={i}
              selectable={true}
              style={{ color: colors.text, fontSize: FONT_SIZE.sm, lineHeight: 22 }}
            >
              {el.valoare}
            </Text>
          );
        }
        return (
          <Pressable
            key={i}
            onPress={() => copy(el.valoare)}
            onLongPress={() => copy(el.valoare)}
            style={{
              backgroundColor: colors.primary + '20',
              paddingHorizontal: 6,
              paddingVertical: 1,
              borderRadius: 6,
              marginHorizontal: 2,
              marginVertical: 1,
              borderWidth: 1,
              borderColor: colors.primary + '50',
            }}
            hitSlop={6}
          >
            <Text
              selectable={true}
              style={{ color: colors.primary, fontWeight: '700', fontSize: FONT_SIZE.sm }}
            >
              {el.afisaj} 📋
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

// Confetti animat
export const Confetti = ({ visible = false }) => {
  if (!visible) return null;
  const pieces = Array.from({ length: 25 }, (_, i) => i);
  const colors = ['#F59E0B', '#10B981', '#8B5CF6', '#EC4899', '#06B6D4', '#EF4444'];
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {pieces.map((i) => (
        <ConfettiPiece
          key={i}
          delay={i * 40}
          color={colors[i % colors.length]}
          startX={Math.random() * 100}
        />
      ))}
    </View>
  );
};

const ConfettiPiece = ({ delay, color, startX }) => {
  const translateY = useSharedValue(-50);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    translateY.value = withDelay(delay, withTiming(800, { duration: 2500 }));
    rotate.value = withDelay(delay, withTiming(720, { duration: 2500 }));
    opacity.value = withDelay(delay + 2000, withTiming(0, { duration: 500 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: `${startX}%`,
          top: 0,
          width: 10,
          height: 10,
          backgroundColor: color,
          borderRadius: 2,
        },
        animatedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
  },
  progressContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressLabel: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 10,
    fontWeight: '600',
  },
  statsHeader: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  statBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
    ...SHADOWS.sm,
  },
  statIcon: {
    fontSize: 28,
  },
  statValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
  },
  copyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  copyText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
  },
});
