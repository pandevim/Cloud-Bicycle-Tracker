import AppContext from "context/app-context.js"

import React, { useState, useContext, useRef, useEffect, useCallback } from "react"
import { Text, View, TextInput, StyleSheet, Button, ScrollView, Alert } from "react-native"

import { Picker, useForm, Controller } from "Components"

import { PATTERN } from "constants"
import { auth, localStorage} from "utils"

const SignUp = () => {

  const { user, setUser } = useContext(AppContext)

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const ageRef = useRef()
  const heightRef = useRef()
  const weightRef = useRef()

  const { control, handleSubmit, errors } = useForm()

  const signUp = (data) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(res => setUser(data, res))
      .catch(err => Alert.alert("Error", JSON.strigify(err)))
  }

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
                underlineColorAndroid={(errors.password)?'#ff645e':'#BABABA'}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                ref={passwordRef}
              />
            )}
          />
          {errors.password && <Text style={styles.error}>Password should be at least 6 characters.</Text>}
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
            selectedValue={userInfo.sex}
            style={{height: 50}}
            onValueChange={value => setUserInfo({...userInfo, sex: value})}>
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
      <Button color="#1873FF" title="sign up" onPress={handleSubmit(signUp)} />
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
