// ==========================================
// SNIPPET 1: BATCH SPACING EDITOR COMPONENT
// ==========================================
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

interface BatchEditorProps {
  selectedCols: number[];
  value: string;
  onChangeText: (text: string) => void;
  onApply: () => void;
  onClearSelection: () => void;
}

function BatchSpacingEditor({ selectedCols, value, onChangeText, onApply, onClearSelection }: BatchEditorProps) {
  if (selectedCols.length === 0) return null;

  // Format the list of active column names cleanly for display (e.g. "C1, C2")
  const columnLabels = selectedCols.map(idx => `C${idx + 1}`).join(', ');

  return (
    <View style={editorStyles.editorOverlay}>
      <Text style={editorStyles.editorText}>Selected: {columnLabels}</Text>
      <View style={editorStyles.editorRow}>
        <TextInput 
          style={editorStyles.editorInput} 
          value={value} 
          placeholder="Gap px"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric" 
          onChangeText={onChangeText} 
        />
        <TouchableOpacity style={editorStyles.saveButton} onPress={onApply}>
          <Text style={editorStyles.buttonText}>Apply to All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[editorStyles.saveButton, { backgroundColor: '#64748b' }]} onPress={onClearSelection}>
          <Text style={editorStyles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const editorStyles = StyleSheet.create({
  editorOverlay: { position: 'absolute', top: 10, left: '10%', right: '10%', backgroundColor: '#1e293b', padding: 12, borderRadius: 8, zIndex: 999, alignItems: 'center', borderWidth: 1, borderColor: '#475569' },
  editorText: { color: '#fff', marginBottom: 8, fontSize: 13, fontWeight: 'bold' },
  editorRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  editorInput: { backgroundColor: '#fff', borderRadius: 4, paddingHorizontal: 12, paddingVertical: 4, width: 90, textAlign: 'center', color: '#000' },
  saveButton: { backgroundColor: '#22c55e', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});
// ==========================================
// SNIPPET 2: BATCH SELECTION WORKSPACE ENGINE
// ==========================================
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

const GRID_SIZE = 20; 
const ASSET_SIZE = 50; 
const HEADER_HEIGHT = 30;
const PADDING_SIZE = 8;

function ManualSpacingContainer({ initialX, initialY }: { initialX: number; initialY: number }) {
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);
  const width = useSharedValue(540);
  const contextW = useSharedValue(0);

  const [currentWidth, setCurrentWidth] = useState(540);
  const [toggledSlots, setToggledSlots] = useState<Record<string, boolean>>({});
  const [defaultGap] = useState<number>(8);
  
  // Custom spacing parameters map
  const [customColumnGaps, setCustomColumnGaps] = useState<Record<number, number>>({ 1: 30, 3: 50 });

  // State arrays managing multiple selection indexes
  const [selectedCols, setSelectedCols] = useState<number[]>([]);
  const [tempGapValue, setTempGapValue] = useState<string>('');

  const snapToGrid = (val: number) => { 'worklet'; return Math.round(val / GRID_SIZE) * GRID_SIZE; };

  const dragGesture = Gesture.Pan()
    .onStart(() => { contextX.value = translateX.value; contextY.value = translateY.value; })
    .onUpdate((e) => { translateX.value = contextX.value + e.translationX; translateY.value = contextY.value + e.translationY; })
    .onEnd(() => { translateX.value = withSpring(snapToGrid(translateX.value)); translateY.value = withSpring(snapToGrid(translateY.value)); });

  const resizeGesture = Gesture.Pan()
    .onStart(() => { contextW.value = width.value; })
    .onUpdate((e) => { width.value = Math.max(160, contextW.value + e.translationX); })
    .onEnd(() => { width.value = withSpring(snapToGrid(width.value), {}, () => { runOnJS(setCurrentWidth)(width.value); }); });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    width: width.value,
  }));

  // Dynamic layout constraint parsing bounds
  const availableWidth = currentWidth - (PADDING_SIZE * 2);
  let accumulatedWidth = 0, colsCount = 0;
  while (accumulatedWidth + ASSET_SIZE <= availableWidth) {
    accumulatedWidth += ASSET_SIZE + (customColumnGaps[colsCount] ?? defaultGap);
    colsCount++;
  }
  const totalCols = Math.max(1, colsCount);

  // High level multi-select controller toggle logic
  const handleColumnIndicatorPress = (colIdx: number) => {
    setSelectedCols(prev => 
      prev.includes(colIdx) ? prev.filter(idx => idx !== colIdx) : [...prev, colIdx].sort((a, b) => a - b)
    );
  };

  const applyBatchSpacing = () => {
    const numericValue = Math.max(0, Number(tempGapValue) || 0);
    setCustomColumnGaps(prev => {
      const updated = { ...prev };
      selectedCols.forEach(idx => {
        updated[idx] = numericValue;
      });
      return updated;
    });
    setSelectedCols([]);
    setTempGapValue('');
  };

  return (
    <View style={{ flex: 1 }}>
      <BatchSpacingEditor 
        selectedCols={selectedCols} value={tempGapValue} onChangeText={setTempGapValue}
        onClearSelection={() => { setSelectedCols([]); setTempGapValue(''); }}
        onApply={applyBatchSpacing}
      />

      <Animated.View style={[containerStyles.boxContainer, containerStyle]}>
        <GestureDetector gesture={dragGesture}>
          <View style={containerStyles.dragHeader}><Text style={containerStyles.headerText}>Hold to Drag (Tap headers to select multiple)</Text></View>
        </GestureDetector>

        <View style={containerStyles.contentGrid}>
          {/* Header Row: Multi-Select Columns Indicators */}
          <View style={containerStyles.rowWrapper}>
            {Array.from({ length: totalCols }).map((_, cIdx) => {
              const isSelected = selectedCols.includes(cIdx);
              const rightMargin = customColumnGaps[cIdx] ?? defaultGap;
              return (
                <TouchableOpacity 
                  key={`sel-${cIdx}`} 
                  style={[
                    containerStyles.colIndicator, 
                    { marginRight: rightMargin },
                    isSelected && containerStyles.colIndicatorSelected
                  ]} 
                  onPress={() => handleColumnIndicatorPress(cIdx)}
                >
                  <Text style={[containerStyles.indicatorText, isSelected && containerStyles.indicatorTextSelected]}>
                    C{cIdx + 1}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Render Active Core Template Container Asset Grid Matrix */}
          {Array.from({ length: 3 }).map((_, rIdx) => (
            <View key={`row-${rIdx}`} style={containerStyles.rowWrapper}>
              {Array.from({ length: totalCols }).map((_, cIdx) => {
                const key = `${rIdx}-${cIdx}`, isDeleted = toggledSlots[key];
                const rightMargin = customColumnGaps[cIdx] ?? defaultGap;
                return (
                  <TouchableOpacity key={key} activeOpacity={0.7} style={[containerStyles.assetSlot, { marginRight: rightMargin }, isDeleted && containerStyles.assetSlotEmpty]} onPress={() => setToggledSlots(p => ({ ...p, [key]: !p[key] }))}>
                    {isDeleted ? <Text style={containerStyles.addText}>+</Text> : <Text style={containerStyles.assetText}>📦</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
        <GestureDetector gesture={resizeGesture}><View style={containerStyles.resizeHandleRight} /></GestureDetector>
      </Animated.View>
    </View>
  );
}

const containerStyles = StyleSheet.create({
  boxContainer: { position: 'absolute', backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', paddingBottom: PADDING_SIZE, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  dragHeader: { height: HEADER_HEIGHT, backgroundColor: '#6366f1', borderTopLeftRadius: 11, borderTopRightRadius: 11, alignItems: 'center', justifyContent: 'center' },
  headerText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  contentGrid: { padding: PADDING_SIZE, flexDirection: 'column', gap: 8 },
  rowWrapper: { flexDirection: 'row' },
  colIndicator: { width: ASSET_SIZE, height: 20, backgroundColor: '#f1f5f9', borderRadius: 4, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#cbd5e1' },
  colIndicatorSelected: { backgroundColor: '#6366f1', borderColor: '#4f46e5' },
  indicatorText: { fontSize: 10, fontWeight: 'bold', color: '#64748b' },
  indicatorTextSelected: { color: '#fff' },
  assetSlot: { width: ASSET_SIZE, height: ASSET_SIZE, backgroundColor: '#e0e7ff', borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#818cf8' },
  assetSlotEmpty: { backgroundColor: '#f1f5f9', borderColor: '#cbd5e1', borderStyle: 'dashed' },
  assetText: { fontSize: 18 },
  addText: { fontSize: 18, color: '#94a3b8', fontWeight: '600' },
  resizeHandleRight: { position: 'absolute', right: 0, top: HEADER_HEIGHT, bottom: 0, width: 12, backgroundColor: '#475569', borderTopLeftRadius: 4, borderBottomRightRadius: 11, opacity: 0.8 }
});
// ==========================================
// SNIPPET 3: SCREEN DISPLAY ENTRY COMPONENT
// ==========================================
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function CanvasScreen() {
  return (
    <GestureHandlerRootView style={screenStyles.container}>
      <View style={screenStyles.canvas}>
        <View style={[StyleSheet.absoluteFill, screenStyles.gridBackground]} />
        <ManualSpacingContainer initialX={40} initialY={40} />
      </View>
    </GestureHandlerRootView>
  );
}

const screenStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e24' },
  canvas: { flex: 1, position: 'relative' },
  gridBackground: { backgroundColor: '#f4f4f6', opacity: 0.3 }
});
