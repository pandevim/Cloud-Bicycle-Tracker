import AppContext from "context/app-context.js"

import React, { useState, useContext, useEffect } from "react"
import { Text, View, Button, StyleSheet, ScrollView, TextInput, Alert } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import { Picker } from "Components"
import { SignIn, SignUp } from "Views"

import { auth, localStorage, database } from "utils"

const Stack = createStackNavigator()

const Profile = () => {
  const { initializingFirebase, user, setUser, journey } = useContext(AppContext)

  const [mets, setMets] = useState("6.8")
  const [signedIn, setSignedIn] = useState(true)

  useEffect(() => {
    console.log('profile')
    setUser({...user, mets: mets})
    if ( user.uid && journey ) {
      console.log('profile db')
      database()
        .ref(`/users/${user.uid}`)
        .set({...user, mets: mets})
        .catch(err => Alert.alert("ERROR", err))   
    }
  }, [mets])

  const signOut = () => {
    console.log('signOut')
    auth()
      .signOut()
      .then(res => localStorage.delete('@user'))
      .then(() => setSignedIn(false))
      .then(() => Alert.alert("SUCCESS", "Signed Out Successfully!"))
      .catch(err => Alert.alert("ERROR", err))
  }

  if (initializingFirebase) return null
  return (
    <>
    { user.uid && signedIn 
      ? <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={{...styles.title, color: "black"}}>Welcome, <Text style={styles.title}>{user.name}</Text></Text>
          </View>
          <Button color="#1873FF" title="sign out" onPress={() => signOut()} />
          <ScrollView style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Age</Text>
              <View style={styles.specialInput}>
                <TextInput
                  style={{...styles.input, borderColor: "#f2f2f2"}}
                  value={user.age}
                  editable={false}
                />
                <TextInput defaultValue="yr" editable={false} />
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Sex</Text>
              <View style={styles.specialInput}>
                <TextInput
                  style={{...styles.input, borderColor: "#f2f2f2"}}
                  value={user.sex}
                  editable={false}
                />
                <TextInput defaultValue="yr" editable={false} />
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Height</Text>
              <View style={styles.specialInput}>
                <TextInput
                  style={{...styles.input, borderColor: "#f2f2f2"}}
                  value={user.height}
                  editable={false}
                />
                <TextInput defaultValue="cm" editable={false} />
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Weight</Text>
              <View style={styles.specialInput}>
                <TextInput
                  style={{...styles.input, borderColor: "#f2f2f2"}}
                  value={user.weight}
                  editable={false}
                />
                <TextInput defaultValue="kg" editable={false} />
              </View>
            </View>
            <View style={{...styles.field, paddingBottom: 50}}>
              <Text style={styles.label}>Mets</Text>
              <Picker
                selectedValue={mets}
                style={{height: 50}}
                onValueChange={value => setMets(value)}>
                <Picker.Item label="bicycling, general" value="7.5" />
                <Picker.Item label="bicycling, leisure" value="3.5" />
                <Picker.Item label="bicycling, mountain, uphill, vigorous" value="14.0" />
                <Picker.Item label="bicycling, mountain, general" value="8.5" />
              </Picker>
            </View>        
          </ScrollView>
        </View>
      : <Stack.Navigator initialRouteName="SignIn" headerMode="none">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    fontFamily: "Roboto"
  },
  heading: {
    padding: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E2EDFF"
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#1873FF"
  },
  form: {
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  field: {},
  label: {
    color: "black",
    fontWeight: "bold",
    paddingTop: 20,
  },
  specialInput: {
    display: "flex",
    flexDirection: "row"
  },  
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    flex: 1
  },
  register: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default Profile
