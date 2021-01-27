import React, { useState, useEffect, useCallback } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Icon } from "constants"

const ProfileDrawerItem = () => {

  const [info, setInfo] = useState(null)

  const getInfo = useCallback(async () => {
    try {
      const info = await AsyncStorage.getItem('@info')
      setInfo(info != null ? JSON.parse(info) : null)
    } catch(e) { console.error(e) }
  }, [])

  useEffect(() => {
    getInfo()
  }, [getInfo])

  return (
  	<View style={styles.container}>
  		<View style={styles.profile}>
  			<Icon.Person color={"#66717E"} size={60} />
  		</View>
  		<View style={styles.name}>
      {
        (info)
          ? <Text>{info.user.displayName}</Text>
  			  : <Text style={{color: "#ec4e20"}}>Sign In</Text>
      }
  		</View>
  	</View>
  )
}

export default ProfileDrawerItem

const styles = StyleSheet.create({
  container: {
  	display: "flex",
  	flexDirection: "row",
  	justifyContent: "space-evenly",
  	alignItems: "center"
  },
  profile: {
  	flex: 1
  },
  name: {
  	flex: 2,
  	color: "red"
  }
})