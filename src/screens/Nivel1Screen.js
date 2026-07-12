import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { Button, Confetti } from '../components/UI';
import { Mascota, MascotaCuMesaj } from '../components/Mascota';
import { SPACING, FONT_SIZE, RADIUS, SHADOWS } from '../theme/theme';
import { playSuccess, playTap } from '../utils/feedback';

export default function Nivel1Screen({ navigation, route }) {
  const { lesson } = route.params;
  const { document, nivelData } = lesson;
  const { colors, isDark } = useTheme();
  const { addXP, completeLesson, hapticsEnabled } = useProgress();
  const [campSelectat, setCampSelectat] = useState(null);
  const [campuriExplorate, setCampuriExplorate] = useState(new Set());
  const [showCompleted, setShowCompleted] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);

  const totalCampuri = document.campuri.length;
  const exploreaza = campuriExplorate.size;
  const progres = exploreaza / totalCampuri;

  const handleCampPress = (camp) => {
    playTap(hapticsEnabled);
    setCampSelectat(camp);
    setCampuriExplorate((prev) => new Set([...prev, camp.id]));
  };

  const handleComplete = async () => {
    setConfettiVisible(true);
    playSuccess(hapticsEnabled);
    await addXP(nivelData.xp);
    await completeLesson(lesson.id, 3);
    setShowCompleted(true);
    setTimeout(() => setConfettiVisible(false), 3000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <Confetti visible={confettiVisible} />

      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark || '#3730A3']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Înapoi</Text>
        </TouchableOpacity>
        <Text style={styles.headerLabel}>Nivel 1</Text>
        <Text style={styles.headerTitle}>{document.emoji} {document.nume}</Text>
        <Text style={styles.headerSubtitle}>
          Explorat: {exploreaza} / {totalCampuri}
        </Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {!showCompleted && (
          <Animated.View entering={FadeInDown.duration(400)}>
            <View style={[styles.mesajCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <MascotaCuMesaj
                mesaj={`Apasă pe fiecare câmp pentru a afla la ce folosește. Trebuie să explorezi toate ${totalCampuri} câmpuri!`}
                expression="thinking"
                size={50}
              />
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>📋 Componentele documentului</Text>

            <View style={[styles.documentCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              {document.campuri.map((camp, idx) => {
                const explorat = campuriExplorate.has(camp.id);
                return (
                  <TouchableOpacity
                    key={camp.id}
                    onPress={() => handleCampPress(camp)}
                    style={[
                      styles.campRow,
                      {
                        backgroundColor: explorat ? '#10B98115' : isDark ? colors.surfaceAlt : '#F8FAFC',
                        borderColor: explorat ? '#10B981' : colors.border,
                      },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.campEticheta, { color: colors.text }]}>{camp.eticheta}</Text>
                      <Text style={[styles.campPlaceholder, { color: colors.textMuted }]}>
                        {camp.placeholder}
                      </Text>
                    </View>
                    {explorat ? (
                      <Text style={{ fontSize: 20 }}>✅</Text>
                    ) : (
                      <Text style={{ fontSize: 18, color: colors.primary }}>👆</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {exploreaza === totalCampuri && (
              <Animated.View entering={FadeIn.duration(400)}>
                <Button
                  title={`Finalizează (+${nivelData.xp} XP)`}
                  variant="success"
                  size="lg"
                  onPress={handleComplete}
                  style={{ marginTop: SPACING.lg }}
                />
              </Animated.View>
            )}
          </Animated.View>
        )}

        {showCompleted && (
          <Animated.View entering={FadeIn} style={[styles.completedCard, { backgroundColor: '#10B98115', borderColor: '#10B981' }]}>
            <Mascota size={80} expression="excited" />
            <Text style={[styles.completedTitle, { color: '#10B981' }]}>Felicitări! 🎉</Text>
            <Text style={[styles.completedText, { color: colors.text }]}>
              Ai explorat toate componentele. +{nivelData.xp} XP!
            </Text>
            <Button
              title="Continuă cu Nivelul 2"
              variant="primary"
              size="lg"
              onPress={() => navigation.goBack()}
              style={{ marginTop: SPACING.md, width: '100%' }}
            />
          </Animated.View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Modal explicație câmp */}
      <Modal visible={!!campSelectat} transparent animationType="slide" onRequestClose={() => setCampSelectat(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            {campSelectat && (
              <>
                <Text style={[styles.modalTitle, { color: colors.text }]}>{campSelectat.eticheta}</Text>
                {campSelectat.obligatoriu && (
                  <View style={[styles.obligatoriuBadge, { backgroundColor: '#EF444420' }]}>
                    <Text style={{ color: '#EF4444', fontWeight: '700', fontSize: FONT_SIZE.xs }}>
                      ⚠️ OBLIGATORIU
                    </Text>
                  </View>
                )}
                <Text style={[styles.modalExplicatie, { color: colors.text }]}>
                  {campSelectat.explicatie}
                </Text>
                {campSelectat.eroareTipica && (
                  <View style={[styles.eroareBox, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B' }]}>
                    <Text style={[styles.eroareLabel, { color: '#F59E0B' }]}>⚠️ Eroare tipică</Text>
                    <Text style={[styles.eroareText, { color: colors.text }]}>
                      {campSelectat.eroareTipica}
                    </Text>
                  </View>
                )}
                <View style={[styles.exempluBox, { backgroundColor: colors.primary + '15' }]}>
                  <Text style={[styles.exempluLabel, { color: colors.primary }]}>Exemplu</Text>
                  <Text style={[styles.exempluText, { color: colors.text }]}>{campSelectat.placeholder}</Text>
                </View>
                <Button
                  title="Am înțeles"
                  variant="primary"
                  size="lg"
                  onPress={() => setCampSelectat(null)}
                  style={{ marginTop: SPACING.md, width: '100%' }}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: SPACING.md,
    paddingTop: SPACING.sm,
  },
  backBtn: { paddingVertical: 6 },
  backText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  headerLabel: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    opacity: 0.8,
    marginTop: SPACING.sm,
    textTransform: 'uppercase',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    marginTop: 4,
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.sm,
    opacity: 0.85,
    marginTop: 4,
  },
  scroll: { padding: SPACING.md },
  mesajCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  documentCard: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.sm,
    ...SHADOWS.sm,
  },
  campRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.sm,
  },
  campEticheta: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  campPlaceholder: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
    fontStyle: 'italic',
  },
  completedCard: {
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
  },
  completedTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    marginTop: SPACING.sm,
  },
  completedText: {
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl + 20,
  },
  modalTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  obligatoriuBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  modalExplicatie: {
    fontSize: FONT_SIZE.md,
    lineHeight: 24,
  },
  eroareBox: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
    marginTop: SPACING.md,
  },
  eroareLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '800',
    marginBottom: 4,
  },
  eroareText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
  },
  exempluBox: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginTop: SPACING.md,
  },
  exempluLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '800',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  exempluText: {
    fontSize: FONT_SIZE.md,
    fontFamily: 'monospace',
  },
});
