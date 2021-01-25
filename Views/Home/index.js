import React from 'react'
import { Text, View, Button } from 'react-native'

import { Maps } from "Views"
import { Icon } from "constants"

import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

const Home = ({ navigation }) => {
  return (
  	<>
  		<Icon.DirectionsBike />
  		<Icon.ElectricBike />
  		<Icon.ErrorOutline />
  		<Icon.Menu />
  		<Icon.Schedule />
  		<Icon.Road />
  		<Icon.Add />
  		<Icon.Navigation />
  		<Icon.Check />
	    <Maps />
  	</>
  )
}

export default Home