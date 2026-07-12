import React, { useState } from 'react';
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
import { Button, Stars, Confetti, ScenariuTextCuCopy } from '../components/UI';
import { Mascota, MascotaCuMesaj } from '../components/Mascota';
import { SPACING, FONT_SIZE, RADIUS, SHADOWS } from '../theme/theme';
import { playCorrect, playWrong, playSuccess } from '../utils/feedback';

export default function Nivel2Screen({ navigation, route }) {
  const { lesson } = route.params;
  const { document, nivelData } = lesson;
  const scenariu = nivelData.scenarii[0];
  const documentCompletat =
    scenariu.factura || scenariu.nir || scenariu.chitanta || scenariu.aviz || scenariu.op || scenariu.extras || scenariu.bon;
  
  const { colors, isDark } = useTheme();
  const { addXP, completeLesson, incrementCorrect, incrementWrong, hapticsEnabled } = useProgress();
  
  const [erroriGasite, setErroriGasite] = useState(new Set());
  const [gresitGasite, setGresitGasite] = useState(new Set());
  const [showResults, setShowResults] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);

  const totalErori = scenariu.erori.length;
  const corecte = erroriGasite.size;

  const handleCampPress = (campId) => {
    if (showResults) return;

    const esteEroare = scenariu.erori.some((e) => e.camp === campId);

    if (esteEroare) {
      if (!erroriGasite.has(campId)) {
        playCorrect(hapticsEnabled);
        incrementCorrect();
        setErroriGasite((prev) => new Set([...prev, campId]));
      }
    } else {
      if (!gresitGasite.has(campId)) {
        playWrong(hapticsEnabled);
        incrementWrong();
        setGresitGasite((prev) => new Set([...prev, campId]));
      }
    }
  };

  const handleFinalize = async () => {
    setShowResults(true);
    playSuccess(hapticsEnabled);
    setConfettiVisible(true);
    
    const stars = corecte === totalErori ? 3 : corecte >= totalErori - 1 ? 2 : 1;
    const xpFinal = Math.round(nivelData.xp * (corecte / totalErori));
    
    await addXP(xpFinal);
    await completeLesson(lesson.id, stars);
    
    setTimeout(() => setConfettiVisible(false), 3000);
  };

  const stars = corecte === totalErori ? 3 : corecte >= totalErori - 1 ? 2 : 1;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <Confetti visible={confettiVisible} />

      <LinearGradient
        colors={['#F59E0B', '#D97706']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Înapoi</Text>
        </TouchableOpacity>
        <Text style={styles.headerLabel}>Nivel 2 - Găsește erorile</Text>
        <Text style={styles.headerTitle}>{document.emoji} {document.nume}</Text>
        <Text style={styles.headerSubtitle}>
          Erori găsite: {corecte} / {totalErori}
        </Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {!showResults && (
          <Animated.View entering={FadeInDown.duration(400)}>
            <View style={[styles.mesajCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <MascotaCuMesaj
                mesaj="Citește scenariul și apasă pe câmpurile care conțin erori. Atenție - dacă apeși pe câmp corect, pierzi puncte!"
                expression="thinking"
                size={50}
              />
            </View>

            {/* Scenariu cu copy buttons pentru valori */}
            <View style={[styles.scenariuCard, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
              <Text style={[styles.scenariuLabel, { color: colors.primary }]}>📋 SCENARIU</Text>
              <ScenariuTextCuCopy text={scenariu.scenariu} />
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Documentul de verificat:
            </Text>

            <View style={[styles.documentCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              {document.campuri.map((camp, idx) => {
                const valoare = documentCompletat[camp.id];
                const gasit = erroriGasite.has(camp.id);
                const gresitClick = gresitGasite.has(camp.id);

                let bgColor = isDark ? colors.surfaceAlt : '#F8FAFC';
                let borderColor = colors.border;

                if (gasit) {
                  bgColor = '#10B98115';
                  borderColor = '#10B981';
                } else if (gresitClick) {
                  bgColor = '#EF444415';
                  borderColor = '#EF4444';
                }

                return (
                  <TouchableOpacity
                    key={camp.id}
                    onPress={() => handleCampPress(camp.id)}
                    style={[
                      styles.campRow,
                      { backgroundColor: bgColor, borderColor },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.campEticheta, { color: colors.textSecondary }]}>
                        {camp.eticheta}
                      </Text>
                      <Text style={[styles.campValoare, { color: colors.text }]}>
                        {valoare !== undefined && valoare !== '' ? valoare : '(necompletat)'}
                      </Text>
                    </View>
                    {gasit && <Text style={{ fontSize: 20 }}>✅</Text>}
                    {gresitClick && <Text style={{ fontSize: 20 }}>❌</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>

            <Button
              title="Verifică (finalizează)"
              variant="warning"
              size="lg"
              onPress={handleFinalize}
              disabled={corecte === 0}
              style={{ marginTop: SPACING.lg }}
            />
          </Animated.View>
        )}

        {showResults && (
          <Animated.View entering={FadeIn}>
            <View style={[styles.completedCard, { backgroundColor: '#10B98115', borderColor: '#10B981' }]}>
              <Mascota size={80} expression={stars === 3 ? 'excited' : 'happy'} />
              <Text style={[styles.completedTitle, { color: '#10B981' }]}>
                {stars === 3 ? 'Perfect!' : stars === 2 ? 'Foarte bine!' : 'Bine făcut!'}
              </Text>
              <Stars count={stars} size={32} />
              <Text style={[styles.completedText, { color: colors.text }]}>
                Ai găsit {corecte} din {totalErori} erori. +{Math.round(nivelData.xp * (corecte / totalErori))} XP!
              </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: SPACING.lg }]}>
              📋 Toate erorile din scenariu:
            </Text>
            {scenariu.erori.map((eroare, idx) => {
              const camp = document.campuri.find((c) => c.id === eroare.camp);
              const gasit = erroriGasite.has(eroare.camp);
              return (
                <View
                  key={idx}
                  style={[
                    styles.eroareCard,
                    {
                      backgroundColor: gasit ? '#10B98115' : '#EF444415',
                      borderColor: gasit ? '#10B981' : '#EF4444',
                    },
                  ]}
                >
                  <View style={styles.eroareHeader}>
                    <Text style={{ fontSize: 18 }}>{gasit ? '✅' : '❌'}</Text>
                    <Text style={[styles.eroareCamp, { color: colors.text }]}>{camp?.eticheta}</Text>
                  </View>
                  <Text style={[styles.eroareMotiv, { color: colors.textSecondary }]}>
                    {eroare.motiv}
                  </Text>
                </View>
              );
            })}

            <Button
              title="Înapoi la modul"
              variant="primary"
              size="lg"
              onPress={() => navigation.goBack()}
              style={{ marginTop: SPACING.lg, width: '100%' }}
            />
          </Animated.View>
        )}

        <View style={{ height: 80 }} />
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
  backBtn: { paddingVertical: 6 },
  backText: { color: '#FFFFFF', fontSize: FONT_SIZE.md, fontWeight: '600' },
  headerLabel: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    opacity: 0.9,
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
  scenariuCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
    marginBottom: SPACING.md,
  },
  scenariuLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '800',
    marginBottom: SPACING.sm,
    letterSpacing: 0.5,
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
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  campValoare: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginTop: 2,
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
    marginBottom: 8,
  },
  completedText: {
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  eroareCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
    marginBottom: SPACING.sm,
  },
  eroareHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  eroareCamp: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '800',
  },
  eroareMotiv: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
  },
});
