import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Button } from 'react-native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import auth from '@react-native-firebase/auth'
import { Details, SignIn, SignUp } from "Views"
import AppContext from "context/app-context.js"
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator()

const Profile = ({ navigation }) => {

  const { initializingFirebase, userState } = useContext(AppContext)

  if (initializingFirebase) return null

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        resetDataLocally()
        Alert.alert("Signed Out")
      })
  }

  const resetDataLocally = async () => {
    try {
      await AsyncStorage.setItem('@user_info', {})
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
    { userState 
      ? <View>
          <Text>Welcome {userState.email}</Text>
          <Details />
          <Button title="sign out" onPress={() => signOut()} />
        </View>
      : <Stack.Navigator initialRouteName="SignIn" headerMode="none">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    }
    </>
  )
}

export default Profile
