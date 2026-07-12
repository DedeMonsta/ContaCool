import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerRootComponent } from 'expo';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { ProgressProvider, useProgress } from './src/context/ProgressContext';

import HomeScreen from './src/screens/HomeScreen';
import ModuleDetailScreen from './src/screens/ModuleDetailScreen';
import LessonScreen from './src/screens/LessonScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import GlosarScreen from './src/screens/GlosarScreen';
import TutorialScreen from './src/screens/TutorialScreen';
import PlanConturiScreen from './src/screens/PlanConturiScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 8),
          height: 60 + Math.max(insets.bottom, 8),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
        tabBarIcon: ({ focused }) => {
          const icons = {
            Acasa: '🏠',
            Glosar: '📖',
            Profil: '👤',
          };
          return <Text style={{ fontSize: focused ? 26 : 22 }}>{icons[route.name]}</Text>;
        },
      })}
    >
      <Tab.Screen name="Acasa" component={HomeScreen} options={{ title: 'Acasă' }} />
      <Tab.Screen name="Glosar" component={GlosarScreen} options={{ title: 'Glosar' }} />
      <Tab.Screen name="Profil" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}

function RootStack() {
  const { isDark, colors } = useTheme();
  const { tutorialCompleted } = useProgress();
  const [firstScreen, setFirstScreen] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('@contacool_onboarding_v2').then((value) => {
      if (value === 'done') {
        if (tutorialCompleted) {
          setFirstScreen('Main');
        } else {
          setFirstScreen('Tutorial');
        }
      } else {
        setFirstScreen('Onboarding');
      }
    }).catch(() => setFirstScreen('Onboarding'));
  }, [tutorialCompleted]);

  if (!firstScreen) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const navTheme = isDark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={{
      ...navTheme,
      colors: {
        ...navTheme.colors,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        primary: colors.primary,
      },
    }}>
      <Stack.Navigator
        initialRouteName={firstScreen}
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Onboarding">
          {(props) => (
            <OnboardingScreen
              {...props}
              navigation={{
                ...props.navigation,
                replace: (route) => {
                  AsyncStorage.setItem('@contacool_onboarding_v2', 'done');
                  props.navigation.replace(route);
                },
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Glosar" component={GlosarScreen} />
        <Stack.Screen name="PlanConturi" component={PlanConturiScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ProgressProvider>
            <StatusBar style="auto" />
            <RootStack />
          </ProgressProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;

registerRootComponent(App);
