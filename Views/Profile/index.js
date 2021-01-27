import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Button } from 'react-native'

import auth from '@react-native-firebase/auth'

import { Details, SignIn } from "Views"

import AppContext from "context/app-context.js"

const Profile = ({ navigation }) => {

  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  const onAuthStateChanged = user => {
    setUser(user)
    setInitializing(!initializing)
  }

  return (initializing)
  	? <Text>Loading...</Text>
  	: (
	    <>
        {/* (user) ? <Details /> : <SignIn /> */}
        <SignIn />
	    </>
  	)
}

export default Profile
