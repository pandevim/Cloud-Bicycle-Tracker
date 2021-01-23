import React from 'react'
import { Text, View, Button } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'

import { Maps } from "Views"

const Stack = createStackNavigator()
const Home = ({ navigation }) => {
  return (
  	<>
	    <Maps />
  	</>
  )
}

export default Home