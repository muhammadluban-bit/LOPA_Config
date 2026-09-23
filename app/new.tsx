import { Pressable, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, ScrollView } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import {smia} from '../styles/styles.new';
import Grid from '../components/Grid';

export default function New() {
  const {width} = useWindowDimensions();
  const isMobile = width < 768;
  const stilo = smia(isMobile); 

  const BASE_GRID_UNIT = 1;
  const DESKTOP_COLS = 1491; 
  const DESKTOP_ROWS = 190;
  const RULER_HEIGHT = 30; 

  const [zoom, setZoom] = useState<number>(1);

  const zoomIn = () => setZoom(z => Math.min(z * 1.2, 5));
  const zoomOut = () => setZoom(z => Math.max(z / 1.2, 0.2));
  const handleReset = () => setZoom(1);

  const currentGridUnit = useMemo(() => BASE_GRID_UNIT * zoom, [zoom]);

  // Cleaned up: minorStep and majorStep are removed since Grid handles them internally now.

  const canvasWidth = useMemo(() => 
    (isMobile ? DESKTOP_ROWS : DESKTOP_COLS) * currentGridUnit, 
    [isMobile, currentGridUnit]
  );

  const canvasHeight = useMemo(() => 
    ((isMobile ? DESKTOP_COLS : DESKTOP_ROWS) * currentGridUnit) + RULER_HEIGHT, 
    [isMobile, currentGridUnit]
  );

  return (
    <View style={stilo.container}>
        <View style={stilo.header}>
          <View style={stilo.navLinksContainer}>
            <View style={stilo.logoPlaceholder}></View>

            <TouchableOpacity style={stilo.navLink}>
              <Text style={stilo.navLinkText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={stilo.navLink}>
              <Text style={stilo.navLinkText}>About</Text>
            </TouchableOpacity>

            <TouchableOpacity style={stilo.navLink}>
              <Text style={stilo.navLinkText}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity style={stilo.navLink}>
              <Text style={stilo.navLinkText}>Configure</Text>
            </TouchableOpacity>       
          </View>
        </View> 

        <View style={[stilo.box, stilo.box1, { overflow: 'hidden' }]}>
          <Text>smia.box1</Text>
          <View style={stilo.controls}> 
            <Pressable style={stilo.button} onPress={zoomIn}>
              <Text style={stilo.buttonText}>+</Text>
            </Pressable>
            <Pressable style={stilo.button} onPress={zoomOut}>
              <Text style={stilo.buttonText}>-</Text>
            </Pressable>
            <Pressable style={stilo.button} onPress={handleReset}>
              <Text style={stilo.buttonText}>Reset</Text>
            </Pressable>
          </View>
          
          <ScrollView 
            style={stilo.verticalScroll} 
            contentContainerStyle={stilo.scrollContent}
          >
            <ScrollView 
              horizontal={true} 
              style={stilo.horizontalScroll}
              contentContainerStyle={stilo.scrollContent}
            >
              <Grid 
                isMobile={isMobile} 
                rulerHeight={RULER_HEIGHT} 
                width={canvasWidth} 
                height={canvasHeight} 
                zoom={zoom} 
              />
            </ScrollView>
          </ScrollView>
        </View>
        
        <View style={[stilo.box, stilo.box2]}>
          <Text>smia/stilo.box2</Text>
        </View>
    </View>
  )
}
