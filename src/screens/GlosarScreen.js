import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { DOCUMENTE } from '../data/index';
import { Button } from '../components/UI';
import { SPACING, FONT_SIZE, RADIUS, SHADOWS } from '../theme/theme';

const DOCUMENTE_ARRAY = Object.values(DOCUMENTE);

export default function GlosarScreen({ navigation }) {
  const { colors, isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [docSelectat, setDocSelectat] = useState(null);

  const filtered = DOCUMENTE_ARRAY.filter(
    (d) =>
      d.nume.toLowerCase().includes(search.toLowerCase()) ||
      d.descriere.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <LinearGradient colors={['#8B5CF6', '#7C3AED']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Înapoi</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📖 Glosar Documente</Text>
        <Text style={styles.headerSubtitle}>Caută orice document și învață rapid</Text>
      </LinearGradient>

      <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={{ fontSize: 18, marginRight: 8 }}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Caută factură, NIR, chitanță..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.map((doc, idx) => (
          <Animated.View key={doc.id} entering={FadeInDown.delay(idx * 50).duration(400)}>
            <TouchableOpacity
              onPress={() => setDocSelectat(doc)}
              style={[styles.docCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={{ fontSize: 36 }}>{doc.emoji}</Text>
              <View style={{ flex: 1, marginLeft: SPACING.md }}>
                <Text style={[styles.docTitle, { color: colors.text }]}>{doc.nume}</Text>
                <Text style={[styles.docDesc, { color: colors.textSecondary }]} numberOfLines={2}>
                  {doc.descriere}
                </Text>
                <Text style={[styles.docLegal, { color: colors.textMuted }]}>{doc.bazaLegala}</Text>
              </View>
              <Text style={{ fontSize: 20, color: colors.textMuted }}>→</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}

        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <Text style={{ fontSize: 48 }}>🔍</Text>
            <Text style={[styles.noResults, { color: colors.textSecondary }]}>
              Niciun document găsit
            </Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal
        visible={!!docSelectat}
        transparent
        animationType="slide"
        onRequestClose={() => setDocSelectat(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            {docSelectat && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <Text style={{ fontSize: 48 }}>{docSelectat.emoji}</Text>
                  <View style={{ flex: 1, marginLeft: SPACING.md }}>
                    <Text style={[styles.modalTitle, { color: colors.text }]}>{docSelectat.nume}</Text>
                    <Text style={[styles.modalLegal, { color: colors.textMuted }]}>
                      {docSelectat.bazaLegala}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.modalSection, { color: colors.text }]}>📋 Descriere</Text>
                <Text style={[styles.modalText, { color: colors.textSecondary }]}>
                  {docSelectat.descriere}
                </Text>

                <Text style={[styles.modalSection, { color: colors.text }]}>✅ Când se folosește</Text>
                {docSelectat.candSeFoloseste?.map((c, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={{ color: colors.primary, fontSize: 14, marginRight: 6 }}>•</Text>
                    <Text style={[styles.bullet, { color: colors.textSecondary }]}>{c}</Text>
                  </View>
                ))}

                <Text style={[styles.modalSection, { color: colors.text }]}>📑 Câmpuri principale</Text>
                {docSelectat.campuri?.slice(0, 8).map((camp) => (
                  <View key={camp.id} style={[styles.campCard, { backgroundColor: isDark ? colors.surfaceAlt : '#F1F5F9' }]}>
                    <Text style={[styles.campNume, { color: colors.text }]}>
                      {camp.eticheta} {camp.obligatoriu && <Text style={{ color: '#EF4444' }}>*</Text>}
                    </Text>
                    <Text style={[styles.campExpl, { color: colors.textSecondary }]}>
                      {camp.explicatie}
                    </Text>
                  </View>
                ))}

                <Button
                  title="Închide"
                  variant="primary"
                  size="lg"
                  onPress={() => setDocSelectat(null)}
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
  backText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING.md,
    padding: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZE.md,
  },
  scroll: {
    paddingHorizontal: SPACING.md,
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  docTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
  },
  docDesc: {
    fontSize: FONT_SIZE.xs,
    marginTop: 4,
    lineHeight: 18,
  },
  docLegal: {
    fontSize: 10,
    marginTop: 4,
  },
  noResults: {
    fontSize: FONT_SIZE.md,
    marginTop: SPACING.md,
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
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
  },
  modalLegal: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
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
  bulletRow: {
    flexDirection: 'row',
    paddingVertical: 3,
  },
  bullet: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
  },
  campCard: {
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    marginBottom: 6,
  },
  campNume: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
  },
  campExpl: {
    fontSize: FONT_SIZE.xs,
    marginTop: 4,
    lineHeight: 18,
  },
});
