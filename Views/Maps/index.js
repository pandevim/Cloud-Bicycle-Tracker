import React from 'react'
import { Text, View } from 'react-native'

import { MAPBOX_API_TOKEN } from "@env"

import MapboxGL from '@react-native-mapbox-gl/maps'

import { EmergencySlider, Location, Metrics, Navigation } from "Components"

const Maps = ({ navigation }) => {

	MapboxGL.setAccessToken(`${MAPBOX_API_TOKEN}`)
	MapboxGL.setTelemetryEnabled(false)

	return (
    <>
      { /*<MapboxGL.MapView style={{flex: 1}} /> */}
      <Metrics />
      <Location />
      <Navigation />
      <EmergencySlider />
    </>
	)
}

export default Maps