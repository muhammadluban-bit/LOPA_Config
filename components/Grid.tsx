import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, Pattern, Path, Rect } from "react-native-svg";

interface GridProps {
  isMobile: boolean;
  rulerHeight: number;
  width: number | string; 
  height?: number | string;
  zoom?: number; 
}

function Grid({ 
  isMobile, 
  rulerHeight, 
  width, 
  height = '100%',
  zoom = 1 
}: GridProps) {

  // Dynamically scale the line steps using the zoom factor so they fill the container 1:1
  const minorSize = 5 * zoom;
  const majorSize = 25 * zoom;

  return (
    <View style={[
      styles.gridContainer, 
      { 
        width: Number(width), 
        height: Number(height), 
        top: rulerHeight, 
        alignSelf: 'flex-start' 
      }
    ]}>
      <Svg style={styles.svgOverlay}>
        <Defs>
          {/* Dynamic sizing locks perfectly inside the shrinking/growing View container */}
          <Pattern 
            id="minorGrid" 
            width={minorSize} 
            height={minorSize} 
            patternUnits="userSpaceOnUse"
          >
            <Path 
              d={`M ${minorSize} 0 L 0 0 0 ${minorSize}`} 
              fill="none" 
              stroke="#d0d0d0" 
              strokeWidth="0.5" 
            />
          </Pattern>
          
          <Pattern 
            id="majorGrid" 
            width={majorSize} 
            height={majorSize} 
            patternUnits="userSpaceOnUse"
          >
            <Rect width={majorSize} height={majorSize} fill="url(#minorGrid)" />
            <Path 
              d={`M ${majorSize} 0 L 0 0 0 ${majorSize}`} 
              fill="none" 
              stroke="#888888" 
              strokeWidth="1" 
            />
          </Pattern>
        </Defs>

        {/* Removed <G transform> to let the background pattern natively fill the exact container pixel bounds */}
        <Rect width="100%" height="100%" fill="url(#majorGrid)" />
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
    width: '100%', 
    height: '100%'
  }
});

export default React.memo(Grid);
