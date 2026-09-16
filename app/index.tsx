import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Pressable, useWindowDimensions } from "react-native";
import Svg, { Dfs, Pattern, Path, Rect } from "react-native-svg";
import { styles } from "../styles/styles";

interface Coordinates {
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
}

const RECTANGLE_COORDS: Coordinates = {
  colStart: 11,
  colEnd: 1091,
  rowStart: 21,
  rowEnd: 171,
};

const GRID_UNIT = 2.5;
const DESKTOP_COLS = 1200;
const DESKTOP_ROWS = 190;

export default function HomeScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const [zoom, setZoom] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(windowWidth <= 768);
  }, [windowWidth]);

  useEffect(() => {
    setZoom(isMobile ? 0.8 : 1);
  }, [isMobile]);

  const zoomIn = () => setZoom(z => Math.min(z * 1.2, 5));
  const zoomOut = () => setZoom(z => Math.max(z / 1.2, 0.05));
  const handleReset = () => setZoom(isMobile ? 0.8 : 1);

  const canvasWidth = (isMobile ? DESKTOP_ROWS : DESKTOP_COLS) * GRID_UNIT;
  const canvasHeight = (isMobile ? DESKTOP_COLS : DESKTOP_ROWS) * GRID_UNIT;

  const getRectangleStyle = () => {
    let startCol = RECTANGLE_COORDS.colStart;
    let endCol = RECTANGLE_COORDS.colEnd;
    let startRow = RECTANGLE_COORDS.rowStart;
    let endRow = RECTANGLE_COORDS.rowEnd;

    if (isMobile) {
      return {
        position: 'absolute' as const,
        left: (startRow - 1) * GRID_UNIT,
        top: (startCol - 1) * GRID_UNIT,
        width: (endRow - startRow) * GRID_UNIT,
        height: (endCol - startCol) * GRID_UNIT,
      };
    }

    return {
      position: 'absolute' as const,
      left: (startCol - 1) * GRID_UNIT,
      top: (startRow - 1) * GRID_UNIT,
      width: (endCol - startCol) * GRID_UNIT,
      height: (endRow - startRow) * GRID_UNIT,
    };
  };

  return (
    <View style={styles.app}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Navigation Bar Placeholder</Text>
      </View>

      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={zoomIn}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={zoomOut}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      <View style={styles.canvasSection}>
        <ScrollView horizontal style={styles.canvasWrapperHorizontal}>
          <ScrollView contentContainerStyle={styles.canvasWrapperVertical}>
            <View 
              style={[
                styles.canvas, 
                { 
                  width: canvasWidth, 
                  height: canvasHeight,
                  transform: [{ scale: zoom }],
                }
              ]}
            >
              {/* Native Vector Blueprint Grid Background Builder */}
              <Svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                {/* Minor grid matrix lines (Every 5px) */}
                <Pattern id="minorGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                  <Path d="M 5 0 L 0 0 0 5" fill="none" stroke="#d0d0d0" strokeWidth="0.5" />
                </Pattern>
                {/* Major grid anchor blocks (Every 25px) */}
                <Pattern id="majorGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <Rect width="25" height="25" fill="url(#minorGrid)" />
                  <Path d="M 25 0 L 0 0 0 25" fill="none" stroke="#888888" strokeWidth="1" />
                </Pattern>
                {/* Fills the whole background container */}
                <Rect width="100%" height="100%" fill="url(#majorGrid)" />
              </Svg>

              {/* Plotted Content Shape Block */}
              <View style={[styles.rectangle, getRectangleStyle()]} />
            </View>
          </ScrollView>
        </ScrollView>
      </View>

      <View style={styles.configurator}>
        <Text style={styles.configuratorTitle}>Configurator Placeholder</Text>
        <Text style={styles.configuratorText}>Future controls, properties and settings will go here.</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>
            Static Coords: Columns ({RECTANGLE_COORDS.colStart}-{RECTANGLE_COORDS.colEnd}) | Rows ({RECTANGLE_COORDS.rowStart}-{RECTANGLE_COORDS.rowEnd})
          </Text>
        </View>
      </View>
    </View>
  );
}
