import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import AppContext from "context/app-context.js"
import { Icon } from "constants"

const Navigation = () => {
  const { toggleNavigation } = useContext(AppContext)

  const [bgColor, setBgColor] = useState("#1873FF")
  const [txtColor, setTxtColor] = useState("white")
  const [bdrColor, setBdrColor] = useState("#1873FF")

  const [title, setTitle] = useState("Start")
  const [journey, setJourney] = useState(false)
  
  const toggle = () => {}
  return (
  	<TouchableOpacity onPress={toggle}>
	    <View style={{...styles.container, backgroundColor: bgColor, borderColor: bdrColor}}>
	    	{ journey ? <Icon.Check style={styles.icon} /> : <Icon.Navigation style={styles.icon} />}
	      <Text style={{...styles.title, color: txtColor}}>{title}</Text>
	    </View>
  	</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
  	display: "flex",
  	flexDirection: "row",
    justifyContent: 'space-around',

    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,

    borderRadius: 25,
    borderWidth: 2    
  },
  title: {
  	fontWeight: "bold"
  },
  icon: {
    width: 20,
    height: 20,
    color: "white"
  }
})

export default Navigation