import React from 'react'
import { Image } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const Icon = () => <></>

export const DirectionsBike = (props) => <MaterialIcon name="directions-bike" size={30} color="#000000" style={props.style} />
Icon.DirectionsBike = DirectionsBike

export const Speed = (props) => <MaterialIcon name="speed" size={30} color="#000000" style={props.style} />
Icon.Speed = Speed

export const ErrorOutline = (props) => <MaterialIcon name="error-outline" size={props.size} color="white" style={props.style} />
Icon.ErrorOutline = ErrorOutline

export const Menu = (props) => <MaterialIcon name="menu" size={30} color="#000000" style={props.style} />
Icon.Menu = Menu

export const Time = (props) => <MaterialIcon name="access-time" size={30} color="#000000" style={props.style} />
Icon.Time = Time

export const Distance = (props) => <FontAwesome name="road" size={30} color="#000000" style={props.style} />
Icon.Distance = Distance

export const Add = (props) => <MaterialIcon name="add" size={30} color="#000000" style={props.style} />
Icon.Add = Add

export const Navigation = (props) => <MaterialIcon name="navigation" size={props.size} color="#000000" style={props.style} />
Icon.Navigation = Navigation

// import { images } from "constants"
// export const Check = (props) => <Image style={props.style} source={images.check_circle}/>
// Icon.Check = Check

export const Check = (props) => <FontAwesome name="check-circle" size={props.size} color={props.color} style={props.style} />
Icon.Check = Check

export const Person = (props) => <FontAwesome name="circle" size={props.size} color={props.color} style={props.style} />
Icon.Person = Person

export const Calories = (props) => <FontAwesome name="heartbeat" size={30} color="#000000" style={props.style} />
Icon.Calories = Calories