import React, { useState } from "react"
import { View, StyleSheet } from "react-native"

import { EmergencySlider, Location, Metrics, Navigation } from "Components"
import { Maps } from "Views"

const Home = () => {
  const [path, setPath] = useState([])
  const [speed, setSpeed] = useState(0)

  return (
  	<View style={styles.container}>
      <Maps state={{ data: [setPath, setSpeed] }} />
      <View style={styles.main}>
        <Metrics state={{ data: [path, speed] }} />
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
    paddingLeft: 20,
    paddingRight: 20,
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