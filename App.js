import React, { useState, useEffect } from "react"
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

import SendSMS from 'react-native-sms-x'
import auth from '@react-native-firebase/auth'

import { EmergencyVolume, ProfileDrawerItem } from "Components"
import { Home, Profile, Settings, Contacts, History } from "Views"

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import AppContext from "context/app-context.js"
const AppProvider = (props) => {

  const [signedIn, setSignedIn] = useState(false)

  const [ state, setState ] = useState({
    details: {
      name: null
    },
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

  const signIn = (email, password) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((e) => {setSignedIn(true); console.log(e)})
      .catch(error => console.error(error))
  }

  const signUp = (email, password) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {setSignedIn(true); console.log(e)})
      .catch(error => console.error(error))
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
        auth: state.auth,
        details: state.details,
        contacts: state.contacts,
        location: state.location,
        cyclistName: state.cyclistName,
        updateContacts: updateContacts,
        sendEmergencySMS: sendEmergencySMS,
        signIn: signIn,
        signUp: signUp
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
