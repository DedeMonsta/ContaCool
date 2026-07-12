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
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { MODULE, getLectiiModul } from '../data/index';
import { Card, Stars, Badge } from '../components/UI';
import { MascotaCuMesaj } from '../components/Mascota';
import { SPACING, FONT_SIZE, RADIUS, SHADOWS } from '../theme/theme';

export default function ModuleDetailScreen({ navigation, route }) {
  const { moduleId } = route.params;
  const modul = MODULE[moduleId];
  const lectii = getLectiiModul(moduleId);
  const { colors, isDark } = useTheme();
  const { completedLessons } = useProgress();

  if (!modul) return null;

  // Grupare: flux + per document
  const fluxLectie = lectii.find((l) => l.tip === 'flux');
  const documentLectii = lectii.filter((l) => l.tip === 'document');
  
  // Grupare lecții document după docId
  const grupateDocs = {};
  documentLectii.forEach((l) => {
    if (!grupateDocs[l.docId]) {
      grupateDocs[l.docId] = { doc: l.document, lectii: [] };
    }
    grupateDocs[l.docId].lectii.push(l);
  });

  const fluxCompletat = fluxLectie && completedLessons[fluxLectie.id];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      {/* Header */}
      <LinearGradient
        colors={[modul.iconColor, modul.iconColor + 'CC']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Înapoi</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerEmoji}>{modul.emoji}</Text>
          <View style={{ flex: 1, marginLeft: SPACING.md }}>
            <Text style={styles.headerTitle}>{modul.nume}</Text>
            <Text style={styles.headerSubtitle}>{lectii.length} lecții disponibile</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Povestea */}
        <Animated.View entering={FadeInDown.duration(400)}>
          <View style={[styles.povesteCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <MascotaCuMesaj mesaj={modul.poveste} expression="excited" size={50} />
          </View>
        </Animated.View>

        {/* Lecția FLUX - prima și recomandată */}
        {fluxLectie && (
          <Animated.View entering={FadeInDown.delay(100).duration(400)}>
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
              🎯 RECOMANDAT - ÎNCEPE AICI
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Lesson', { lessonId: fluxLectie.id, lesson: fluxLectie })
              }
            >
              <LinearGradient
                colors={[modul.iconColor + '20', modul.iconColor + '10']}
                style={[styles.fluxCard, { borderColor: modul.iconColor }]}
              >
                <View style={styles.fluxIconRow}>
                  <View style={[styles.fluxIcon, { backgroundColor: modul.iconColor }]}>
                    <Text style={{ fontSize: 28 }}>🎯</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: SPACING.md }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={[styles.fluxTitlu, { color: colors.text }]}>Fluxul complet</Text>
                      {fluxCompletat && <Text style={{ fontSize: 18 }}>✓</Text>}
                    </View>
                    <Text style={[styles.fluxSubtitlu, { color: colors.textSecondary }]}>
                      Toți pașii și articolele contabile explicate
                    </Text>
                  </View>
                  <Text style={[styles.xpBadge, { color: modul.iconColor }]}>+75 XP</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Lecții per document */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary, marginTop: SPACING.lg }]}>
          📑 LECȚII PER DOCUMENT
        </Text>

        {Object.entries(grupateDocs).map(([docId, group], idx) => (
          <Animated.View
            key={docId}
            entering={FadeInDown.delay(200 + idx * 100).duration(400)}
            style={[styles.docCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <View style={styles.docHeader}>
              <Text style={{ fontSize: 32 }}>{group.doc.emoji}</Text>
              <View style={{ flex: 1, marginLeft: SPACING.sm }}>
                <Text style={[styles.docTitle, { color: colors.text }]}>{group.doc.nume}</Text>
                <Text style={[styles.docBazaLegala, { color: colors.textMuted }]}>
                  {group.doc.bazaLegala}
                </Text>
              </View>
            </View>

            <Text style={[styles.docDescriere, { color: colors.textSecondary }]}>
              {group.doc.descriere}
            </Text>

            <View style={styles.nivelRow}>
              {group.lectii.map((lectie, lIdx) => {
                const completare = completedLessons[lectie.id];
                const isLocked = lIdx > 0 && !completedLessons[group.lectii[lIdx - 1].id];

                return (
                  <TouchableOpacity
                    key={lectie.id}
                    onPress={() =>
                      !isLocked && navigation.navigate('Lesson', { lessonId: lectie.id, lesson: lectie })
                    }
                    disabled={isLocked}
                    style={[
                      styles.nivelCard,
                      {
                        backgroundColor: isLocked
                          ? colors.surfaceAlt
                          : completare
                          ? '#10B98115'
                          : modul.iconColor + '15',
                        borderColor: isLocked
                          ? colors.border
                          : completare
                          ? '#10B981'
                          : modul.iconColor,
                        opacity: isLocked ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Text style={[styles.nivelNumber, { color: isLocked ? colors.textMuted : modul.iconColor }]}>
                      Nivel {lectie.nivel}
                    </Text>
                    <Text style={[styles.nivelTitle, { color: colors.text }]}>
                      {lectie.nivelData.titlu}
                    </Text>
                    <View style={styles.nivelFooter}>
                      {isLocked ? (
                        <Text style={{ fontSize: 16 }}>🔒</Text>
                      ) : completare ? (
                        <Stars count={completare.stars} size={14} />
                      ) : (
                        <Text style={[styles.xpText, { color: modul.iconColor }]}>
                          +{lectie.nivelData.xp} XP
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: SPACING.md,
    paddingTop: SPACING.sm,
  },
  backBtn: {
    paddingVertical: 6,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  headerEmoji: {
    fontSize: 48,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.sm,
    opacity: 0.85,
    marginTop: 4,
  },
  scroll: {
    padding: SPACING.md,
  },
  povesteCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  sectionLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  fluxCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    ...SHADOWS.md,
  },
  fluxIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fluxIcon: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fluxTitlu: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
  },
  fluxSubtitlu: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },
  xpBadge: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '800',
  },
  docCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  docHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  docTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
  },
  docBazaLegala: {
    fontSize: 10,
    marginTop: 2,
  },
  docDescriere: {
    fontSize: FONT_SIZE.xs,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  nivelRow: {
    flexDirection: 'row',
    gap: 8,
  },
  nivelCard: {
    flex: 1,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    minHeight: 90,
  },
  nivelNumber: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  nivelTitle: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    marginTop: 4,
    lineHeight: 16,
  },
  nivelFooter: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
  },
  xpText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '800',
  },
});
