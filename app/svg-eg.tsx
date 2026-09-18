import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, { G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg'

export default function New() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOPA Blueprint Asset Preview</Text>
      
      {/* Container frame hosting our dynamic vector seat component block */}
      <View style={styles.previewCard}>
        <Svg width="180" height="70" viewBox="0 0 180 70" fill="none">
          <Defs>
            {/* The Shading Blueprint: Defines a soft lighting reflection vector matrix */}
            <LinearGradient id="seatCushionShading" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#7ba3d1" />     {/* Darker upper structural fold */}
              <Stop offset="25%" stopColor="#ffffff" stopOpacity={0.35} /> {/* Soft light reflection edge */}
              <Stop offset="55%" stopColor="#4a7eb0" />     {/* Base cushion body tone */}
              <Stop offset="100%" stopColor="#2c5680" />    {/* Bottom ambient occlusion depth drop */}
            </LinearGradient>
            
            {/* Armrest Shading: Gives a distinct rounded plastic/leather profile appearance */}
            <LinearGradient id="armrestShading" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="#7f8c8d" />
              <Stop offset="50%" stopColor="#bdc3c7" />
              <Stop offset="100%" stopColor="#95a5a6" />
            </LinearGradient>
          </Defs>

          {/* LAYER 1: Shared Structural Seat Backframe Shell Chassis */}
          <Rect x="2" y="2" width="176" height="66" rx="8" fill="#2c3e50" opacity="0.15" />
          <Rect x="4" y="4" width="172" height="62" rx="6" fill="#34495e" stroke="#2c3e50" strokeWidth="1.5" />

          {/* LAYER 2: SEAT A (Left Window/Aisle Window Node Cushion) */}
          <G id="Seat-A">
            {/* Main bottom cushion pad */}
            <Rect x="10" y="12" width="46" height="48" rx="6" fill="url(#seatCushionShading)" />
            {/* Upper headrest/backrest boundary cushion frame overlap */}
            <Rect x="14" y="8" width="38" height="8" rx="2" fill="#2c5680" opacity="0.4" />
          </G>

          {/* LAYER 3: SEAT B (Middle Seat Cushion) */}
          <G id="Seat-B">
            <Rect x="67" y="12" width="46" height="48" rx="6" fill="url(#seatCushionShading)" />
            <Rect x="71" y="8" width="38" height="8" rx="2" fill="#2c5680" opacity="0.4" />
          </G>

          {/* LAYER 4: SEAT C (Right Window/Aisle Seat Cushion) */}
          <G id="Seat-C">
            <Rect x="124" y="12" width="46" height="48" rx="6" fill="url(#seatCushionShading)" />
            <Rect x="128" y="8" width="38" height="8" rx="2" fill="#2c5680" opacity="0.4" />
          </G>

          {/* LAYER 5 (Top Overlay): The Shared Seat Partition Armrests */}
          <G id="Armrests" fill="url(#armrestShading)">
            <Rect x="4" y="16" width="6" height="34" rx="2" />   {/* Far Left Armrest */}
            <Rect x="59" y="16" width="8" height="34" rx="2" />  {/* Intermediate Console Split 1 */}
            <Rect x="116" y="16" width="8" height="34" rx="2" /> {/* Intermediate Console Split 2 */}
            <Rect x="170" y="16" width="6" height="34" rx="2" />  {/* Far Right Armrest */}
          </G>
        </Svg>
      </View>

      <Text style={styles.subtitle}>
        Open this page via your app navigation Link to view the high-fidelity render.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 24,
  },
  previewCard: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 16,
    // Soft standard component drop shadows for clean workspace presentation UI
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
})
