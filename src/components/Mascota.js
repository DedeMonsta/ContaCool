import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Rect, Ellipse, G } from 'react-native-svg';

// Andrei - mascota aplicației (păr scurt, cravată, business)
export const Andrei = ({ size = 120, expression = 'happy' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Circle cx="60" cy="60" r="58" fill="#BFDBFE" />
      
      {/* Corp - sacou bleumarin */}
      <Path
        d="M 28 115 L 28 85 Q 28 70 44 64 L 76 64 Q 92 70 92 85 L 92 115 Z"
        fill="#1E40AF"
      />
      
      {/* Reveruri sacou */}
      <Path d="M 44 64 L 52 75 L 60 88 L 52 95 L 44 78 Z" fill="#1E3A8A" />
      <Path d="M 76 64 L 68 75 L 60 88 L 68 95 L 76 78 Z" fill="#1E3A8A" />
      
      {/* Cămașă albă */}
      <Path
        d="M 52 64 L 52 88 L 60 95 L 68 88 L 68 64 Z"
        fill="#FFFFFF"
      />
      
      {/* Cravată */}
      <Path
        d="M 56 64 L 64 64 L 62 92 L 60 95 L 58 92 Z"
        fill="#DC2626"
      />
      <Path d="M 56 64 L 60 69 L 64 64 L 62 70 L 58 70 Z" fill="#991B1B" />
      
      {/* Gât */}
      <Rect x="54" y="54" width="12" height="11" fill="#F5C19A" />
      
      {/* Cap */}
      <Circle cx="60" cy="40" r="22" fill="#F5C19A" />
      
      {/* Păr - scurt, negru */}
      <Path
        d="M 38 36 Q 38 20 60 20 Q 82 20 82 36 L 78 36 Q 76 26 60 26 Q 44 26 42 36 Z"
        fill="#1F2937"
      />
      {/* Detalii păr */}
      <Path d="M 45 30 Q 50 22 55 28" fill="#374151" />
      <Path d="M 65 28 Q 70 22 75 30" fill="#374151" />
      
      {/* Sprâncene */}
      <Path d="M 47 36 L 55 35" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M 65 35 L 73 36" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Ochi */}
      <Circle cx="51" cy="42" r="2.8" fill="#1F2937" />
      <Circle cx="69" cy="42" r="2.8" fill="#1F2937" />
      <Circle cx="51.7" cy="41.3" r="0.9" fill="#FFFFFF" />
      <Circle cx="69.7" cy="41.3" r="0.9" fill="#FFFFFF" />
      
      {/* Nas */}
      <Path d="M 60 45 L 58 51 L 62 51 Z" fill="#E0A878" opacity="0.6" />
      
      {/* Obraji */}
      <Circle cx="45" cy="50" r="3.5" fill="#F87171" opacity="0.4" />
      <Circle cx="75" cy="50" r="3.5" fill="#F87171" opacity="0.4" />
      
      {/* Gură expresivă */}
      {expression === 'happy' && (
        <Path
          d="M 52 54 Q 60 60 68 54"
          stroke="#1F2937"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {expression === 'sad' && (
        <Path
          d="M 52 58 Q 60 52 68 58"
          stroke="#1F2937"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {expression === 'excited' && (
        <>
          <Ellipse cx="60" cy="56" rx="5" ry="3.5" fill="#1F2937" />
          <Path d="M 56 58 Q 60 60 64 58" stroke="#FFFFFF" strokeWidth="1" fill="none" />
        </>
      )}
      {expression === 'thinking' && (
        <Path
          d="M 54 56 L 66 56"
          stroke="#1F2937"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
      {expression === 'wink' && (
        <>
          <Circle cx="51" cy="42" r="2.8" fill="#1F2937" />
          <Path d="M 65 42 L 73 42" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
          <Path
            d="M 52 54 Q 60 60 68 54"
            stroke="#1F2937"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}
    </Svg>
  );
};

// Componentă wrapper - folosit doar Andrei
export const Mascota = ({ size = 120, expression = 'happy' }) => {
  return <Andrei size={size} expression={expression} />;
};

// Mascotă cu mesaj într-o bulă
export const MascotaCuMesaj = ({ mesaj, expression = 'happy', size = 80 }) => {
  return (
    <View style={styles.container}>
      <Andrei size={size} expression={expression} />
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>{mesaj}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  bubble: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  bubbleText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
});
