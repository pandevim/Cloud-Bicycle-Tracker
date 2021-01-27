import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Button } from 'react-native'

// import { Picker } from '@react-native-picker/picker'

import AppContext from "context/app-context.js"

const Form = (props) => {

	const { signIn, signUp } = useContext(AppContext)

	const [formType, setFormType] = useState("")
	const [email, setEmail] = useState('test@test.com')
	const [password, setPassword] = useState('test1234')

  useEffect(() => {
    setFormType((props.type == "sign-in") ? "Sign In" : "Sign Up")
  }, [])

  const onSubmit = (email, password) => {
  	if (props.type == "sign-in") signIn(email, password)
  	else if (props.type == "sign-up") signUp(email, password)
  }

  return (
		<>
			<View>
				<Text>FORM</Text>
			</View>
			<Button title={formType} disabled={!formType} onPress={() => onSubmit(email, password)}/>
		</>
  )
}

export default Form