import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { EmergencySlider, Location, Metrics, Navigation } from "Components"
import { Maps } from "Views"

const Home = ({ navigation }) => {
  return (
  	<>
  		<Maps />
      <Metrics />
      <Location />
      <Navigation />
      <EmergencySlider />
  	</>
  )
}

export default Home