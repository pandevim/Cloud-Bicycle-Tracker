import React, { useState, useEffect, useContext } from "react"
import { Text, View, StyleSheet } from "react-native"

import { Icon } from "constants"

const ProfileDrawerItem = () => {
  return (
  	<View style={styles.container}>
  		<View style={styles.profile}>
  			<Icon.Person color={"#1873FF"} size={60} />
  		</View>
  		<View style={styles.name}>
        <Text>Profile</Text>
  		</View>
  	</View>
  )
}

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

export default ProfileDrawerItem