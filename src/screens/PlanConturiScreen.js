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
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { PLAN_CONTURI, ARTICOLE_FRECVENTE } from '../data/plan-conturi';
import { Button } from '../components/UI';
import { SPACING, FONT_SIZE, RADIUS, SHADOWS } from '../theme/theme';

export default function PlanConturiScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const [tab, setTab] = useState('conturi');
  const [contSelectat, setContSelectat] = useState(null);

  const getFunctieColor = (functie) => {
    if (functie === 'A') return '#10B981';
    if (functie === 'P') return '#EF4444';
    return '#8B5CF6';
  };
  const getFunctieNume = (functie) => {
    if (functie === 'A') return 'ACTIV';
    if (functie === 'P') return 'PASIV';
    return 'BIFUNCȚIONAL';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <LinearGradient colors={['#4F46E5', '#6366F1']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Înapoi</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📊 Plan de Conturi</Text>
        <Text style={styles.headerSubtitle}>OMFP 1802/2014 - selecție pedagogică</Text>
      </LinearGradient>

      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setTab('conturi')}
          style={[
            styles.tab,
            { backgroundColor: tab === 'conturi' ? colors.primary : 'transparent' },
          ]}
        >
          <Text style={[styles.tabText, { color: tab === 'conturi' ? '#FFFFFF' : colors.text }]}>
            Conturi ({PLAN_CONTURI.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('articole')}
          style={[
            styles.tab,
            { backgroundColor: tab === 'articole' ? colors.primary : 'transparent' },
          ]}
        >
          <Text style={[styles.tabText, { color: tab === 'articole' ? '#FFFFFF' : colors.text }]}>
            Articole tipice ({ARTICOLE_FRECVENTE.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {tab === 'conturi' &&
          PLAN_CONTURI.map((c, idx) => (
            <Animated.View key={c.cont} entering={FadeInDown.delay(idx * 30).duration(300)}>
              <TouchableOpacity
                onPress={() => setContSelectat(c)}
                style={[styles.contCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <View style={[styles.contNumberCircle, { backgroundColor: getFunctieColor(c.functie) + '20' }]}>
                  <Text style={[styles.contNumberText, { color: getFunctieColor(c.functie) }]}>{c.cont}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: SPACING.md }}>
                  <Text style={[styles.contName, { color: colors.text }]}>{c.denumire}</Text>
                  <Text style={[styles.contClasa, { color: colors.textMuted }]}>{c.grupa}</Text>
                </View>
                <View style={[styles.functieBadge, { backgroundColor: getFunctieColor(c.functie) }]}>
                  <Text style={styles.functieBadgeText}>{c.functie}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}

        {tab === 'articole' &&
          ARTICOLE_FRECVENTE.map((a, idx) => (
            <Animated.View key={idx} entering={FadeInDown.delay(idx * 50).duration(300)}>
              <View style={[styles.articolCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.articolTitlu, { color: colors.primary }]}>{a.titlu}</Text>
                <View style={[styles.formulaBox, { backgroundColor: isDark ? colors.surfaceAlt : '#F1F5F9' }]}>
                  <Text style={[styles.formulaText, { color: colors.text }]}>{a.formula}</Text>
                  <Text style={[styles.formulaDetail, { color: colors.textSecondary }]}>{a.detalii}</Text>
                </View>
                <Text style={[styles.articolExpl, { color: colors.textSecondary }]}>{a.explicatie}</Text>
              </View>
            </Animated.View>
          ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={!!contSelectat} transparent animationType="slide" onRequestClose={() => setContSelectat(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            {contSelectat && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalCont, { color: colors.primary }]}>{contSelectat.cont}</Text>
                  <View style={[styles.functieBadge, { backgroundColor: getFunctieColor(contSelectat.functie) }]}>
                    <Text style={styles.functieBadgeText}>{getFunctieNume(contSelectat.functie)}</Text>
                  </View>
                </View>
                <Text style={[styles.modalDenumire, { color: colors.text }]}>{contSelectat.denumire}</Text>
                <Text style={[styles.modalGrupa, { color: colors.textMuted }]}>
                  {contSelectat.clasa} • {contSelectat.grupa}
                </Text>

                <View style={[styles.modalRegula, { backgroundColor: colors.primary + '15' }]}>
                  <Text style={[styles.modalRegulaLabel, { color: colors.primary }]}>
                    🎯 Crește prin
                  </Text>
                  <Text style={[styles.modalRegulaValue, { color: contSelectat.cresteProb === 'D' ? '#10B981' : '#EF4444' }]}>
                    {contSelectat.cresteProb === 'D' ? 'DEBIT' : contSelectat.cresteProb === 'C' ? 'CREDIT' : 'după caz'}
                  </Text>
                </View>

                <Text style={[styles.modalSection, { color: colors.text }]}>📚 Ce reprezintă</Text>
                <Text style={[styles.modalText, { color: colors.textSecondary }]}>
                  {contSelectat.descriere}
                </Text>

                <Text style={[styles.modalSection, { color: colors.text }]}>💡 Exemplu</Text>
                <View style={[styles.exempluBox, { backgroundColor: isDark ? colors.surfaceAlt : '#FEF3C7' }]}>
                  <Text style={[styles.exempluText, { color: colors.text }]}>
                    {contSelectat.exemplu}
                  </Text>
                </View>

                <Button
                  title="Închide"
                  variant="primary"
                  size="lg"
                  onPress={() => setContSelectat(null)}
                  style={{ marginTop: SPACING.lg, width: '100%' }}
                />
              </ScrollView>
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
  backText: { color: '#FFFFFF', fontSize: FONT_SIZE.md, fontWeight: '600' },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    marginTop: SPACING.sm,
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.sm,
    opacity: 0.85,
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    padding: SPACING.sm,
    gap: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  tabText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
  scroll: { padding: SPACING.md },
  contCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  contNumberCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contNumberText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
  },
  contName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  contClasa: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },
  functieBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  functieBadgeText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.xs,
    fontWeight: '800',
  },
  articolCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  articolTitlu: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  formulaBox: {
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  formulaText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  formulaDetail: {
    fontSize: FONT_SIZE.xs,
    marginTop: 4,
  },
  articolExpl: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 22,
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
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalCont: {
    fontSize: 36,
    fontWeight: '800',
  },
  modalDenumire: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalGrupa: {
    fontSize: FONT_SIZE.xs,
    marginBottom: SPACING.md,
  },
  modalRegula: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  modalRegulaLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
  modalRegulaValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    marginTop: 4,
  },
  modalSection: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    marginTop: SPACING.md,
    marginBottom: 6,
  },
  modalText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 22,
  },
  exempluBox: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },
  exempluText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
