import React from 'react'
import { Text, View } from 'react-native'

import { MAPBOX_API_TOKEN } from "@env"

import MapboxGL from '@react-native-mapbox-gl/maps'

import EmergencySlider from "Components/EmergencySlider"
import Location from "Components/Location"
import Metrics from "Components/Metrics"
import Navigation from "Components/Navigation"

const Map = () => {

	MapboxGL.setAccessToken(`${MAPBOX_API_TOKEN}`)
	MapboxGL.setTelemetryEnabled(false)

	return (
    <>
      {/* <MapboxGL.MapView style={{flex: 1}} /> */}
      <EmergencySlider />
    </>
	)
}

export default Map