import React from 'react'
import { 
	Text, 
	View, 
	StyleSheet,
	TouchableOpacity
} from 'react-native'

import AppContext from "context/app-context.js"

const Contacts = () => {
  return (
		<AppContext.Consumer>
			{context => (
				<>
					<Text>Contacts</Text>
					<TouchableOpacity onPress={() => context.updateContacts(context.contacts)}>
						<View>
							<Text>Update Contacts</Text>
						</View>
					</TouchableOpacity>
				</>
			)}
		</AppContext.Consumer>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default Contacts