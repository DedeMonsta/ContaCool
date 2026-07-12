import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { MODULE_LIST, MODULE } from '../data/index';
import { Mascota, MascotaCuMesaj } from '../components/Mascota';
import { Card, ProgressBar, StatsHeader } from '../components/UI';
import { SPACING, FONT_SIZE, RADIUS, SHADOWS } from '../theme/theme';

export default function HomeScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const { xp, getLevel, getXPForNextLevel, getCurrentLevelXP, unlocked, completedLessons } =
    useProgress();
  
  const level = getLevel();
  const nextLevelXP = getXPForNextLevel();
  const currentLevelXP = getCurrentLevelXP();
  const progresLevel = (xp - currentLevelXP) / (nextLevelXP - currentLevelXP);

  const getProgresModul = (moduleId) => {
    const modul = MODULE[moduleId];
    if (!modul) return 0;
    // 1 lecție flux + 3 documente × 3 niveluri = 10 lecții totale
    const totalLectii = 1 + modul.documente.length * 3;
    const completate = Object.keys(completedLessons).filter((k) => k.startsWith(moduleId)).length;
    return completate / totalLectii;
  };

  const getMesajMascota = () => {
    if (xp === 0) return 'Salut! Sunt Andrei. Hai să învățăm documentele contabile împreună!';
    if (level >= 5) return 'Wow! Devii un expert! Continuă așa! 🎯';
    if (level >= 3) return 'Felicitări! Progresezi excelent! 🚀';
    return 'Continuă învățarea! Fiecare lecție te apropie de obiectiv! 💪';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header gradient */}
        <LinearGradient
          colors={isDark ? ['#1E40AF', '#1E3A8A'] : ['#4F46E5', '#6366F1']}
          style={styles.headerGradient}
        >
          <View style={styles.welcomeRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.welcomeText}>Bună!</Text>
              <Text style={styles.appName}>ContaCool</Text>
              <Text style={styles.subtitle}>Documentele contabile, distractiv 🚀</Text>
            </View>
            <Mascota size={90} expression="happy" />
          </View>

          {/* Progres către următorul nivel */}
          <View style={styles.levelProgress}>
            <View style={styles.levelRow}>
              <Text style={styles.levelLabel}>Nivel {level}</Text>
              <Text style={styles.levelLabel}>
                {xp} / {nextLevelXP} XP
              </Text>
            </View>
            <ProgressBar
              progress={progresLevel}
              color="#FBBF24"
              backgroundColor="rgba(255,255,255,0.2)"
              height={10}
            />
          </View>
        </LinearGradient>

        {/* Mesaj mascotă */}
        <Animated.View entering={FadeIn.duration(500)}>
          <View style={[styles.mesajCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <MascotaCuMesaj mesaj={getMesajMascota()} expression="happy" size={50} />
          </View>
        </Animated.View>

        {/* Stats Header */}
        <StatsHeader />

        {/* Module */}
        <View style={styles.moduleSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>📚 Modulele tale</Text>

          {MODULE_LIST.map((modul, idx) => {
            const isUnlocked = true; // Toate modulele sunt mereu deblocate
            const progres = getProgresModul(modul.id);

            return (
              <Animated.View
                key={modul.id}
                entering={FadeInDown.delay(idx * 100).duration(400)}
              >
                <TouchableOpacity
                  onPress={() => isUnlocked && navigation.navigate('ModuleDetail', { moduleId: modul.id })}
                  disabled={!isUnlocked}
                >
                  <View
                    style={[
                      styles.moduleCard,
                      {
                        backgroundColor: isUnlocked ? (isDark ? modul.bgDark : modul.bg) : colors.surfaceAlt,
                        borderColor: isUnlocked ? modul.iconColor : colors.border,
                        opacity: isUnlocked ? 1 : 0.6,
                      },
                    ]}
                  >
                    <View style={styles.moduleHeader}>
                      <View style={[styles.moduleIcon, { backgroundColor: modul.iconColor + '30' }]}>
                        <Text style={{ fontSize: 28 }}>{modul.emoji}</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: SPACING.md }}>
                        <Text style={[styles.moduleName, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                          {modul.nume}
                        </Text>
                        <Text style={[styles.moduleDesc, { color: isDark ? '#CBD5E1' : '#334155' }]}>
                          {modul.descriere}
                        </Text>
                      </View>
                      {!isUnlocked && <Text style={{ fontSize: 24 }}>🔒</Text>}
                    </View>

                    {isUnlocked && (
                      <View style={styles.moduleProgress}>
                        <ProgressBar
                          progress={progres}
                          color={modul.iconColor}
                          backgroundColor={'rgba(0,0,0,0.1)'}
                          height={8}
                        />
                        <Text style={[styles.moduleProgressText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                          {Math.round(progres * 100)}% completat
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Buton acces glosar */}
        <TouchableOpacity
          style={[styles.glosarBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => navigation.navigate('Glosar')}
        >
          <Text style={{ fontSize: 28 }}>📖</Text>
          <View style={{ flex: 1, marginLeft: SPACING.md }}>
            <Text style={[styles.glosarTitle, { color: colors.text }]}>Glosar Documente</Text>
            <Text style={[styles.glosarSubtitle, { color: colors.textSecondary }]}>
              Caută orice document și învață rapid
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: colors.textMuted }}>→</Text>
        </TouchableOpacity>

        {/* Buton Plan de Conturi */}
        <TouchableOpacity
          style={[styles.glosarBtn, { backgroundColor: colors.surface, borderColor: colors.border, marginTop: SPACING.sm }]}
          onPress={() => navigation.navigate('PlanConturi')}
        >
          <Text style={{ fontSize: 28 }}>📊</Text>
          <View style={{ flex: 1, marginLeft: SPACING.md }}>
            <Text style={[styles.glosarTitle, { color: colors.text }]}>Plan de Conturi</Text>
            <Text style={[styles.glosarSubtitle, { color: colors.textSecondary }]}>
              Conturile esențiale și articolele contabile
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: colors.textMuted }}>→</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: SPACING.lg },
  headerGradient: {
    padding: SPACING.md,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
    marginBottom: SPACING.md,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.lg,
    opacity: 0.9,
    marginBottom: 4,
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.sm,
    opacity: 0.85,
    marginTop: 2,
  },
  levelProgress: {
    marginTop: SPACING.md,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  levelLabel: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
  mesajCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  moduleSection: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  moduleCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleIcon: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
  },
  moduleDesc: {
    fontSize: FONT_SIZE.xs,
    marginTop: 4,
    lineHeight: 18,
  },
  moduleProgress: {
    marginTop: SPACING.md,
  },
  moduleProgressText: {
    fontSize: FONT_SIZE.xs,
    marginTop: 6,
    fontWeight: '600',
  },
  glosarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  glosarTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  glosarSubtitle: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },
});
