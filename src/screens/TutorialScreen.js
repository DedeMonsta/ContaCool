import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { TUTORIAL } from '../data/tutorial';
import { Mascota } from '../components/Mascota';
import { Button, ProgressBar } from '../components/UI';
import { playCorrect, playWrong } from '../utils/feedback';
import { SPACING, FONT_SIZE, RADIUS, SHADOWS } from '../theme/theme';

export default function TutorialScreen({ navigation, route }) {
  const { colors, isDark } = useTheme();
  const { addXP, setTutorialCompleted, hapticsEnabled } = useProgress();
  const [lectieIdx, setLectieIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [optiuneSelectata, setOptiuneSelectata] = useState(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const lectie = TUTORIAL.lectii[lectieIdx];
  const isLast = lectieIdx === TUTORIAL.lectii.length - 1;
  const progres = (lectieIdx + 1) / TUTORIAL.lectii.length;

  const handleQuiz = (idx) => {
    if (quizAnswered) return;
    setOptiuneSelectata(idx);
    setQuizAnswered(true);
    const corect = lectie.quiz.optiuni[idx].corect;
    if (corect) {
      playCorrect(hapticsEnabled);
    } else {
      playWrong(hapticsEnabled);
    }
  };

  const handleNext = async () => {
    if (!quizAnswered) {
      setShowQuiz(true);
      return;
    }
    
    await addXP(25); // 25 XP per mini-lecție

    if (isLast) {
      await setTutorialCompleted(true);
      navigation.replace('Main');
    } else {
      setLectieIdx(lectieIdx + 1);
      setShowQuiz(false);
      setOptiuneSelectata(null);
      setQuizAnswered(false);
    }
  };

  const renderConținut = (item, idx) => {
    if (item.tip === 'paragraf') {
      return (
        <Text key={idx} style={[styles.paragraf, { color: colors.text }]}>
          {item.text}
        </Text>
      );
    }
    
    if (item.tip === 'highlight') {
      return (
        <Animated.View key={idx} entering={FadeIn}>
          <Text style={[styles.highlight, { color: lectie.culoare }]}>{item.text}</Text>
        </Animated.View>
      );
    }
    
    if (item.tip === 'citat') {
      return (
        <View key={idx} style={[styles.citat, { backgroundColor: lectie.culoare + '15', borderLeftColor: lectie.culoare }]}>
          <Text style={[styles.citatText, { color: colors.text }]}>{item.text}</Text>
          <Text style={[styles.citatSursa, { color: colors.textMuted }]}>— {item.sursa}</Text>
        </View>
      );
    }
    
    if (item.tip === 'exemplu') {
      return (
        <View key={idx} style={[styles.exemplu, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.exempluLabel, { color: colors.warning }]}>💡 Exemplu</Text>
          <Text style={[styles.exempluText, { color: colors.text }]}>{item.text}</Text>
        </View>
      );
    }
    
    if (item.tip === 'box') {
      return (
        <View key={idx} style={[styles.box, { borderColor: item.culoare, backgroundColor: item.culoare + '10' }]}>
          <Text style={[styles.boxTitlu, { color: item.culoare }]}>{item.titlu}</Text>
          <Text style={[styles.boxContinut, { color: colors.text }]}>{item.continut}</Text>
          {item.detalii?.map((d, i) => (
            <Text key={i} style={[styles.boxDetaliu, { color: colors.textSecondary }]}>• {d}</Text>
          ))}
        </View>
      );
    }
    
    if (item.tip === 'cont_t') {
      return (
        <View key={idx} style={[styles.contT, { borderColor: colors.border }]}>
          <Text style={[styles.contTNume, { color: colors.primary }]}>{item.numeCont}</Text>
          <View style={[styles.contTHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.contTH, { color: '#10B981' }]}>DEBIT</Text>
            <Text style={[styles.contTSeparator, { color: colors.text }]}>│</Text>
            <Text style={[styles.contTH, { color: '#EF4444' }]}>CREDIT</Text>
          </View>
          <View style={styles.contTBody}>
            <View style={styles.contTColoana}>
              <Text style={[styles.contTValoare, { color: '#10B981' }]}>↑</Text>
              <Text style={[styles.contTLabel, { color: colors.textMuted }]}>Crește</Text>
              <Text style={[styles.contTLabel, { color: colors.textMuted }]}>(dacă A)</Text>
            </View>
            <View style={[styles.contTLinie, { backgroundColor: colors.border }]} />
            <View style={styles.contTColoana}>
              <Text style={[styles.contTValoare, { color: '#EF4444' }]}>↑</Text>
              <Text style={[styles.contTLabel, { color: colors.textMuted }]}>Crește</Text>
              <Text style={[styles.contTLabel, { color: colors.textMuted }]}>(dacă P)</Text>
            </View>
          </View>
        </View>
      );
    }
    
    if (item.tip === 'lista_docs') {
      return (
        <View key={idx} style={{ marginVertical: SPACING.md }}>
          {item.documente.map((d, i) => (
            <View key={i} style={[styles.docRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={{ fontSize: 28 }}>{d.icon}</Text>
              <View style={{ flex: 1, marginLeft: SPACING.sm }}>
                <Text style={[styles.docNume, { color: colors.text }]}>{d.nume}</Text>
                <Text style={[styles.docCand, { color: colors.textSecondary }]}>{d.cand}</Text>
              </View>
              <View style={[styles.docCont, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.docContText, { color: colors.primary }]}>{d.cont}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    }
    
    return null;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      {/* Header cu progres */}
      <LinearGradient
        colors={[lectie.culoare, lectie.culoare + 'CC']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.subtitlu}>{lectie.subtitlu}</Text>
          <TouchableOpacity onPress={() => {
            setTutorialCompleted(true);
            navigation.replace('Main');
          }}>
            <Text style={styles.skipBtn}>Sari peste →</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.titlu}>{lectie.emoji} {lectie.titlu}</Text>
        <ProgressBar progress={progres} color="#FFFFFF" backgroundColor="rgba(255,255,255,0.3)" height={6} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {!showQuiz ? (
          <Animated.View entering={FadeInDown.duration(400)}>
            {lectie.continut.map((item, idx) => renderConținut(item, idx))}
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInDown.duration(400)}>
            <View style={[styles.quizCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.quizMascotRow}>
                <Mascota size={60} expression={quizAnswered ? (lectie.quiz.optiuni[optiuneSelectata]?.corect ? 'excited' : 'thinking') : 'thinking'} />
                <View style={{ flex: 1, marginLeft: SPACING.md }}>
                  <Text style={[styles.quizLabel, { color: lectie.culoare }]}>🎯 Mini-quiz</Text>
                  <Text style={[styles.quizIntrebare, { color: colors.text }]}>
                    {lectie.quiz.intrebare}
                  </Text>
                </View>
              </View>

              {lectie.quiz.optiuni.map((opt, idx) => {
                const isSelected = optiuneSelectata === idx;
                const showResult = quizAnswered && isSelected;
                const showAsCorrect = quizAnswered && opt.corect;
                
                let bgColor = colors.surfaceAlt;
                let borderColor = colors.border;
                
                if (showAsCorrect) {
                  bgColor = '#10B98120';
                  borderColor = '#10B981';
                } else if (showResult && !opt.corect) {
                  bgColor = '#EF444420';
                  borderColor = '#EF4444';
                } else if (isSelected) {
                  bgColor = colors.primary + '20';
                  borderColor = colors.primary;
                }

                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleQuiz(idx)}
                    disabled={quizAnswered}
                    style={[
                      styles.quizOpt,
                      { backgroundColor: bgColor, borderColor },
                    ]}
                  >
                    <Text style={[styles.quizOptText, { color: colors.text }]}>{opt.text}</Text>
                    {showAsCorrect && <Text style={{ fontSize: 20 }}>✅</Text>}
                    {showResult && !opt.corect && <Text style={{ fontSize: 20 }}>❌</Text>}
                  </TouchableOpacity>
                );
              })}

              {quizAnswered && (
                <Animated.View entering={FadeIn} style={[styles.quizExplicatie, { backgroundColor: lectie.culoare + '15' }]}>
                  <Text style={[styles.quizExplicatieTitlu, { color: lectie.culoare }]}>💡 Explicație</Text>
                  <Text style={[styles.quizExplicatieText, { color: colors.text }]}>
                    {lectie.quiz.explicatie}
                  </Text>
                </Animated.View>
              )}
            </View>
          </Animated.View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Footer cu buton */}
      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        {!showQuiz ? (
          <Button title="Continuă →" variant="primary" size="lg" onPress={() => setShowQuiz(true)} style={{ width: '100%' }} />
        ) : (
          <Button
            title={isLast ? 'Începe cu modulele 🚀' : 'Următoarea lecție →'}
            variant="primary"
            size="lg"
            onPress={handleNext}
            disabled={!quizAnswered}
            style={{ width: '100%' }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  subtitlu: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    opacity: 0.9,
  },
  skipBtn: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    opacity: 0.9,
  },
  titlu: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.xxl,
    fontWeight: '800',
    marginBottom: SPACING.md,
  },
  scroll: {
    padding: SPACING.md,
  },
  paragraf: {
    fontSize: FONT_SIZE.md,
    lineHeight: 24,
    marginBottom: SPACING.md,
  },
  highlight: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: SPACING.md,
  },
  citat: {
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderRadius: RADIUS.sm,
    marginVertical: SPACING.md,
  },
  citatText: {
    fontSize: FONT_SIZE.md,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  citatSursa: {
    fontSize: FONT_SIZE.xs,
    marginTop: 8,
    fontWeight: '600',
  },
  exemplu: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginVertical: SPACING.md,
    ...SHADOWS.sm,
  },
  exempluLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '800',
    marginBottom: 6,
  },
  exempluText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 22,
  },
  box: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    marginVertical: SPACING.sm,
  },
  boxTitlu: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
    marginBottom: 4,
  },
  boxContinut: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  boxDetaliu: {
    fontSize: FONT_SIZE.sm,
    marginTop: 4,
    lineHeight: 20,
  },
  contT: {
    borderRadius: RADIUS.md,
    borderWidth: 2,
    overflow: 'hidden',
    marginVertical: SPACING.md,
  },
  contTNume: {
    padding: SPACING.sm,
    textAlign: 'center',
    fontWeight: '800',
    fontSize: FONT_SIZE.md,
  },
  contTHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    paddingVertical: 8,
  },
  contTH: {
    flex: 1,
    textAlign: 'center',
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
  },
  contTSeparator: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
  },
  contTBody: {
    flexDirection: 'row',
    paddingVertical: SPACING.lg,
  },
  contTColoana: {
    flex: 1,
    alignItems: 'center',
  },
  contTLinie: {
    width: 2,
  },
  contTValoare: {
    fontSize: 40,
    fontWeight: '800',
  },
  contTLabel: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    marginBottom: 6,
  },
  docNume: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  docCand: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },
  docCont: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  docContText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
  },
  quizCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
  },
  quizMascotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  quizLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
  quizIntrebare: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    lineHeight: 22,
    marginTop: 2,
  },
  quizOpt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    marginBottom: SPACING.sm,
  },
  quizOptText: {
    flex: 1,
    fontSize: FONT_SIZE.md,
  },
  quizExplicatie: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginTop: SPACING.sm,
  },
  quizExplicatieTitlu: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '800',
    marginBottom: 4,
  },
  quizExplicatieText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
  },
  footer: {
    padding: SPACING.md,
    borderTopWidth: 1,
  },
});
