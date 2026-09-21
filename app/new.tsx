import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {smia} from '../styles/styles.new';

export default function New() {
  return (
    <View style={smia.container}>
        <View style={smia.header}>
          <View style={smia.navLinksContainer}>
            <TouchableOpacity style={smia.navLink}>
              <Text style={smia.navLinkText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={smia.navLink}>
              <Text style={smia.navLinkText}>About</Text>
            </TouchableOpacity>

            <TouchableOpacity style={smia.navLink}>
              <Text style={smia.navLinkText}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity style={smia.navLink}>
              <Text style={smia.navLinkText}>Configure</Text>
            </TouchableOpacity>       
          </View>

        </View> 

        <View style={[smia.box, smia.box1]}>
          <Text>Test</Text>
        </View>
        <View style={[smia.box, smia.box2]}></View>
        <View style={[smia.box, smia.box3]}></View>
    </View>
  )
}

