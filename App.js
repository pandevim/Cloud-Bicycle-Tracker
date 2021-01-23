import 'react-native-gesture-handler'

import React, { useState } from "react"
import {
  StyleSheet,
  StatusBar,
  PermissionsAndroid,
  Alert,
  Vibration,
  Button
} from "react-native"

import SendSMS from 'react-native-sms-x'

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

import { Home, Profile, Contacts, Settings, History } from "Views"

import { EmergencyVolume } from "Components"

import AppContext from "context/app-context.js"

const AppProvider = (props) => {

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
      value={{ 
        contacts: state.contacts,
        location: state.location,
        cyclistName: state.cyclistName,
        updateContacts: updateContacts,
        sendEmergencySMS: sendEmergencySMS
      }}>
      {props.children}
    </AppContext.Provider>
  )
}

// const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const App: () => React$Node = () => {

  PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.SEND_SMS
  ])
  .then( granted => console.log(JSON.stringify(granted)))
  .catch( err => console.warn(err) )

  return (
    <>
      <StatusBar barStyle="default" />
      <AppProvider>
        <EmergencyVolume />
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="History" component={History} />
            <Drawer.Screen name="Contacts" component={Contacts} />
            <Drawer.Screen name="Settings" component={Settings} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AppProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default App
