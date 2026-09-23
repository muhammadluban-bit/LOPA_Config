import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, Pattern, Path, Rect, G } from "react-native-svg";

interface GridProps {
  isMobile: boolean;
  minorStep?: number;
  majorStep?: number;
  rulerHeight: number;
  width: number | string; 
  height?: number | string;
  zoom?: number; 
}

function Grid({ 
  rulerHeight, 
  width, 
  height = '100%',
  zoom = 1 
}: GridProps) {

  // Safeguard values to be pure numeric values for SVG drawing boundaries
  const numericWidth = Number(width);
  const numericHeight = Number(height);

  return (
    <View style={[styles.gridContainer, { width: numericWidth, height: numericHeight, top: rulerHeight, alignSelf: 'flex-start' }]}>
      {/* Explicitly passing numeric width/height stops the viewport from stretching past the scaled pattern */}
      <Svg style={styles.svgOverlay} width={numericWidth} height={numericHeight}>
        <Defs>
          {/* Locked at static structural units (5x5). No double scaling. */}
          <Pattern 
            id="minorGrid" 
            width={5} 
            height={5} 
            patternUnits="userSpaceOnUse"
          >
            <Path d="M 5 0 L 0 0 0 5" fill="none" stroke="#d0d0d0" strokeWidth="0.5" />
          </Pattern>
          
          {/* Locked at static structural units (25x25). Perfect 5:1 ratio. */}
          <Pattern 
            id="majorGrid" 
            width={25} 
            height={25} 
            patternUnits="userSpaceOnUse"
          >
            <Rect width={25} height={25} fill="url(#minorGrid)" />
            <Path d="M 25 0 L 0 0 0 25" fill="none" stroke="#888888" strokeWidth="1" />
          </Pattern>
        </Defs>

        {/* 
          We wrap the rendering Rect in a Group container and scale the composite view.
          This applies the zoom transformation cleanly across all lines simultaneously.
        */}
        <G transform={`scale(${zoom})`}>
          {/* Dynamically adjust the Rect dimensions so it stays perfectly bounded when scaled down */}
          <Rect width={numericWidth / zoom} height={numericHeight / zoom} fill="url(#majorGrid)" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    position: 'relative', 
    left: 0, 
    backgroundColor: '#ffffff',
    borderColor: '#7f84b4',
    borderWidth: 2,
    overflow: 'hidden', 
  },
  svgOverlay: {
    // Width and height are now controlled by direct component properties
  }
});

export default React.memo(Grid);
