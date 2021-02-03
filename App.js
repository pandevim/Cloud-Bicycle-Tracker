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
    bmr: "0",
    rhr: "0",
    weight: "0",
    sex: "",
    mets: "0",
    name: "",
    history: "",
    height: "0",
    email: "",
    age: "0",
    contacts: [
      { id: "1", name: "", number: "" },
      { id: "2", name: "", number: "" }
    ]
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

  useEffect(() => {
    console.log(`change: ${JSON.stringify(user)}`)
  }, [user])

  /* get user saved locally when app starts */
  useEffect(() => {
    console.log('start')
    localStorage
      .get('@user')
      .then(user => {
        console.log(`localStorage: ${JSON.stringify(user)}`)
        if (user) {
          console.log('updateUser initiate', 'from localStorage start')
          updateUser(user.uid)
        }
      })
      .catch(err => Alert.alert("ERROR", err))
  }, [])

  /*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Methods ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/

  const updateUser = (uid, data = 0) => {
    if (data) {
      database()
        .ref(`/users/${uid}`)
        .set({...data, uid: uid})
        .then(() => setUser({...data, uid: uid}))
        .then(() => localStorage.set('@user', { uid: uid }))
        .then(() => Alert.alert("SUCCESS", "Signed Up Successfully!"))
        .catch(err => Alert.alert("ERROR", err))
    } else {
      database()
        .ref(`/users/${uid}`)
        .once("value")
        .then(res => res.val())
        .then(data => setUser({...data, uid: uid}))
        .then(() => localStorage.set('@user', { uid: uid }))
        .then(() => Alert.alert("SUCCESS", "User Information Updated Successfully!"))
        .catch(err => Alert.alert("ERROR", err))
    }
  }

  /* user auth state (signin, signup, signout) toggle */
  const onAuthStateChanged = user => {
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
        updateUser: updateUser,

        current: current,
        setCurrent: setCurrent,

        journey: journey,
        setJourney: setJourney,

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
