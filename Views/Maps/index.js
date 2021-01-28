import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { MAPBOX_API_TOKEN } from "@env"

import MapboxGL, { MapView, UserLocation, Camera } from '@react-native-mapbox-gl/maps'
import AppContext from "context/app-context.js"

const Maps = ({ navigation }) => {

  const { permissions } = useContext(AppContext)

	MapboxGL.setAccessToken(`${MAPBOX_API_TOKEN}`)
	MapboxGL.setTelemetryEnabled(false)

	return (
    <View style={styles.container}>
      <MapView
      	style={{flex: 1}}
      	styleURL={MapboxGL.StyleURL.Streets}
      	localizeLabels={true}>
      	<UserLocation
      		minDisplacement={1} />
    		<Camera
    			followUserLocation={true}
    			followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
    			zoomLevel={18} />
      </MapView>
    </View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: 'pink'
  }
})

export default Maps