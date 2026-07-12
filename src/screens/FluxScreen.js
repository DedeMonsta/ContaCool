import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn, FadeInRight } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { FLUXURI } from '../data/fluxuri';
import { MODULE } from '../data/index';
import { Mascota, MascotaCuMesaj } from '../components/Mascota';
import { Button, Confetti } from '../components/UI';
import { ArticolContabil } from '../components/ArticolContabil';
import { SPACING, FONT_SIZE, RADIUS, SHADOWS } from '../theme/theme';
import { playSuccess } from '../utils/feedback';

export default function FluxScreen({ navigation, route }) {
  const { fluxId, lessonId } = route.params;
  const flux = FLUXURI[fluxId];
  const modul = Object.values(MODULE).find((m) => m.fluxId === fluxId);
  const { colors, isDark } = useTheme();
  const { addXP, completeLesson, hapticsEnabled } = useProgress();
  const [showCompleted, setShowCompleted] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);

  const handleComplete = async () => {
    setConfettiVisible(true);
    playSuccess(hapticsEnabled);
    await addXP(75); // XP mare pentru parcurgerea fluxului
    if (lessonId) {
      await completeLesson(lessonId, 3);
    }
    setShowCompleted(true);
    setTimeout(() => setConfettiVisible(false), 3000);
  };

  if (!flux) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Text style={{ color: colors.text, padding: 20 }}>Flux indisponibil</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <Confetti visible={confettiVisible} />

      {/* Header */}
      <LinearGradient
        colors={[modul?.iconColor || colors.primary, (modul?.iconColor || colors.primary) + 'CC']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Înapoi</Text>
        </TouchableOpacity>
        <Text style={styles.headerEmoji}>{flux.emoji}</Text>
        <Text style={styles.headerTitlu}>{flux.titlu}</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Povestea */}
        <Animated.View entering={FadeInDown.duration(400)}>
          <View style={[styles.povesteCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <MascotaCuMesaj mesaj={flux.poveste} expression="excited" size={60} />
          </View>
        </Animated.View>

        {/* Context economic */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)}>
          <View style={[styles.contextCard, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
            <Text style={[styles.contextTitlu, { color: colors.primary }]}>🎓 De ce contează</Text>
            <Text style={[styles.contextText, { color: colors.text }]}>
              {flux.contextEconomic}
            </Text>
          </View>
        </Animated.View>

        {/* Linia cronologică */}
        <Text style={[styles.sectiuneTitlu, { color: colors.text }]}>📋 Pașii pe rând</Text>

        {flux.pasi.map((pas, idx) => (
          <Animated.View
            key={idx}
            entering={FadeInRight.delay(idx * 100).duration(500)}
            style={styles.pasContainer}
          >
            {/* Linia verticală */}
            {idx < flux.pasi.length - 1 && (
              <View style={[styles.linieVerticala, { backgroundColor: colors.border }]} />
            )}
            
            {/* Numărul în cerc */}
            <View style={[styles.numarCerc, { backgroundColor: pas.culoare }]}>
              <Text style={styles.numarText}>{pas.nr}</Text>
            </View>

            {/* Conținutul pasului */}
            <View style={[styles.pasCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.pasHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.pasZi, { color: pas.culoare }]}>{pas.zi}</Text>
                  <Text style={[styles.pasTitlu, { color: colors.text }]}>
                    {pas.icon} {pas.titlu}
                  </Text>
                </View>
              </View>

              <View style={[styles.documentRow, { backgroundColor: pas.culoare + '15' }]}>
                <Text style={[styles.documentLabel, { color: colors.textSecondary }]}>Document:</Text>
                <Text style={[styles.documentNume, { color: pas.culoare }]}>{pas.document}</Text>
              </View>

              <Text style={[styles.pasDescriere, { color: colors.text }]}>{pas.descriere}</Text>

              <View style={[styles.pasExplicatie, { backgroundColor: isDark ? colors.surfaceAlt : '#FEF9C3' }]}>
                <Text style={[styles.pasExplicatieText, { color: colors.text }]}>
                  💡 {pas.explicatie}
                </Text>
              </View>

              {/* Articol contabil dacă există */}
              {pas.articolContabil && (
                <View style={{ marginTop: SPACING.md }}>
                  <ArticolContabil articol={pas.articolContabil} />
                </View>
              )}
            </View>
          </Animated.View>
        ))}

        {/* Alternativă cash (pentru plată) */}
        {flux.alternativaCash && (
          <Animated.View entering={FadeIn.duration(500)}>
            <View style={[styles.alternativaCard, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B' }]}>
              <Text style={[styles.alternativaTitlu, { color: '#F59E0B' }]}>🔀 {flux.alternativaCash.titlu}</Text>
              <Text style={[styles.alternativaText, { color: colors.text }]}>
                {flux.alternativaCash.descriere}
              </Text>
            </View>
          </Animated.View>
        )}

        {/* Rezumat final */}
        <Animated.View entering={FadeInDown.duration(500)}>
          <View style={[styles.rezumatCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary }]}>
            <Text style={[styles.rezumatTitlu, { color: colors.primary }]}>📌 În concluzie</Text>
            <Text style={[styles.rezumatText, { color: colors.text }]}>{flux.rezumat}</Text>
          </View>
        </Animated.View>

        {!showCompleted ? (
          <Button
            title="Am parcurs fluxul ✓"
            variant="success"
            size="lg"
            onPress={handleComplete}
            style={{ marginTop: SPACING.lg }}
          />
        ) : (
          <Animated.View entering={FadeIn} style={[styles.completedCard, { backgroundColor: '#10B98115', borderColor: '#10B981' }]}>
            <Mascota size={80} expression="excited" />
            <Text style={[styles.completedTitlu, { color: '#10B981' }]}>Excelent! 🎉</Text>
            <Text style={[styles.completedText, { color: colors.text }]}>
              Ai parcurs fluxul complet. +75 XP! Acum poți încerca lecțiile individuale pentru fiecare document.
            </Text>
            <Button
              title="Înapoi la modul"
              variant="primary"
              size="lg"
              onPress={() => navigation.goBack()}
              style={{ marginTop: SPACING.md, width: '100%' }}
            />
          </Animated.View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  headerEmoji: {
    fontSize: 40,
    marginTop: SPACING.sm,
  },
  headerTitlu: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.xxl,
    fontWeight: '800',
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
  contextCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
    marginBottom: SPACING.lg,
  },
  contextTitlu: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    marginBottom: 6,
  },
  contextText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 22,
  },
  sectiuneTitlu: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
    marginBottom: SPACING.md,
  },
  pasContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    position: 'relative',
  },
  linieVerticala: {
    position: 'absolute',
    left: 20,
    top: 45,
    bottom: -SPACING.md,
    width: 3,
    borderRadius: 1.5,
  },
  numarCerc: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    ...SHADOWS.sm,
    zIndex: 1,
  },
  numarText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
  },
  pasCard: {
    flex: 1,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  pasHeader: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  pasZi: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  pasTitlu: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    marginTop: 2,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  documentLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    marginRight: 6,
  },
  documentNume: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '800',
    flex: 1,
  },
  pasDescriere: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 22,
    marginBottom: SPACING.sm,
  },
  pasExplicatie: {
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  pasExplicatieText: {
    fontSize: FONT_SIZE.xs,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  alternativaCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
    marginTop: SPACING.lg,
  },
  alternativaTitlu: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    marginBottom: 6,
  },
  alternativaText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 22,
  },
  rezumatCard: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
  },
  rezumatTitlu: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    marginBottom: 6,
  },
  rezumatText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 22,
  },
  completedCard: {
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    marginTop: SPACING.lg,
  },
  completedTitlu: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    marginTop: SPACING.sm,
  },
  completedText: {
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 22,
  },
});
