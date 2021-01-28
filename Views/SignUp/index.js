import React, { useState, useContext, useRef, useEffect, useCallback } from 'react'
import { Text, View, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, Alert } from 'react-native'

import { Picker } from '@react-native-picker/picker'

import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useForm, Controller } from "react-hook-form"

import AppContext from "context/app-context.js"

const SignUp = () => {

  // const updateProfile = useCallback(async () => {
  //   await firebase.auth().currentUser.updateProfile({displayName: 'Test User'})
  // }, [])

  // useEffect(() => {
  //   updateProfile()
  // }, [updateProfile])

  const { updateUserInfo, storeDataLocally } = useContext(AppContext)

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const ageRef = useRef()
  const heightRef = useRef()
  const weightRef = useRef()

  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordPattern = /^[a-zA-Z0-9]{6,}$/

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [userSex, setUserSex] = useState("")

  const { control, handleSubmit, errors } = useForm()
  const onSubmit = data => signUp(data)

  const signUp = (data) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(response => {
        console.log(response)
        updateUserInfo(data)
        storeDataLocally(data, '@user_info')
      })
      .catch(error => {
        console.error(error)
        Alert.alert("Error", error.code)
      })
  }

  useEffect(() => {
    if ( errors.email && errors.email.type === "pattern" ) setEmailError("Invalid Email")
    else if ( errors.email && errors.email.type === "required" ) setEmailError("This filed is required.")
    else setEmailError("")

    if ( errors.password && errors.password.type === "pattern" ) setPasswordError("Password should be at least 6 characters.")
    else if ( errors.password && errors.password.type === "required" ) setPasswordError("This filed is required.")
    else setPasswordError("")
  }, [errors])

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <ScrollView style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <Controller
            name="name"
            defaultValue=""
            rules={{ required: true }}
            onFocus={() => nameRef.current.focus()}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={{...styles.input, borderColor: "#f2f2f2"}}
                underlineColorAndroid={(errors.name)?'#ff645e':'#BABABA'}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                ref={nameRef}
              />
            )}
          />
          {errors.name && <Text style={styles.error}>This field is required.</Text>}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Controller
            name="email"
            defaultValue=""
            rules={{ required: true, pattern: emailPattern }}
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
          <Text style={styles.error}>{emailError}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <Controller
            name="password"
            defaultValue=""
            rules={{ required: true, pattern: passwordPattern }}
            onFocus={() => passwordRef.current.focus()}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={{...styles.input, borderColor: "#f2f2f2"}}
                underlineColorAndroid={(errors.password)?'#ff645e':'#BABABA'}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                ref={passwordRef}
              />
            )}
          />
          <Text style={styles.error}>{passwordError}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Age</Text>
          <Controller
            name="age"
            defaultValue=""
            rules={{ required: true }}
            onFocus={() => ageRef.current.focus()}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <View style={styles.specialInput}>
                <TextInput
                  style={{...styles.input, borderColor: "#f2f2f2"}}
                  underlineColorAndroid={(errors.age)?'#ff645e':'#BABABA'}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  ref={ageRef}
                />
                <TextInput defaultValue="yr" editable={false} />
              </View>
            )}
          />
          {errors.age && <Text style={styles.error}>This field is required.</Text>}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Sex</Text>
          <Picker
            selectedValue={userSex}
            style={{height: 50}}
            onValueChange={value => setUserSex(value)}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Height</Text>
          <Controller
            name="height"
            defaultValue=""
            rules={{ required: true }}
            onFocus={() => heightRef.current.focus()}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <View style={styles.specialInput}>
                <TextInput
                  style={{...styles.input, borderColor: "#f2f2f2"}}
                  underlineColorAndroid={(errors.height)?'#ff645e':'#BABABA'}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  ref={heightRef}
                />
                <TextInput defaultValue="cm" editable={false} />
              </View>
            )}
          />
          {errors.height && <Text style={styles.error}>This field is required.</Text>}
        </View>
        <View style={{...styles.field, paddingBottom: 50}}>
          <Text style={styles.label}>Weight</Text>
          <Controller
            name="weight"
            defaultValue=""
            rules={{ required: true }}
            onFocus={() => weightRef.current.focus()}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <View style={styles.specialInput}>
                <TextInput
                  style={{...styles.input, borderColor: "#f2f2f2"}}
                  underlineColorAndroid={(errors.weight)?'#ff645e':'#BABABA'}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  ref={weightRef}
                />
                <TextInput defaultValue="kg" editable={false} />
              </View>              
            )}
          />
          {errors.weight && <Text style={styles.error}>This field is required.</Text>}
        </View>        
      </ScrollView>
      <Button color="#1873FF" title="sign up" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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

export default SignUp	

/*
https://keisan.casio.com/exec/system/1350958587
Unit: SI(cm;kg)

Email
Password
Confirm Password
Name

Age (years)
Sex (male|female)
Height (cm)
Weight (kg)
Bicycling Speed (km/h)
Mets: https://download.lww.com/wolterskluwer_vitalstream_com/permalink/mss/a/mss_43_8_2011_06_13_ainsworth_202093_sdc1.pdf
Duration (mins)

*/