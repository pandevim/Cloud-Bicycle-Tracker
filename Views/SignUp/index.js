import React from 'react'
import { Text, View } from 'react-native'

import { Form } from "Components"

const SignUp = () => {
  return (
  	<Form
  		type="sign-up"
  		fields={{
  			email: {
  				label: 'Email',
  				type: "email"
  			},
  			password: {
  				label: 'password',
  				type: "password"
  			},
  			confirmPassword: {
  				label: 'Confirm Password',
  				type: "password"
  			},
  			name: {
  				label: 'Name',
  				type: "text"
  			},
  			age: {
  				label: 'Age',
  				type: "number"
  			},
  			sex: {
  				label: 'Sex',
  				type: "picker",
  				pickerOptions: ["Male", "Female"]
  			},
  			height: {
  				label: 'Height',
  				type: "number"
  			},
  			weight: {
  				label: 'Weight',
  				type: "number"
  			},
  			mets: {
  				label: 'Mets',
  				type: "picker",
  				pickerOptions: [
  					"bicycling, general",
  					"bicycling, racing",
  					"bicycling, mountain, general",
  					"bicycling, mountain, uphill, vigorous"
  				]
  			}
  		}} 
  	/>
  )
}

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