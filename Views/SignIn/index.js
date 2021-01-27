import React from 'react'
import { Text, View } from 'react-native'

import { Form } from "Components"

const SignIn = () => {
  return (
  	<Form
  		type="sign-in"
  		fields={{
  			email: {
  				label: 'Email',
  				type: "email"
  			},
  			password: {
  				label: 'password',
  				type: "password"
  			}
  		}} 
  	/>
  )
}

export default SignIn