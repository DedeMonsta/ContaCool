import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
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

export default function Nivel3Screen({ navigation, route }) {
  const { lesson } = route.params;
  const { document, nivelData } = lesson;
  const scenariu = nivelData.scenarii[0];

  const { colors, isDark } = useTheme();
  const { addXP, completeLesson, hapticsEnabled } = useProgress();

  const [valori, setValori] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);

  const normalize = (v) => String(v ?? '').toLowerCase().trim().replace(/\s+/g, ' ');

  const calculeazaScore = () => {
    let corecte = 0;
    const total = document.campuri.length;
    document.campuri.forEach((camp) => {
      const userVal = normalize(valori[camp.id]);
      const corectVal = normalize(scenariu.raspuns[camp.id]);
      if (userVal === corectVal) corecte++;
    });
    return { corecte, total };
  };

  const handleFinalize = async () => {
    const { corecte, total } = calculeazaScore();
    setShowResults(true);
    playSuccess(hapticsEnabled);
    setConfettiVisible(true);

    const procent = corecte / total;
    const stars = procent === 1 ? 3 : procent >= 0.8 ? 2 : procent >= 0.5 ? 1 : 0;
    const xpFinal = Math.round(nivelData.xp * procent);

    await addXP(xpFinal);
    await completeLesson(lesson.id, stars);
    setTimeout(() => setConfettiVisible(false), 3000);
  };

  const { corecte, total } = calculeazaScore();
  const procent = corecte / total;
  const stars = procent === 1 ? 3 : procent >= 0.8 ? 2 : procent >= 0.5 ? 1 : 0;

  // Grupare câmpuri pe secțiuni
  const sectiuni = {};
  document.campuri.forEach((c) => {
    const s = c.sectiune || 'general';
    if (!sectiuni[s]) sectiuni[s] = [];
    sectiuni[s].push(c);
  });

  const denumiriSectiuni = {
    general: '📋 Informații generale',
    furnizor: '🏢 Furnizor',
    cumparator: '🏪 Cumpărător',
    produse: '📦 Produse / Servicii',
    totaluri: '💰 Totaluri',
    emitent: '🏢 Emitent',
    platitor: '👤 Plătitor',
    beneficiar: '🎯 Beneficiar',
    destinatar: '📍 Destinatar',
    expeditor: '📤 Expeditor',
    suma: '💵 Suma',
    semnaturi: '✍️ Semnături',
    transport: '🚚 Transport',
    sume: '💰 Sume',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <Confetti visible={confettiVisible} />

      <LinearGradient colors={['#10B981', '#059669']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Înapoi</Text>
        </TouchableOpacity>
        <Text style={styles.headerLabel}>Nivel 3 - Completează</Text>
        <Text style={styles.headerTitle}>{document.emoji} {document.nume}</Text>
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {!showResults && (
            <Animated.View entering={FadeInDown.duration(400)}>
              <View style={[styles.mesajCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <MascotaCuMesaj
                  mesaj="Apasă pe orice valoare 📋 din scenariu ca să o copiezi, apoi lipește în câmpul potrivit. Poți și să ții degetul apăsat pe text pentru a selecta manual."
                  expression="excited"
                  size={50}
                />
              </View>

              {/* Scenariu cu copy buttons */}
              <View style={[styles.scenariuCard, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
                <Text style={[styles.scenariuLabel, { color: colors.primary }]}>📋 SCENARIU</Text>
                <ScenariuTextCuCopy text={scenariu.scenariu} />
              </View>

              {/* Formular pe secțiuni */}
              {Object.entries(sectiuni).map(([sectiune, campuri]) => (
                <View key={sectiune} style={[styles.sectiuneCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Text style={[styles.sectiuneTitlu, { color: colors.primary }]}>
                    {denumiriSectiuni[sectiune] || sectiune}
                  </Text>
                  {campuri.map((camp) => (
                    <View key={camp.id} style={styles.fieldRow}>
                      <Text style={[styles.fieldLabel, { color: colors.text }]}>
                        {camp.eticheta}
                        {camp.obligatoriu && <Text style={{ color: '#EF4444' }}> *</Text>}
                      </Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: isDark ? colors.surfaceAlt : '#F8FAFC',
                            borderColor: colors.border,
                            color: colors.text,
                          },
                        ]}
                        placeholder={camp.placeholder}
                        placeholderTextColor={colors.textMuted}
                        value={String(valori[camp.id] ?? '')}
                        onChangeText={(t) => {
                          setValori((p) => ({ ...p, [camp.id]: t }));
                          // Validare plafoane Legea 70/2015 pentru chitanță
                          if (document.id === 'chitanta' && camp.id === 'suma') {
                            const n = parseFloat(t.replace(',', '.'));
                            if (!isNaN(n) && n > 5000) {
                              // Avertizare după 800ms de inactivitate
                              clearTimeout(window._cashWarningTimer);
                              window._cashWarningTimer = setTimeout(() => {
                                if (Platform.OS === 'android') {
                                  ToastAndroid.showWithGravity(
                                    `⚠️ Atenție: ${n.toLocaleString('ro-RO')} lei depășește plafonul de 5.000 lei/zi (Legea 70/2015, art. 3)`,
                                    ToastAndroid.LONG,
                                    ToastAndroid.CENTER
                                  );
                                }
                              }, 800);
                            }
                          }
                        }}
                        keyboardType={camp.tip === 'number' ? 'numeric' : 'default'}
                      />
                    </View>
                  ))}
                </View>
              ))}

              <Button
                title="Verifică răspunsurile"
                variant="success"
                size="lg"
                onPress={handleFinalize}
                style={{ marginTop: SPACING.lg }}
              />
            </Animated.View>
          )}

          {showResults && (
            <Animated.View entering={FadeIn}>
              <View style={[styles.completedCard, { backgroundColor: stars >= 2 ? '#10B98115' : '#F59E0B15', borderColor: stars >= 2 ? '#10B981' : '#F59E0B' }]}>
                <Mascota size={80} expression={stars === 3 ? 'excited' : stars >= 1 ? 'happy' : 'sad'} />
                <Text style={[styles.completedTitle, { color: stars >= 2 ? '#10B981' : '#F59E0B' }]}>
                  {stars === 3 ? 'Perfect!' : stars === 2 ? 'Foarte bine!' : stars === 1 ? 'Aproape!' : 'Mai încearcă!'}
                </Text>
                <Stars count={stars} size={32} />
                <Text style={[styles.completedText, { color: colors.text }]}>
                  Răspunsuri corecte: {corecte} / {total}
                </Text>
                <Text style={[styles.completedText, { color: colors.text, marginTop: 4 }]}>
                  +{Math.round(nivelData.xp * procent)} XP
                </Text>
              </View>

              <Text style={[styles.compareTitle, { color: colors.text }]}>
                📊 Compară răspunsurile:
              </Text>
              {document.campuri.map((camp) => {
                const userVal = valori[camp.id];
                const corectVal = scenariu.raspuns[camp.id];
                const corectt = normalize(userVal) === normalize(corectVal);

                return (
                  <View
                    key={camp.id}
                    style={[
                      styles.compareCard,
                      {
                        backgroundColor: corectt ? '#10B98115' : '#EF444415',
                        borderColor: corectt ? '#10B981' : '#EF4444',
                      },
                    ]}
                  >
                    <Text style={[styles.compareLabel, { color: colors.textSecondary }]}>
                      {camp.eticheta} {corectt ? '✅' : '❌'}
                    </Text>
                    <View style={styles.compareRow}>
                      <Text style={[styles.compareKey, { color: colors.textMuted }]}>Tu:</Text>
                      <Text style={[styles.compareValue, { color: corectt ? '#10B981' : '#EF4444' }]}>
                        {userVal || '(necompletat)'}
                      </Text>
                    </View>
                    {!corectt && (
                      <View style={styles.compareRow}>
                        <Text style={[styles.compareKey, { color: colors.textMuted }]}>Corect:</Text>
                        <Text style={[styles.compareValue, { color: '#10B981' }]}>{corectVal}</Text>
                      </View>
                    )}
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
      </KeyboardAvoidingView>
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
  sectiuneCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  sectiuneTitlu: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  fieldRow: {
    marginBottom: SPACING.sm,
  },
  fieldLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 10,
    fontSize: FONT_SIZE.md,
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
  compareTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  compareCard: {
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderLeftWidth: 4,
    marginBottom: 6,
  },
  compareLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  compareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  compareKey: {
    fontSize: FONT_SIZE.xs,
    width: 50,
  },
  compareValue: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
});
