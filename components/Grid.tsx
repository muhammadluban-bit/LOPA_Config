import React from 'react';
import { StyleSheet, View } from 'react-native'; // 1. Added View to act as the box layout container
import Svg, { Defs, Pattern, Path, Rect } from "react-native-svg";

interface GridProps {
  isMobile: boolean;
  minorStep: number;
  majorStep: number;
  rulerHeight: number;
  width: number | string; // 2. Added dynamic variable width prop
  height?: number | string; // Optional variable height prop
}

export default function Grid({ isMobile, minorStep, majorStep, rulerHeight, width, height = '100%' }: GridProps) {
  return (
    // 3. The wrapping View now takes the variable width from props
    <View style={[styles.gridContainer, { width, height, top: rulerHeight }]}>
      <Svg style={styles.svgOverlay}>
        <Defs>
          <Pattern id="minorGrid" width={minorStep} height={minorStep} patternUnits="userSpaceOnUse">
            <Path d={`M ${minorStep} 0 L 0 0 0 ${minorStep}`} fill="none" stroke="#d0d0d0" strokeWidth="0.5" />
          </Pattern>
          
          <Pattern id="majorGrid" width={majorStep} height={majorStep} patternUnits="userSpaceOnUse">
            <Rect width={majorStep} height={majorStep} fill="url(#minorGrid)" />
            <Path d={`M ${majorStep} 0 L 0 0 0 ${majorStep}`} fill="none" stroke="#888888" strokeWidth="1" />
          </Pattern>
        </Defs>

        <Rect width="100%" height="100%" fill="url(#majorGrid)" />
      </Svg>
    </View>
  );
}

// 4. Clean layout base parameters moved out of your master stylesheet
const styles = StyleSheet.create({
  gridContainer: {
    position: 'relative', 
    left: 0, 
    borderColor: '#7f84b4',
    borderWidth: 2,
    overflow: 'hidden', // Keeps the canvas lines perfectly inside the bounds
  },
  svgOverlay: {
    width: '100%', 
    height: '100%'
  }
});
