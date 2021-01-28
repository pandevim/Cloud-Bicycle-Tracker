import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import AppContext from "context/app-context.js"
import { Icon } from "constants"

const Navigation = () => {
  const { toggleNavigation } = useContext(AppContext)

  const [journey, setJourney] = useState(false)

  const [text, setText] = useState()
  const [txtColor, setTxtColor] = useState()
  const [bgColor, setBgColor] = useState()
  const [bdrColor, setBdrColor] = useState()
  const [iconColor, setIconColor] = useState()

  useEffect(() => {
  	setText(journey?"Done":"Start")
  	setIconColor(journey?"#D9F0DC":"white")
  	setTxtColor(journey?"rgba(0, 0, 0, 0.3)":"white")
  	setBgColor(journey?"rgba(255, 255, 255, 0.8)":"#1873FF")
  	setBdrColor(journey?"rgba(0, 0, 0, 0.3)":"#1873FF")
  }, [journey])

  const toggle = () => setJourney(!journey)

  return (
  	<TouchableOpacity onPress={toggle}>
	    <View style={{...styles.container, backgroundColor: bgColor, borderColor: bdrColor}}>
	    	{ journey ? <Icon.Check size={25} style={{ color: iconColor, paddingRight: 2}} /> : <Icon.Navigation size={25} style={{color: iconColor}} />}
	      <Text style={{...styles.title, color: txtColor}}>{text}</Text>
	    </View>
  	</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
  	display: "flex",
  	flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",

    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,

    borderRadius: 25,
    borderWidth: 2    
  },
  title: {
  	fontWeight: "bold",
  }
})

export default Navigation