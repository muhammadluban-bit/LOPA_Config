import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, Pattern, Path, Rect, G, Text as SvgText, TSpan, Line } from "react-native-svg";

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
  isMobile,
  rulerHeight, 
  width, 
  height = '100%',
  zoom = 1 
}: GridProps) {

  const numericWidth = Number(width);
  const numericHeight = Number(height);

  // 20 small squares * 5px = 100px base distance between each 100 STA marker
  const pxPerMarker = 100; 
  const staIncrement = 100;

  // Calculate how many markers fit along the active long axis
  const totalLengthForRuler = isMobile ? numericHeight / zoom : numericWidth / zoom;
  const numberOfMarkers = Math.ceil(totalLengthForRuler / pxPerMarker);
  
  const markers = Array.from({ length: numberOfMarkers + 1 }, (_, i) => ({
    coord: i * pxPerMarker,
    label: `STA ${i * staIncrement}`
  }));

  return (
    <View style={[styles.gridContainer, { width: numericWidth, height: numericHeight, alignSelf: 'flex-start' }]}>
      <Svg style={styles.svgOverlay} width={numericWidth} height={numericHeight}>
        <Defs>
          <Pattern id="minorGrid" width={5} height={5} patternUnits="userSpaceOnUse">
            <Path d="M 5 0 L 0 0 0 5" fill="none" stroke="#d0d0d0" strokeWidth="0.5" />
          </Pattern>
          
          <Pattern id="majorGrid" width={25} height={25} patternUnits="userSpaceOnUse">
            <Rect width={25} height={25} fill="url(#minorGrid)" />
            <Path d="M 25 0 L 0 0 0 25" fill="none" stroke="#888888" strokeWidth="1" />
          </Pattern>
        </Defs>

        {/* Dynamic Zoom Wrapper */}
        <G transform={`scale(${zoom})`}>
          
          {/* DESKTOP VIEW (Horizontal Ruler at the top) */}
          {!isMobile && (
            <G>
              {/* Ruler Background */}
              <Rect x={0} y={0} width={numericWidth / zoom} height={rulerHeight} fill="#f0f4f8" />
              <Line x1={0} y1={rulerHeight} x2={numericWidth / zoom} y2={rulerHeight} stroke="#7f84b4" strokeWidth={1} />
              
              {/* Grid content shifted down past rulerHeight */}
              <G transform={`translate(0, ${rulerHeight})`}>
                <Rect width={numericWidth / zoom} height={(numericHeight / zoom) - rulerHeight} fill="url(#majorGrid)" />
              </G>

              {/* Ruler Ticks & Labels */}
              {markers.map((marker, index) => (
                <G key={index} transform={`translate(${marker.coord}, 0)`}>
                  <Line x1={0} y1={0} x2={0} y2={rulerHeight} stroke="#333333" strokeWidth={1} />
                  <SvgText
                    x={5}
                    y={rulerHeight - 8}
                    fontSize={11}
                    fill="#444444"
                    fontFamily="Segoe UI"
                    fontWeight="bold"
                  >
                    {marker.label}
                  </SvgText>
                </G>
              ))}
            </G>
          )}

          {/* MOBILE VIEW (Vertical Ruler on the left with wrapped text) */}
          {isMobile && (
            <G>
              {/* Ruler Background */}
              <Rect x={0} y={0} width={rulerHeight} height={numericHeight / zoom} fill="#f0f4f8" />
              <Line x1={rulerHeight} y1={0} x2={rulerHeight} y2={numericHeight / zoom} stroke="#7f84b4" strokeWidth={1} />
              
              {/* Grid content shifted right past rulerHeight */}
              <G transform={`translate(${rulerHeight}, 0)`}>
                <Rect width={(numericWidth / zoom) - rulerHeight} height={numericHeight / zoom} fill="url(#majorGrid)" />
              </G>

              {/* Ruler Ticks & Labels */}
              {markers.map((marker, index) => {
                // Split "STA 100" into ["STA", "100"]
                const [textPart, numberPart] = marker.label.split(' ');

                return (
                  <G key={index} transform={`translate(0, ${marker.coord})`}>
                    {/* Tick line across the ruler width */}
                    <Line x1={0} y1={0} x2={rulerHeight} y2={0} stroke="#333333" strokeWidth={1} />
                    
                    {/* 
                      Wrapped Layout: Centered horizontally using textAnchor="middle" 
                      and broken vertically using TSpan components.
                    */}
                    <SvgText
                      x={rulerHeight / 2}
                      y={14}
                      fontSize={10}
                      fill="#444444"
                      fontFamily="Segoe UI"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      <TSpan x={rulerHeight / 2} dy="0">{textPart}</TSpan>
                      <TSpan x={rulerHeight / 2} dy="12">{numberPart}</TSpan>
                    </SvgText>
                  </G>
                );
              })}
            </G>
          )}
          
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
    width: '100%',
    height: '100%',
  }
});

export default React.memo(Grid);
