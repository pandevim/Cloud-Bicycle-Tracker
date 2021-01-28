import React, { useState, useEffect, useCallback } from "react"
import {
  StyleSheet,
  StatusBar,
  PermissionsAndroid,
  Alert,
  Vibration,
  TouchableOpacity,
  Text,
  View
} from "react-native"

import auth from '@react-native-firebase/auth'

import AsyncStorage from '@react-native-async-storage/async-storage'

import SendSMS from 'react-native-sms-x'

import { EmergencyVolume, ProfileDrawerItem } from "Components"
import { Home, Profile, Settings, Contacts, History } from "Views"

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import AppContext from "context/app-context.js"
const AppProvider = (props) => {

  const [initializingFirebase, setInitializingFirebase] = useState(true)
  const [userInfo, setUserInfo] = useState({})
  const [userState, setUserState] = useState()
  const [ state, setState ] = useState({
    contacts: [
      {
        id: "1",
        name: "name1",
        number: "+919630997999"
      },
      {
        id: "2",
        name: "name2",
        number: "+919630997999"
      }
    ],
    cyclistName: "cyclist",
    location: {
      place: "place",
      latitude: "latitude",
      longitude: "longitude"
    }
  })

  const updateContacts = contacts => {
    console.log('updateContacts', contacts)
  }

  const onAuthStateChanged = user => {
    setUserState(user)
    setInitializingFirebase(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  const getUserInfo = useCallback(async () => {
    console.log('here')
    try {
      const userInfo = await AsyncStorage.getItem('@user_info')
      setUserInfo(userInfo != null ? JSON.parse(userInfo) : null)
    } catch(e) { console.error(e) }
  }, [])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  const sendEmergencySMS = () => {
    Vibration.vibrate(1000)
    // const { place, latitude, longitude } = state.location
    // const helpTex = `!!!EMERGENCY SOS!!!\n${state.cyclistName} has made an Emergency Trigger from \"${place}\" Approximate Location.\nhttps://www.google.com/maps/@${latitude},${longitude},15z`
    // const messageSent = state.contacts.map(contact => {
    //   SendSMS.send(parseFloat(contact.id), contact.number, helpTex, successId => console.log(successId))
    // })
    // Alert.alert(`Emergency Alert`, `Message sent successfully to ${state.contacts.map(contact => contact.name).toString()} from your emergency contacts.`)
  }

  return (
    <AppContext.Provider 
      style={{ fontFamily: "Roboto"}}
      value={{ 
        userInfo: state.userInfo,
        contacts: state.contacts,
        location: state.location,
        cyclistName: state.cyclistName,
        updateContacts: updateContacts,
        sendEmergencySMS: sendEmergencySMS,
        initializingFirebase: initializingFirebase,
        userState: userState
      }}>
      {props.children}
    </AppContext.Provider>
  )
}

const Drawer = createDrawerNavigator()

const App: () => React$Node = () => {

  PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.SEND_SMS
  ])
  // .then( granted => console.log(JSON.stringify(granted)))
  .catch( err => console.warn(err) )

  return (
    <NavigationContainer>
      <StatusBar barStyle="default" />
      <AppProvider>
        <EmergencyVolume />
        <Drawer.Navigator initialRouteName="Home" drawerType="slide" screenOptions={{ headerShown: true }}>
          <Drawer.Screen name="Profile" component={Profile} options={{ drawerLabel: props => (<ProfileDrawerItem {...props} />)}} />
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Contacts" component={Contacts} />
          <Drawer.Screen name="History" component={History} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      </AppProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default App
