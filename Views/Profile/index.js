import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { Details, SignIn, SignUp } from "Views"

const Profile = ({ navigation }) => {
  return (
    <>
	  	<Details />
	  	<SignIn />
	  	<SignUp />
    </>
  )
}

export default Profile