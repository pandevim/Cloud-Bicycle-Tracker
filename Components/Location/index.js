import AppContext from "context/app-context.js"

import React, { useContext } from "react"
import { Text, View, StyleSheet } from "react-native"

import { round } from "utils"

const Location = () => {
  const { current } = useContext(AppContext)

  return (
    <View style={styles.container}>
      <View>
      	<Text style={styles.street}>{ current.street }</Text>
      </View>
      <View>
      	<Text style={styles.coordinates}>{round(current.latitude, 4)}° N, {round(current.longitude, 4)}° E</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  	margin: 10,
  	paddingTop: 5,
  	paddingBottom: 5
  },
  street: {
    fontWeight: 'bold',
    fontSize: 25
  },
  coordinates: {
    color: '#5E5F61',
    fontSize: 13
  }
})

export default Location