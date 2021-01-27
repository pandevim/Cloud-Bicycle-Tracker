import React, { useState, useContext, useRef, useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native'

import { useForm, Controller } from "react-hook-form"

import AppContext from "context/app-context.js"

const SignIn = () => {

  const emailRef = useRef()
  const passwordRef = useRef()

  const { signIn } = useContext(AppContext)

  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordPattern = /.*/
  // const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

  const [emailError, setEmailError] = useState("")
  const [passowordError, setPassowordError] = useState("")

  const { control, handleSubmit, errors } = useForm()
  const onSubmit = ({ email, password }) => signIn(email, password)

  useEffect(() => {
    if ( errors.email && errors.email.type === "pattern" ) setEmailError("Invalid Email")
    else if ( errors.email && errors.email.type === "required" ) setEmailError("Email Required")
    else setEmailError("")

    if ( errors.password && errors.password.type === "pattern" ) setPassowordError("Invalid Password")
    else if ( errors.password && errors.password.type === "required" ) setPassowordError("Password Required")
    else setPassowordError("")

    // Password must be:
    // 1. At least one upper case English letter
    // 2. At least one lower case English letter
    // 3. At least one digit
    // 4. At least one special character
    // 5. Minimum eight in length
  }, [errors])

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
                underlineColorAndroid={(errors.email)?'#ff645e':'#BABABA'}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                ref={passwordRef}
              />
            )}
          />
          <Text style={styles.error}>{passowordError}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.register}>
        <Text style={{color: "#9c9191", textDecorationLine: 'underline'}}>Register?</Text>
      </TouchableOpacity>
      <Button color="#1873FF" title="sign in" onPress={handleSubmit(onSubmit)} />
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
    padding: 20
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
