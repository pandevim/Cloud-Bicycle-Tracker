import React from 'react'
import { Text, View } from 'react-native'

import VolumeControl, { VolumeControlEvents } from 'react-native-volume-control'

const VolumeButtonDown = () => {
  // const volumeListener = VolumeControlEvents.addListener("VolumeChanged", event => {
  //   ( event.volume <= 0 ) && console.log('sendEmergencySMS')
  // })

  // VolumeControl.change(0.5)
	return(<></>)
}

const EmergencyVolume = () => {

  return (
		<AppContext.Consumer>
			{context => (
				<>
					<VolumeButtonDown onEvent={() => context.sendEmergencySMS()} />
				</>
			)}
		</AppContext.Consumer>
  )
}

export default EmergencyVolume