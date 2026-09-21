import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {smia} from '../styles/styles.new';

export default function New() {
  return (
    <View style={smia.container}>
        <View style={smia.header}>
          <Text style={smia.headerText}>Home</Text>
          <Text style={smia.headerText}>About</Text>
          <Text style={smia.headerText}>Navigation</Text>
          <Text style={smia.headerText}>Submit</Text>
        </View> 

        <View style={[smia.box, smia.box1]}>
          <Text>Test</Text>
        </View>
        <View style={[smia.box, smia.box2]}></View>
        <View style={[smia.box, smia.box3]}></View>
    </View>
  )
}

