import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Nivel1Screen from './Nivel1Screen';
import Nivel2Screen from './Nivel2Screen';
import Nivel3Screen from './Nivel3Screen';
import FluxScreen from './FluxScreen';

// Router între tipurile de lecție
export default function LessonScreen({ navigation, route }) {
  const { lesson } = route.params;
  const { colors } = useTheme();

  if (!lesson) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
        <Text style={{ color: colors.text }}>Lecție indisponibilă</Text>
      </View>
    );
  }

  // Lecție tip "flux" - ecran special
  if (lesson.tip === 'flux') {
    return (
      <FluxScreen
        navigation={navigation}
        route={{ params: { fluxId: lesson.fluxId, lessonId: lesson.id } }}
      />
    );
  }

  // Lecție tip "document" - 3 niveluri
  if (lesson.nivel === 1) return <Nivel1Screen navigation={navigation} route={route} />;
  if (lesson.nivel === 2) return <Nivel2Screen navigation={navigation} route={route} />;
  if (lesson.nivel === 3) return <Nivel3Screen navigation={navigation} route={route} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <Text style={{ color: colors.text }}>Tip lecție necunoscut</Text>
    </View>
  );
}
