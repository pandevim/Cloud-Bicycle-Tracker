import AppContext from "context/app-context.js"

import React, { useState, useEffect, useContext } from "react"
import { Text, View, StyleSheet } from "react-native"
import MapboxGL, { MapView, UserLocation, Camera } from "@react-native-mapbox-gl/maps"

import { limit, axios } from "utils"

import { MAPBOX_API_TOKEN } from "@env"
const ROOT_URL = "https://api.mapbox.com/geocoding/v5"
const SEARCH_ENDPOINT = "mapbox.places"

const Maps = (props) => {
  const { permissions, current, setCurrent } = useContext(AppContext)

  const { data: [setPath, setSpeed] } = { data: useState(0), ...(props.state || []) }
  const [movement, setMovement] = useState(false)

  useEffect(() => {
    MapboxGL.setAccessToken(`${MAPBOX_API_TOKEN}`)
    MapboxGL.setTelemetryEnabled(false)
  }, [permissions])

  useEffect(() => {
    axios.get(`${ROOT_URL}/${SEARCH_ENDPOINT}/${current.longitude},${current.latitude}.json?types=locality&access_token=${MAPBOX_API_TOKEN}`)
      .then(response => response.data.features[0])
      .then(({text, place_name}) => setCurrent({ ...current, street: text, location: place_name }))
      .catch(err => console.log(err))
  }, [current.latitude])

  const updateCoords = coords => {
    limit(10, execute => {
      setCurrent({...current, latitude: coords.latitude, longitude: coords.longitude})
      setSpeed(coords.speed)
      setPath(path => [...path, [coords.longitude, coords.latitude]])
    })
  }

	return (
    <View style={styles.container}>
  	{permissions && 
      <MapView
      	style={{flex: 1}}
      	styleURL={MapboxGL.StyleURL.Streets}
      	localizeLabels={true}>
          <UserLocation
            showsUserHeadingIndicator={true}
        		minDisplacement={5}
            onUpdate={({coords}) => updateCoords(coords)} />
    		<Camera
    			followUserLocation={true}
    			followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
    			zoomLevel={19} />
      </MapView>
    }
    </View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
})

export default Maps