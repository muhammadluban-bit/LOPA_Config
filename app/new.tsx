import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import {smia} from '../styles/styles.new';
import Grid from '../components/Grid';


export default function New() {
  const {width} = useWindowDimensions();
  const isMobile = width < 768;
  const stilo = smia(isMobile); //smia styling is therefore replaced by 'stilo'

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

        <View style={[stilo.box, stilo.box1]}>
          <Text>smia.box1</Text>
          <View style={stilo.grid}>
            <Grid isMobile={isMobile} minorStep={5} majorStep={25} rulerHeight={0} />
          </View>
        </View>
        <View style={[stilo.box, stilo.box2]}>
          <Text>smia/stilo.box2</Text>
        </View>
    </View>
  )
}

