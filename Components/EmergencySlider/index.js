import React, { useState } from 'react'
import { 
	Text, 
	View, 
	StyleSheet,
	TouchableOpacity
} from 'react-native'

import Slider from 'react-native-unlock-slider'

import AppContext from "context/app-context.js"

const EmergencySlider = () => {

  return (
		<AppContext.Consumer>
			{context => (
				<>
	        <Slider
	          isLeftToRight={true}
	          childrenContainer={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }}
	          slideOverStyle={{ backgroundColor: '#F64C46' }}
	          onEndReached={() => context.sendEmergencySMS()}
	          isOpacityChangeOnSlide={true}
	          containerStyle={{
	            backgroundColor: 'rgba(255,255,255,0.0)',
	            overflow: 'hidden',
	            alignItems: 'center',
	            justifyContent: 'center',
	            borderRadius: 100,
	            borderColor: '#F64C46',
	            borderWidth: 1
	          }}
	        >
	          <Text style={{fontWeight: '700', color: '#F64C46'}}>Slide for Emergency</Text>
	        </Slider>
				</>
			)}
		</AppContext.Consumer>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default EmergencySlider