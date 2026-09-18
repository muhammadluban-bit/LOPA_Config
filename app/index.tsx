import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Pressable, useWindowDimensions } from "react-native";
import Svg, { Pattern, Path, Rect, Line } from "react-native-svg";
import { styles } from "../styles/styles";
import { Link } from 'expo-router';


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
const DESKTOP_COLS = 1300; // Fuselage length representation
const DESKTOP_ROWS = 190;
const RULER_HEIGHT = 30; // Height allocated for the top STA ruler

export default function HomeScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const [zoom, setZoom] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Hover tracking states
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [currentSTA, setCurrentSTA] = useState<number | null>(null);

  useEffect(() => {
    setIsMobile(windowWidth <= 768);
  }, [windowWidth]);

  useEffect(() => {
    setZoom(isMobile ? 0.8 : 1);
  }, [isMobile]);

  const zoomIn = () => setZoom(z => Math.min(z * 1.2, 5));
  const zoomOut = () => setZoom(z => Math.max(z / 1.2, 0.2));
  const handleReset = () => setZoom(isMobile ? 0.8 : 1);

  const currentGridUnit = BASE_GRID_UNIT * zoom;
  const minorStep = 5 * zoom;
  const majorStep = 25 * zoom;

  // Layout bounds including space for the top ruler grid
  const canvasWidth = (isMobile ? DESKTOP_ROWS : DESKTOP_COLS) * currentGridUnit;
  const canvasHeight = ((isMobile ? DESKTOP_COLS : DESKTOP_ROWS) * currentGridUnit) + RULER_HEIGHT;

  const getRectangleStyle = () => {
    let startCol = RECTANGLE_COORDS.colStart;
    let endCol = RECTANGLE_COORDS.colEnd;
    let startRow = RECTANGLE_COORDS.rowStart;
    let endRow = RECTANGLE_COORDS.rowEnd;

    if (isMobile) {
      return {
        position: 'absolute' as const,
        left: (startRow - 1) * currentGridUnit,
        top: (startCol - 1) * currentGridUnit + RULER_HEIGHT,
        width: (endRow - startRow) * currentGridUnit,
        height: (endCol - startCol) * currentGridUnit,
      };
    }

    return {
      position: 'absolute' as const,
      left: (startCol - 1) * currentGridUnit,
      top: (startRow - 1) * currentGridUnit + RULER_HEIGHT,
      width: (endCol - startCol) * currentGridUnit,
      height: (endRow - startRow) * currentGridUnit,
    };
  };

  // Tracks cursor and calculates current continuous STA position
  const handlePointerMove = (e: any) => {
    const nativeEvent = e.nativeEvent;
    if (!nativeEvent) return;

    // Get cursor position relative to canvas container
    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;

    setHoverPos({ x, y });

    // 1 Column = 2 inches. Compute exact horizontal frame location based on active orientation mode
    if (isMobile) {
      const activeGridY = y - RULER_HEIGHT;
      if (activeGridY >= 0) {
        const calculatedColumn = Math.floor(activeGridY / currentGridUnit) + 1;
        setCurrentSTA(calculatedColumn * 2);
      }
    } else {
      const calculatedColumn = Math.floor(x / currentGridUnit) + 1;
      setCurrentSTA(calculatedColumn * 2);
    }
  };

  const handlePointerLeave = () => {
    setHoverPos(null);
    setCurrentSTA(null);
  };

  // Dynamically generates clean tick markers across the ruler view frame
  const renderRulerTicks = () => {
    const ticks = [];
    const stepSize = 50; // Place a numerical text tick every 50 columns (100 inches)
    const limit = isMobile ? DESKTOP_ROWS : DESKTOP_COLS;

    for (let i = 0; i <= limit; i += stepSize) {
      const position = i * currentGridUnit;
      const staLabel = i * 2; // Converts grid ticks directly to absolute aircraft layout inches

      ticks.push(
        <View 
          key={i} 
          style={[
            isMobile ? styles.rulerTickMobile : styles.rulerTickHorizontal,
            { [isMobile ? 'top' : 'left']: position }
          ]}
        >
          <Text style={styles.rulerText}>STA {staLabel}</Text>
        </View>
      );
    }
    return ticks;
  };

  return (
    <View style={styles.app}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>A320 LOPA Configurator</Text>
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
                /* @ts-ignore - native pointer event bindings for web routing engines */
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                style={[
                  styles.canvas, 
                  { 
                    width: canvasWidth, 
                    height: canvasHeight,
                  }
                ]}
              >
                {/* Top STA Ruler Header Zone */}
                <View style={isMobile ? styles.rulerContainerMobile : styles.rulerContainerHorizontal}>
                  {renderRulerTicks()}
                </View>

                {/* Dynamic SVG Vector Grid Background */}
                <Svg style={{ position: 'absolute', top: RULER_HEIGHT, left: 0, width: '100%', height: '100%' }}>
                  <Pattern id="minorGrid" width={minorStep} height={minorStep} patternUnits="userSpaceOnUse">
                    <Path d={`M ${minorStep} 0 L 0 0 0 ${minorStep}`} fill="none" stroke="#d0d0d0" strokeWidth="0.5" />
                  </Pattern>
                  <Pattern id="majorGrid" width={majorStep} height={majorStep} patternUnits="userSpaceOnUse">
                    <Rect width={majorStep} height={majorStep} fill="url(#minorGrid)" />
                    <Path d={`M ${majorStep} 0 L 0 0 0 ${majorStep}`} fill="none" stroke="#888888" strokeWidth="1" />
                  </Pattern>
                  <Rect width="100%" height="100%" fill="url(#majorGrid)" />

                  {/* Realtime Interactive Crosshair Tracking Line overlay */}
                  {hoverPos && (
                    <Line
                      x1={isMobile ? 0 : hoverPos.x}
                      y1={isMobile ? hoverPos.y - RULER_HEIGHT : 0}
                      x2={isMobile ? '100%' : hoverPos.x}
                      y2={isMobile ? hoverPos.y - RULER_HEIGHT : '100%'}
                      stroke="#e74c3c"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                  )}
                </Svg>

                {/* Plotted Content Shape Block */}
                <View style={[styles.rectangle, getRectangleStyle()]} />
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>

      <View style={styles.configurator}>
        <Text style={styles.configuratorTitle}>Configurator Dashboard</Text>
        <Text style={styles.configuratorText}>
          {currentSTA !== null ? `Hovering Coordinate: STA ${currentSTA} in.` : "Hover inside the fuselage matrix to parse positions."}
        </Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>
            Static Coords: Columns ({RECTANGLE_COORDS.colStart}-{RECTANGLE_COORDS.colEnd}) | Rows ({RECTANGLE_COORDS.rowStart}-{RECTANGLE_COORDS.rowEnd})
          </Text>
          <Link href="/new" asChild>
            <Pressable>
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Go to New Page</Text>
            </Pressable>
         </Link>
        </View>
      </View>
    </View>
  );
}
