import AppContext from "context/app-context.js"

import React, { useContext } from "react"
import { Text, View, StyleSheet } from "react-native"

import { round } from "utils"

const Location = () => {

  const { current } = useContext(AppContext)

  return (
    <View style={styles.container}>
      <View style={styles.street}>
      	<Text style={{fontWeight: 'bold', fontSize: 25}}>{ current.street }</Text>
      </View>
      <View style={styles.coordinates}>
      	<Text style={{color: '#5E5F61', fontSize: 13}}>{round(current.latitude, 4)}° N, {round(current.longitude, 4)}° E</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  	margin: 10,
  	paddingTop: 5,
  	paddingBottom: 5
  }
})

export default Location