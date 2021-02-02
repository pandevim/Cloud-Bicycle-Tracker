import AppContext from "context/app-context.js"

import React, { useState, useEffect, useCallback } from "react"
import { PermissionsAndroid, Alert, Vibration, StatusBar, StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"

import { EmergencyVolume, ProfileDrawerItem } from "Components"
import { Home, Profile, Settings, Contacts, History } from "Views"

import { sms, database, auth, localStorage } from "utils"

const AppProvider = (props) => {

  /*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ States ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/

  /* permissions for different services */
  const [permissions, setPermissions] = useState(null)

  /* have a check on firebase initlization */
  const [initializingFirebase, setInitializingFirebase] = useState(true)

  /* check if the navigation button is pressed or not */
  const [journey, setJourney] = useState(false)

  /* Information regarding current user*/
  const [user, setUser] = useState({
    uid: "",
    name: "",
    sex: "",
    email: "",
    age: "0",
    height: "0",
    weight: "0",
    mets: "0",
    history: [],
    contacts: []
  })  

  /* current map data */
  const [current, setCurrent] = useState({
    location: "",
    street: "Loading...",
    latitude: 0,
    longitude: 0
  })

  /*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Effects ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/

  /* ask for pemissions the first time app is installed */
  useEffect(() => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    ])
    .then( result => setPermissions(result))
    .catch( err => console.warn(err) )
  }, [])

  /* call onAuthStateChanged on every auth state change */
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  /* get user saved locally when app starts */
  useEffect(() => {
      // .set('@user', {
      //   uid: "8Iyt993fB1MnBc91HLJzOd7yiwF3",
      //   name: "Aniruddha Pandey",
      //   sex: "Male",
      //   email: "anirudh.pandev@gmail.com",
      //   age: "22",
      //   height: "180",
      //   weight: "62",
      //   mets: "6.8",
      //   history: [],
      //   contacts: [{ id: "1", name: "Mummy", number: "+919752263660" }]
      // })
    localStorage
      .get('@user')
      .then(user => user && setUser(user))
      .catch(err => Alert.alert("ERROR", err))
  }, [])

  /*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Methods ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/

  /* save user data locally */
  const updateContacts = (contacts) => {
    const data = {...user, contacts: contacts}
    setUser(data)
    localStorage.set('@user', data)
  }

  /* user auth state (signin, signup, signout) toggle */
  const onAuthStateChanged = user => {
    /* comment out user object here */
    // {
    //   "uid":"8Iyt993fB1MnBc91HLJzOd7yiwF3",
    //   "metadata":{
    //     "creationTime":1611798642946,
    //     "lastSignInTime":1612111033480
    //   },
    //   "providerId":"firebase",
    //   "photoURL":null,
    //   "emailVerified":false,
    //   "providerData":[
    //     {
    //       "uid":"anirudh.pandev@gmail.com",
    //       "displayName":null,
    //       "phoneNumber":null,
    //       "photoURL":null,
    //       "providerId":"password",
    //       "email":"anirudh.pandev@gmail.com"
    //     }
    //   ],
    //   "email":"anirudh.pandev@gmail.com",
    //   "isAnonymous":false,
    //   "displayName":null,
    //   "phoneNumber":null
    // }

    /* runs only once the app opens */
    setInitializingFirebase(false)
  }

  /* vibrate and send sms */
  const sendEmergencySMS = () => {
    Vibration.vibrate(1000)
    const message = `!!!EMERGENCY SOS!!!\n${user.name} has made an Emergency Trigger from \"${current.location}\" Approximate Location.\nhttps://www.google.com/maps/@${current.latitude},${current.longitude},15z`
    sms
      .send(message, user.contacts)
      .then(result => Alert.alert(`Emergency Alert`, result))
      .catch(err => Alert.alert("ERROR", err))
  }

  /* return a provider with all the state and methods above */
  return (
    <AppContext.Provider 
      style={styles.container}
      value={{ 
        permissions: permissions,
        initializingFirebase: initializingFirebase,
        sendEmergencySMS: sendEmergencySMS,

        user: user,
        setUser: setUser,

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
          {/* <Drawer.Screen name="Home" component={Home} /> */}
          {/* <Drawer.Screen name="Contacts" component={Contacts} /> */}
          {/* <Drawer.Screen name="History" component={History} /> */}
          {/* <Drawer.Screen name="Settings" component={Settings} /> */}
        </Drawer.Navigator>
      </AppProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Roboto"
  }
})

export default App
