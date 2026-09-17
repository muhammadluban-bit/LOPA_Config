import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Pressable, useWindowDimensions } from "react-native";
import Svg, { Pattern, Path, Rect } from "react-native-svg";
import { styles } from "../styles/styles";

interface Coordinates {
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
}

const RECTANGLE_COORDS: Coordinates = {
  colStart: 241,
  colEnd: 1094,
  rowStart: 21,
  rowEnd: 167,
};

const BASE_GRID_UNIT = 2.5;
const DESKTOP_COLS = 1300; //fuselage length 1479
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
  const zoomOut = () => setZoom(z => Math.max(z / 1.2, 0.2)); // Keeps a safe zoom out minimum
  const handleReset = () => setZoom(isMobile ? 0.8 : 1);

  // DYNAMIC CALCULATIONS: Multiply base units by zoom factor directly
  const currentGridUnit = BASE_GRID_UNIT * zoom;
  const minorStep = 5 * zoom;
  const majorStep = 25 * zoom;

  const canvasWidth = (isMobile ? DESKTOP_ROWS : DESKTOP_COLS) * currentGridUnit;
  const canvasHeight = (isMobile ? DESKTOP_COLS : DESKTOP_ROWS) * currentGridUnit;

  // Calculates rectangle layout styles dynamically relative to the current zoom size
  const getRectangleStyle = () => {
    let startCol = RECTANGLE_COORDS.colStart;
    let endCol = RECTANGLE_COORDS.colEnd;
    let startRow = RECTANGLE_COORDS.rowStart;
    let endRow = RECTANGLE_COORDS.rowEnd;

    if (isMobile) {
      return {
        position: 'absolute' as const,
        left: (startRow - 1) * currentGridUnit,
        top: (startCol - 1) * currentGridUnit,
        width: (endRow - startRow) * currentGridUnit,
        height: (endCol - startCol) * currentGridUnit,
      };
    }

    return {
      position: 'absolute' as const,
      left: (startCol - 1) * currentGridUnit,
      top: (startRow - 1) * currentGridUnit,
      width: (endCol - startCol) * currentGridUnit,
      height: (endRow - startRow) * currentGridUnit,
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
            <View style={styles.centeringContainer}>
              <View 
                style={[
                  styles.canvas, 
                  { 
                    width: canvasWidth, 
                    height: canvasHeight,
                    // REMOVED: CSS transform scale completely gone to fix cutoff bug!
                  }
                ]}
              >
                {/* Dynamic SVG Vector Grid Background */}
                <Svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <Pattern id="minorGrid" width={minorStep} height={minorStep} patternUnits="userSpaceOnUse">
                    <Path d={`M ${minorStep} 0 L 0 0 0 ${minorStep}`} fill="none" stroke="#d0d0d0" strokeWidth="0.5" />
                  </Pattern>
                  <Pattern id="majorGrid" width={majorStep} height={majorStep} patternUnits="userSpaceOnUse">
                    <Rect width={majorStep} height={majorStep} fill="url(#minorGrid)" />
                    <Path d={`M ${majorStep} 0 L 0 0 0 ${majorStep}`} fill="none" stroke="#888888" strokeWidth="1" />
                  </Pattern>
                  <Rect width="100%" height="100%" fill="url(#majorGrid)" />
                </Svg>

                {/* Plotted Content Shape Block */}
                <View style={[styles.rectangle, getRectangleStyle()]} />
              </View>
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
