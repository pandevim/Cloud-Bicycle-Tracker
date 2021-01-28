import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import AppContext from "context/app-context.js"

import { Icon } from "constants"

const ProfileDrawerItem = () => {

  const { userInfo } = useContext(AppContext)
  console.log(userInfo)

  return (
  	<View style={styles.container}>
  		<View style={styles.profile}>
  			<Icon.Person color={"#66717E"} size={60} />
  		</View>
  		<View style={styles.name}>
      {
        (userInfo)
          ? <Text>{userInfo.name}</Text>
  			  : <Text style={{color: "#1873FF"}}>Sign In</Text>
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