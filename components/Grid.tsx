import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, Pattern, Path, Rect } from "react-native-svg";

// Define what the parent index file must supply
interface GridProps {
  isMobile: boolean;
  minorStep: number;
  majorStep: number;
  rulerHeight: number;
}

export default function Grid({ isMobile, minorStep, majorStep, rulerHeight }: GridProps) {
  return (
    <Svg style={[styles.svgOverlay, { top: rulerHeight }]}>
      {/* Structural definitions container */}
      <Defs>
        {/* Minor Grid Layer */}
        <Pattern id="minorGrid" width={minorStep} height={minorStep} patternUnits="userSpaceOnUse">
          <Path d={`M ${minorStep} 0 L 0 0 0 ${minorStep}`} fill="none" stroke="#d0d0d0" strokeWidth="0.5" />
        </Pattern>
        
        {/* Major Grid Layer (incorporating the minor background) */}
        <Pattern id="majorGrid" width={majorStep} height={majorStep} patternUnits="userSpaceOnUse">
          <Rect width={majorStep} height={majorStep} fill="url(#minorGrid)" />
          <Path d={`M ${majorStep} 0 L 0 0 0 ${majorStep}`} fill="none" stroke="#888888" strokeWidth="1" />
        </Pattern>
      </Defs>

      {/* Renders the full multi-layered backdrop layout */}
      <Rect width="100%" height="100%" fill="url(#majorGrid)" />

      {/* Realtime Interactive Crosshair Tracking Line overlay can be safely pasted here later */}
    </Svg>
  );
}

const styles = StyleSheet.create({
  svgOverlay: {
    position: 'absolute', 
    left: 0, 
    width: '100%', 
    height: '100%'
  }
});
