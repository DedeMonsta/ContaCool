import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { Mascota } from '../components/Mascota';
import { Card, ProgressBar } from '../components/UI';
import { SPACING, FONT_SIZE, RADIUS, SHADOWS } from '../theme/theme';

export default function ProfileScreen({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const {
    xp,
    streak,
    completedLessons,
    totalCorrect,
    totalWrong,
    hapticsEnabled,
    toggleHaptics,
    resetProgress,
    getLevel,
    getXPForNextLevel,
    getCurrentLevelXP,
  } = useProgress();

  const level = getLevel();
  const nextLevelXP = getXPForNextLevel();
  const currentLevelXP = getCurrentLevelXP();
  const progresLevel = (xp - currentLevelXP) / (nextLevelXP - currentLevelXP);

  const totalLectiiCompletate = Object.keys(completedLessons).length;
  const accuracy =
    totalCorrect + totalWrong > 0
      ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100)
      : 0;

  const confirmaReset = () => {
    Alert.alert(
      'Resetare progres',
      'Sigur vrei să ștergi tot progresul? Această acțiune nu poate fi anulată.',
      [
        { text: 'Anulează', style: 'cancel' },
        {
          text: 'Resetează',
          style: 'destructive',
          onPress: resetProgress,
        },
      ],
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={isDark ? ['#1E40AF', '#1E3A8A'] : ['#4F46E5', '#6366F1']}
          style={styles.header}
        >
          <Mascota size={100} expression="happy" />
          <Text style={styles.username}>Studentul ContaCool</Text>
          <Text style={styles.level}>Nivel {level}</Text>
          <View style={{ width: '100%', marginTop: SPACING.md }}>
            <ProgressBar
              progress={progresLevel}
              color="#FBBF24"
              backgroundColor="rgba(255,255,255,0.2)"
              height={10}
            />
            <Text style={styles.levelText}>
              {xp} / {nextLevelXP} XP
            </Text>
          </View>
        </LinearGradient>

        {/* Statistici */}
        <View style={styles.statsGrid}>
          <Animated.View entering={FadeInDown.delay(100).duration(400)} style={{ flex: 1 }}>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={{ fontSize: 28 }}>⭐</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{xp}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>XP total</Text>
            </View>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(150).duration(400)} style={{ flex: 1 }}>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={{ fontSize: 28 }}>🔥</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{streak}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Streak</Text>
            </View>
          </Animated.View>
        </View>

        <View style={styles.statsGrid}>
          <Animated.View entering={FadeInDown.delay(200).duration(400)} style={{ flex: 1 }}>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={{ fontSize: 28 }}>📚</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{totalLectiiCompletate}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Lecții</Text>
            </View>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(250).duration(400)} style={{ flex: 1 }}>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={{ fontSize: 28 }}>🎯</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>{accuracy}%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Acuratețe</Text>
            </View>
          </Animated.View>
        </View>

        {/* Setări */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>⚙️ Setări</Text>

        <View style={[styles.settingCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>🌙 Temă întunecată</Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                Mai ușor pentru ochi seara
              </Text>
            </View>
            <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ false: '#94A3B8', true: colors.primary }} thumbColor="#FFFFFF" />
          </View>
        </View>

        <View style={[styles.settingCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>📳 Vibrații</Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                Feedback haptic la acțiuni
              </Text>
            </View>
            <Switch value={hapticsEnabled} onValueChange={toggleHaptics} trackColor={{ false: '#94A3B8', true: colors.primary }} thumbColor="#FFFFFF" />
          </View>
        </View>

        {/* Despre */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>ℹ️ Despre</Text>

        <View style={[styles.aboutCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '800', color: colors.text }}>ContaCool v2.0</Text>
            {'\n'}Aplicație educațională pentru documentele contabile românești.
            {'\n\n'}
            Conformă cu:
            {'\n'}• Legea contabilității 82/1991
            {'\n'}• Codul Fiscal (Legea 227/2015)
            {'\n'}• TVA 21% (Legea 141/2025)
            {'\n'}• OMFP 2634/2015 (documente)
            {'\n'}• OMFP 1802/2014 (plan conturi)
            {'\n'}• Legea 70/2015 (plafoane cash)
            {'\n'}• OUG 120/2021 (e-Factura)
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.resetBtn, { backgroundColor: '#FEE2E2', borderColor: '#EF4444' }]}
          onPress={confirmaReset}
        >
          <Text style={[styles.resetText, { color: '#EF4444' }]}>🔄 Resetează progresul</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: SPACING.lg },
  header: {
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  username: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    marginTop: SPACING.sm,
  },
  level: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    opacity: 0.9,
    marginTop: 4,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.xs,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.85,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  statCard: {
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    marginTop: 4,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  settingCard: {
    marginHorizontal: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  settingDesc: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },
  aboutCard: {
    marginHorizontal: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
  },
  aboutText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 22,
  },
  resetBtn: {
    marginHorizontal: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: SPACING.lg,
  },
  resetText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
});
