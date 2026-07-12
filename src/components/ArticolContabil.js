import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SPACING, FONT_SIZE, RADIUS, SHADOWS } from '../theme/theme';

// Componentă afișare articol contabil cu explicații per cont
export const ArticolContabil = ({ articol }) => {
  const { colors, isDark } = useTheme();
  const [contSelectat, setContSelectat] = useState(null);

  if (!articol) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.titlu, { color: colors.primary }]}>📝 Articol contabil</Text>

      {/* Formula */}
      <View style={[styles.formulaBox, { backgroundColor: isDark ? colors.surfaceAlt : '#F1F5F9' }]}>
        <Text style={[styles.formulaText, { color: colors.text }]}>{articol.formula}</Text>
      </View>

      {/* Tabel D / C */}
      <View style={[styles.tabel, { borderColor: colors.border }]}>
        <View style={[styles.headerRow, { backgroundColor: isDark ? colors.surfaceAlt : '#F8FAFC' }]}>
          <Text style={[styles.headerCell, { flex: 1, color: colors.textSecondary }]}>Cont</Text>
          <Text style={[styles.headerCell, { flex: 2, color: colors.textSecondary }]}>Denumire</Text>
          <Text style={[styles.headerCell, { width: 60, textAlign: 'center', color: '#10B981' }]}>Debit</Text>
          <Text style={[styles.headerCell, { width: 60, textAlign: 'center', color: '#EF4444' }]}>Credit</Text>
        </View>

        {articol.linii.map((linie, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => setContSelectat(linie)}
            style={[
              styles.row,
              { borderTopColor: colors.border },
              idx === articol.linii.length - 1 && { borderBottomLeftRadius: RADIUS.sm, borderBottomRightRadius: RADIUS.sm },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.contNumber, { color: colors.primary }]}>{linie.cont}</Text>
              <Text style={[styles.functie, { color: colors.textMuted }]}>
                {linie.functie === 'A' ? 'Activ' : linie.functie === 'P' ? 'Pasiv' : 'Bif.'}
              </Text>
            </View>
            <Text style={[styles.denumire, { flex: 2, color: colors.text }]} numberOfLines={2}>
              {linie.denumire}
            </Text>
            <Text
              style={[
                styles.suma,
                { width: 60, color: linie.pozitie === 'D' ? '#10B981' : colors.textMuted },
              ]}
            >
              {linie.pozitie === 'D' ? linie.suma.toLocaleString('ro-RO') : '—'}
            </Text>
            <Text
              style={[
                styles.suma,
                { width: 60, color: linie.pozitie === 'C' ? '#EF4444' : colors.textMuted },
              ]}
            >
              {linie.pozitie === 'C' ? linie.suma.toLocaleString('ro-RO') : '—'}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Total verificare */}
        <View style={[styles.totalRow, { backgroundColor: isDark ? colors.surfaceAlt : '#F8FAFC', borderTopColor: colors.border }]}>
          <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>TOTAL</Text>
          <Text style={[styles.totalSuma, { color: '#10B981', width: 60, textAlign: 'center' }]}>
            {articol.linii.reduce((s, l) => s + (l.pozitie === 'D' ? l.suma : 0), 0).toLocaleString('ro-RO')}
          </Text>
          <Text style={[styles.totalSuma, { color: '#EF4444', width: 60, textAlign: 'center' }]}>
            {articol.linii.reduce((s, l) => s + (l.pozitie === 'C' ? l.suma : 0), 0).toLocaleString('ro-RO')}
          </Text>
        </View>
      </View>

      <Text style={[styles.hint, { color: colors.textMuted }]}>
        💡 Apasă pe un cont pentru explicație
      </Text>

      {/* Interpretare */}
      <View style={[styles.interpretareBox, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
        <Text style={[styles.interpretareTitlu, { color: colors.primary }]}>🎓 Ce înseamnă</Text>
        <Text style={[styles.interpretareText, { color: colors.text }]}>
          {articol.interpretare}
        </Text>
      </View>

      {/* Modal explicație cont */}
      <Modal visible={!!contSelectat} transparent animationType="slide" onRequestClose={() => setContSelectat(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            {contSelectat && (
              <>
                <View style={styles.modalHeader}>
                  <View>
                    <Text style={[styles.modalCont, { color: colors.primary }]}>{contSelectat.cont}</Text>
                    <Text style={[styles.modalDenumire, { color: colors.text }]}>{contSelectat.denumire}</Text>
                  </View>
                  <View style={[styles.functieBadge, {
                    backgroundColor: contSelectat.functie === 'A' ? '#10B98120' : '#EF444420',
                  }]}>
                    <Text style={{ color: contSelectat.functie === 'A' ? '#10B981' : '#EF4444', fontWeight: '700' }}>
                      {contSelectat.functie === 'A' ? 'ACTIV' : contSelectat.functie === 'P' ? 'PASIV' : 'BIFUNCȚIONAL'}
                    </Text>
                  </View>
                </View>

                <View style={[styles.modalRow, { backgroundColor: isDark ? colors.surfaceAlt : '#F8FAFC' }]}>
                  <Text style={[styles.modalLabel, { color: colors.textSecondary }]}>Operațiune</Text>
                  <Text style={[styles.modalValue, {
                    color: contSelectat.pozitie === 'D' ? '#10B981' : '#EF4444',
                    fontWeight: '800',
                  }]}>
                    {contSelectat.pozitie === 'D' ? 'DEBIT' : 'CREDIT'} {contSelectat.suma.toLocaleString('ro-RO')} lei
                  </Text>
                </View>

                <Text style={[styles.modalExplicatie, { color: colors.text }]}>
                  {contSelectat.explicatie}
                </Text>

                <TouchableOpacity
                  style={[styles.closeBtn, { backgroundColor: colors.primary }]}
                  onPress={() => setContSelectat(null)}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: FONT_SIZE.md }}>Am înțeles</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  titlu: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
    marginBottom: SPACING.md,
  },
  formulaBox: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  formulaText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  tabel: {
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    padding: SPACING.sm,
  },
  headerCell: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    padding: SPACING.sm,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  contNumber: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
  },
  functie: {
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },
  denumire: {
    fontSize: FONT_SIZE.sm,
    paddingHorizontal: SPACING.sm,
  },
  suma: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    textAlign: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    padding: SPACING.sm,
    borderTopWidth: 2,
    alignItems: 'center',
  },
  totalLabel: {
    flex: 3,
    fontSize: FONT_SIZE.xs,
    fontWeight: '800',
    textTransform: 'uppercase',
    paddingHorizontal: SPACING.sm,
  },
  totalSuma: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '800',
  },
  hint: {
    fontSize: FONT_SIZE.xs,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  interpretareBox: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderLeftWidth: 4,
  },
  interpretareTitlu: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '800',
    marginBottom: 6,
  },
  interpretareText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
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
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  modalCont: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '800',
  },
  modalDenumire: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    marginTop: 2,
  },
  functieBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginVertical: SPACING.sm,
  },
  modalLabel: {
    fontSize: FONT_SIZE.sm,
  },
  modalValue: {
    fontSize: FONT_SIZE.md,
  },
  modalExplicatie: {
    fontSize: FONT_SIZE.md,
    lineHeight: 24,
    marginTop: SPACING.sm,
  },
  closeBtn: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
});

export default ArticolContabil;
