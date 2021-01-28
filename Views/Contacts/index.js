import React, { useContext, useRef } from 'react'
import { 
	Text, 
	View, 
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Button
} from 'react-native'

import { useForm, Controller } from "react-hook-form"

import AppContext from "context/app-context.js"

const Contacts = () => {

  const name1Ref = useRef()
  const number1Ref = useRef()
  const { control, handleSubmit, errors } = useForm()

  const { updateContacts } = useContext(AppContext)
  const onSubmit = (data) => {
  	const contact1 = {
			id: "1",
			name: data.name1,
			number: data.number1  		
  	}
  	const contact2 = {
			id: "2",
			name: data.name2,
			number: data.number2  		
  	}

  	if ( data.name2 && data.number2 )
	  	updateContacts([contact1, contact2])
  	else
	  	updateContacts([contact1])

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
	            defaultValue=""
	            rules={{ required: true }}
	            onFocus={() => name1Ref.current.focus()}
	            control={control}
	            render={({ onChange, onBlur, value }) => (
	              <TextInput
	                style={{...styles.input, borderColor: "#f2f2f2"}}
	                underlineColorAndroid={(errors.name1)?'#ff645e':'#BABABA'}
	                onBlur={onBlur}
	                onChangeText={value => onChange(value)}
	                value={value}
	                ref={name1Ref}
	              />
	            )}
	          />
	          {errors.name1 && <Text style={styles.error}>This field is required.</Text>}
	        </View>
	        <View style={styles.field}>
	          <Text style={styles.label}>Number</Text>
	          <Controller
	            name="number1"
	            defaultValue=""
	            rules={{ required: true }}
	            onFocus={() => number1Ref.current.focus()}
	            control={control}
	            render={({ onChange, onBlur, value }) => (
	              <TextInput
	                style={{...styles.input, borderColor: "#f2f2f2"}}
	                underlineColorAndroid={(errors.number1)?'#ff645e':'#BABABA'}
	                onBlur={onBlur}
	                onChangeText={value => onChange(value)}
	                value={value}
	                ref={number1Ref}
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
	            defaultValue=""
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
	            defaultValue=""
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