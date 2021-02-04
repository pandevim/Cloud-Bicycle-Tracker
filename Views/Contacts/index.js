import AppContext from "context/app-context.js"

import React, { useState, useContext, useRef, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native'
import { useForm, Controller } from "react-hook-form"

import { database } from "utils"

const Contacts = () => {
  const { user, setUser } = useContext(AppContext)

  const nameRef = useRef()
  const numberRef = useRef()

  const { control, handleSubmit, errors } = useForm()

  const[name1, setName1] = useState(user.contacts?user.contacts[0].name:"")
  const[number1, setNumber1] = useState(user.contacts?user.contacts[0].number:"")

  const[name2, setName2] = useState(user.contacts?user.contacts[1].name:"")
  const[number2, setNumber2] = useState(user.contacts?user.contacts[1].number:"")

  useEffect(() => {
    console.log(`contacts: ${JSON.stringify(user.contacts)}`)
    if (user.contacts) {
      setName1(user.contacts[0].name)
      setNumber1(user.contacts[0].number)
      setName2(user.contacts[1].name)
      setNumber2(user.contacts[1].number)
    }
  }, [user])

  const onSubmit = data => {
    const contacts = [
      { id: "1", name: data.name1, number: data.number1 },
      { id: "2", name: data.name2, number: data.number2 }
    ]

		console.log('updateUser initiate', 'from onSubmit contacts')

  	setUser({...user, contacts: contacts})

  	if (user.uid) {
  		const db_contacts = {0: contacts[0], 1: contacts[1]}
	    database()
	      .ref(`/users/${user.uid}`)
	      .set({...user, contacts: db_contacts})
	      .then(() => Alert.alert("SUCCESS", "Contacts Saved Successfully!"))
	      .catch(err => Alert.alert("ERROR", err))  	
  	}

  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
      	<View style={styles.section}>
          <Text style={styles.contact}>Contact #1</Text>
	        <View style={styles.field}>
	          <Text style={styles.label}>Name</Text>
	          <Controller
	            name="name1"
	            defaultValue={name1}
	            rules={{ required: true }}
	            onFocus={() => nameRef.current.focus()}
	            control={control}
	            render={({ onChange, onBlur, value }) => (
	              <TextInput
	                style={{...styles.input, borderColor: "#f2f2f2"}}
	                underlineColorAndroid={(errors.name1)?'#ff645e':'#BABABA'}
	                onBlur={onBlur}
	                onChangeText={value => onChange(value)}
	                value={value}
	                ref={nameRef}
	              />
	            )}
	          />
	          {errors.name1 && <Text style={styles.error}>This field is required.</Text>}
	        </View>
	        <View style={styles.field}>
	          <Text style={styles.label}>Number</Text>
	          <Controller
	            name="number1"
	            defaultValue={number1}
	            rules={{ required: true }}
	            onFocus={() => numberRef.current.focus()}
	            control={control}
	            render={({ onChange, onBlur, value }) => (
	              <TextInput
	                style={{...styles.input, borderColor: "#f2f2f2"}}
	                underlineColorAndroid={(errors.number1)?'#ff645e':'#BABABA'}
	                onBlur={onBlur}
	                onChangeText={value => onChange(value)}
	                value={value}
	                ref={numberRef}
	              />
	            )}
	          />
	          {errors.number1 && <Text style={styles.error}>This field is required.</Text>}
	        </View>        
      	</View>
      	<View style={styles.section}>
          <Text style={styles.contact}>Contact #2</Text>
	        <View style={styles.field}>
	          <Text style={styles.label}>Name</Text>
	          <Controller
	            name="name2"
	            defaultValue={name2}
	            control={control}
	            render={({ onChange, onBlur, value }) => (
	              <TextInput
	                style={{...styles.input, borderColor: "#f2f2f2"}}
	                underlineColorAndroid={'#BABABA'}
	                onBlur={onBlur}
	                onChangeText={value => onChange(value)}
	                value={value}
	              />
	            )}
	          />
	        </View>
	        <View style={styles.field}>
	          <Text style={styles.label}>Number</Text>
	          <Controller
	            name="number2"
	            defaultValue={number2}
	            control={control}
	            render={({ onChange, onBlur, value }) => (
	              <TextInput
	                style={{...styles.input, borderColor: "#f2f2f2"}}
	                underlineColorAndroid={'#BABABA'}
	                onBlur={onBlur}
	                onChangeText={value => onChange(value)}
	                value={value}
	              />
	            )}
	          />
	        </View>        
      	</View>
      </ScrollView>
      <Button color="#1873FF" title="save" onPress={handleSubmit(onSubmit)} />
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
  section: {
  	marginBottom: 30
  },
  error: {
    color: "#BABABA"
  },
  label: {
    color: "black",
    fontWeight: "bold",
    paddingTop: 20,
  },
  contact: {
    fontWeight: "bold",
  	fontSize: 30
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

export default Contacts