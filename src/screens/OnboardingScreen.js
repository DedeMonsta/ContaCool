import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Mascota } from '../components/Mascota';
import { Button } from '../components/UI';
import { SPACING, FONT_SIZE, RADIUS, SHADOWS } from '../theme/theme';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#4F46E5', '#6366F1', '#818CF8']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInDown.duration(600)} style={styles.heroSection}>
            <Mascota size={150} expression="excited" />
            <Text style={styles.appName}>ContaCool</Text>
            <Text style={styles.tagline}>Documentele contabile, distractiv 🚀</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            <View style={styles.featureCard}>
              <Text style={styles.featureEmoji}>📚</Text>
              <View style={{ flex: 1, marginLeft: SPACING.md }}>
                <Text style={styles.featureTitle}>Învață prin practică</Text>
                <Text style={styles.featureDesc}>
                  4 module cu fluxuri complete și articole contabile reale
                </Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(600)}>
            <View style={styles.featureCard}>
              <Text style={styles.featureEmoji}>🎯</Text>
              <View style={{ flex: 1, marginLeft: SPACING.md }}>
                <Text style={styles.featureTitle}>Câștigă XP și badges</Text>
                <Text style={styles.featureDesc}>
                  Avansează prin niveluri, păstrează streak-ul zilnic
                </Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(600)}>
            <View style={styles.featureCard}>
              <Text style={styles.featureEmoji}>⚖️</Text>
              <View style={{ flex: 1, marginLeft: SPACING.md }}>
                <Text style={styles.featureTitle}>Conform legislației 2025</Text>
                <Text style={styles.featureDesc}>
                  TVA 21%, OMFP 2634/2015, Codul Fiscal actualizat
                </Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeIn.delay(600).duration(600)} style={styles.footer}>
            <Button
              title="Începe Tutorial 🚀"
              variant="warning"
              size="lg"
              onPress={() => navigation.replace('Tutorial')}
              style={{ width: '100%' }}
            />
            <Text style={styles.footerNote}>
              Tutorial scurt despre contabilitate, perfect pentru începători
            </Text>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    flexGrow: 1,
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  appName: {
    fontSize: 44,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginTop: SPACING.md,
  },
  tagline: {
    fontSize: FONT_SIZE.md,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 6,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  featureEmoji: {
    fontSize: 36,
  },
  featureTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  featureDesc: {
    fontSize: FONT_SIZE.xs,
    color: '#FFFFFF',
    opacity: 0.85,
    marginTop: 4,
    lineHeight: 18,
  },
  footer: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  footerNote: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: FONT_SIZE.xs,
    textAlign: 'center',
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
});
