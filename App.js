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

  const [permissions, setPermissions] = useState(null)
  const [initializingFirebase, setInitializingFirebase] = useState(true)
  const [userState, setUserState] = useState(null)
  const [contacts, setContacts] = useState(null)
  const [journey, setJourney] = useState(false)

  const [userInfo, setUserInfo] = useState({
    name: "",
    sex: "",
    email: "",
    age: "",
    height: "",
    weight: ""
  })

  const [current, setCurrent] = useState({
    location: "",
    street: "Loading...",
    latitude: 0.00,
    longitude: 0.00,
    speed: 0.00
  })

  const [metrics, setMetrics] = useState({
    distance: "0",
    calories: "0"
  })

  PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.SEND_SMS,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  ])
  .then( granted => setPermissions(granted))
  .catch( err => console.warn(err) )

  const storeDataLocally = async (value, key) => {
    try {
      const data = JSON.stringify(value)
      await AsyncStorage.setItem(key, data)
    } catch (e) {
      console.error(e)
    }
  }

  const resetDataLocally = async () => {
    try {
      await AsyncStorage.setItem('@user_info', "")
    } catch (e) {
      console.error(`resetDataLocally: ${e}`)
    }
  }

  const updateContacts = contacts => {
    console.log('updateContacts', contacts)
    setContacts(contacts)
    Alert.alert("SUCCESS", "Contacts saved.")
    storeDataLocally(contacts, '@emergency_contacts')
  }

  const onAuthStateChanged = user => {
    setUserState(user)
    setInitializingFirebase(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  useEffect(() => {
    const i = getUserInfo()
    console.log(`getUserInfo: ${JSON.stringify(i)}`)
  }, [getUserInfo])
  const getUserInfo = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem('@user_info')
      return data != null ? JSON.parse(data) : null
    } catch(e) { console.error(e) }
  }, [])

  useEffect(() => {
    const c = getEmergencyContacts()
    console.log(`getEmergencyContacts: ${JSON.stringify(c)}`)
  }, [getEmergencyContacts])
  const getEmergencyContacts = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem('@emergency_contacts')
      return data != null ? JSON.parse(data) : null
    } catch(e) { console.error(e) }
  }, [])

  const sendEmergencySMS = () => {
    Vibration.vibrate(1000)
    if (!contacts) Alert.alert("ERROR", "Contacts not saved.")
    else {
      console.log('contacts send!!')
      const helpTex = `!!!EMERGENCY SOS!!!\n${userInfo.name} has made an Emergency Trigger from \"${current.location}\" Approximate Location.\nhttps://www.google.com/maps/@${current.latitude},${current.longitude},15z`
      const messageSent = contacts.map(contact => {
        SendSMS.send(parseFloat(contact.id), contact.number, helpTex, successId => console.log(successId))
      })
      Alert.alert(`Emergency Alert`, `Message sent successfully to ${contacts.map(contact => contact.name).toString()} from your emergency contacts.`)
    }
  }

  const toggleNavigation = () => {}

  return (
    <AppContext.Provider 
      style={{ fontFamily: "Roboto"}}
      value={{ 
        permissions: permissions,
        initializingFirebase: initializingFirebase,
        userState: userState,

        updateContacts: updateContacts,
        sendEmergencySMS: sendEmergencySMS,
        toggleNavigation: toggleNavigation,

        storeDataLocally: storeDataLocally,
        resetDataLocally: resetDataLocally,
        
        metrics: metrics,
        setMetrics: setMetrics,

        userInfo: userInfo,
        setUserInfo: setUserInfo,

        current: current,
        setCurrent: setCurrent,

        journey: journey,
        setJourney: setJourney
      }}>
      {props.children}
    </AppContext.Provider>
  )
}

const Drawer = createDrawerNavigator()

const App: () => React$Node = () => {

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
