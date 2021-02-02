import AppContext from "context/app-context.js"

import React, { useState, useRef, useEffect } from "react"
import { Text, View, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, Alert } from "react-native"

import { useForm, Controller } from "Components"

import { PATTERN } from "constants"
import { auth, localStorage, database } from "utils"

const SignIn = ({ navigation }) => {

  const emailRef = useRef()
  const passwordRef = useRef()

  const { control, handleSubmit, errors } = useForm()

  const signIn = ({email, password}) => {
    // {
    //   "additionalUserInfo":{
    //     "isNewUser":false
    //   },
    //   "user":{
    //     "phoneNumber":null,
    //     "displayName":null,
    //     "isAnonymous":false,
    //     "email":"anirudh.pandev@gmail.com",
    //     "providerData":[
    //       {
    //         "email":"anirudh.pandev@gmail.com",
    //         "providerId":"password",
    //         "photoURL":null,
    //         "phoneNumber":null,
    //         "displayName":null,
    //         "uid":"anirudh.pandev@gmail.com"
    //       }
    //     ],
    //     "emailVerified":false,
    //     "photoURL":null,
    //     "providerId":"firebase",
    //     "metadata":{
    //       "lastSignInTime":1612111033480,
    //       "creationTime":1611798642946
    //     },
    //     "uid":"8Iyt993fB1MnBc91HLJzOd7yiwF3"
    //   }
    // }    
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
        Alert.alert("Error", error.code)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Sign In</Text>
      </View>
      <ScrollView style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Controller
            name="email"
            defaultValue=""
            rules={{ required: true, pattern: PATTERN.email }}
            onFocus={() => emailRef.current.focus()}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={{...styles.input, borderColor: "#f2f2f2"}}
                underlineColorAndroid={(errors.email)?'#ff645e':'#BABABA'}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                ref={emailRef}
              />
            )}
          />
          {errors.email && <Text style={styles.error}>Invalid Email.</Text>}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <Controller
            name="password"
            defaultValue=""
            rules={{ required: true, pattern: PATTERN.password }}
            onFocus={() => passwordRef.current.focus()}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={{...styles.input, borderColor: "#f2f2f2"}}
                underlineColorAndroid={(errors.email)?'#ff645e':'#BABABA'}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                ref={passwordRef}
              />
            )}
          />
          {errors.password && <Text style={styles.error}>Invalid Password.</Text>}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('SignUp')}>
        <Text style={{color: "#9c9191", textDecorationLine: 'underline'}}>Register?</Text>
      </TouchableOpacity>
      <Button color="#1873FF" title="sign in" onPress={handleSubmit(signIn)} />
    </View>
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
  error: {
    color: "#BABABA"
  },
  label: {
    color: "black",
    fontWeight: "bold",
    paddingTop: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
  },
  register: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default SignIn
