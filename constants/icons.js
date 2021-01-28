import React from 'react'
import { Image } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const Icon = () => <></>

export const DirectionsBike = () => <MaterialIcon name="directions-bike" size={30} color="#000000" />
Icon.DirectionsBike = DirectionsBike

export const ElectricBike = () => <MaterialIcon name="electric-bike" size={30} color="#000000" />
Icon.ElectricBike = ElectricBike

export const ErrorOutline = () => <MaterialIcon name="error-outline" size={30} color="#000000" />
Icon.ErrorOutline = ErrorOutline

export const Menu = () => <MaterialIcon name="menu" size={30} color="#000000" />
Icon.Menu = Menu

export const Schedule = () => <MaterialIcon name="schedule" size={30} color="#000000" />
Icon.Schedule = Schedule

export const Road = () => <MaterialIcon name="theaters" size={30} color="#000000" />
Icon.Road = Road

export const Add = () => <MaterialIcon name="add" size={30} color="#000000" />
Icon.Add = Add

export const Navigation = () => <MaterialIcon name="navigation" size={30} color="#000000" />
Icon.Navigation = Navigation

import { images } from "constants"
export const Check = () => <Image style={{ width: 30, height: 30 }} source={images.check_circle}/>
Icon.Check = Check

export const Person = (props) => <FontAwesome name="circle" size={props.size} color={props.color} />
Icon.Person = Person