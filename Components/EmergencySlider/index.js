import AppContext from "context/app-context.js"

import React, { useContext } from "react"
import { Text, View, StyleSheet } from "react-native"

import Slider from "react-native-unlock-slider"

import { Icon } from "constants"

const EmergencySlider = () => {

	const { sendEmergencySMS } = useContext(AppContext)

  return (
  	<View style={styles.container}>
	    <Slider
	      isLeftToRight={true}
	      childrenContainer={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }}
	      slideOverStyle={{ backgroundColor: '#F64C46' }}
	      onEndReached={() => sendEmergencySMS()}
	      isOpacityChangeOnSlide={true}
	      containerStyle={{
	        backgroundColor: 'rgba(255,255,255,0.0)',
	        overflow: 'hidden',
	        alignItems: 'center',
	        justifyContent: 'center',
	        borderRadius: 100,
	        borderColor: '#F64C46',
	        borderWidth: 1,
	        height: 50
	      }}
	    thumbElement={
	    	<View style={styles.icon}>
		      <Icon.ErrorOutline size={35} />
	    	</View>
	    }	          
	    >
	      <Text style={{fontWeight: '700', color: '#F64C46'}}>Slide for Emergency</Text>
	    </Slider>
  	</View>
)
}

const styles = StyleSheet.create({
  container: {},
  icon: {
  	height: 50,
  	width: 50,
  	display: "flex",
  	justifyContent: "center",
  	alignItems: "center"
  }
})

export default EmergencySlider
