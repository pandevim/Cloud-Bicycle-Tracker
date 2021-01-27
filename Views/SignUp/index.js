import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

// import { Picker } from '@react-native-picker/picker'

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text>sgn iup</Text>
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