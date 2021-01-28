import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { EmergencySlider, Location, Metrics, Navigation } from "Components"
import { Maps } from "Views"

const Home = () => {
  return (
  	<View style={styles.container}>
      {/* <Maps /> */}
      <View style={styles.main}>
        <Metrics />
        <View style={styles.info}>
          <View style={styles.navigation}>
            <Location />
            <Navigation />
          </View>
          <EmergencySlider />
        </View>
      </View>
  	</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  main: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%",
    width: "100%"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 5,
  },
  navigation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})

export default Home