import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Button, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import auth from '@react-native-firebase/auth'
import { Details, SignIn, SignUp } from "Views"
import AppContext from "context/app-context.js"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'

const Stack = createStackNavigator()

const Profile = ({ navigation }) => {

  const { initializingFirebase, userState, userInfo, resetDataLocally } = useContext(AppContext)

  const [mets, setMets] = useState("6.8")

  if (initializingFirebase) return null

  const signOut = () => {
    auth()
      .signOut()
      .then(() => resetDataLocally())
      .then(() => Alert.alert("Signed Out"))
      .catch(err => console.error(`signOut: ${err}`))
  }

  return (
    <>
    { userState 
      ? <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={{...styles.title, color: "black"}}>Welcome, <Text style={styles.title}>{userInfo.name}</Text></Text>
          </View>
          <Button color="#1873FF" title="sign out" onPress={() => signOut()} />
          <ScrollView style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Age</Text>
              <View style={styles.specialInput}>
                <TextInput
                  style={{...styles.input, borderColor: "#f2f2f2"}}
                  value={userInfo.age}
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
                  value={userInfo.sex}
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
                  value={userInfo.height}
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
                  value={userInfo.weight}
                  editable={false}
                />
                <TextInput defaultValue="kg" editable={false} />
              </View>
            </View>
            <View style={{...styles.field, paddingBottom: 50}}>
              <Text style={styles.label}>Mets</Text>
              <Picker
                selectedValue={"6.8"}
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
