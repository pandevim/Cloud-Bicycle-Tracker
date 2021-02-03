import limit from "./limit"
import time from "./time"

import sms from "./sms"
import localStorage from "./localStorage"

import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"
import axios from "axios"

import length from "@turf/length"
import { lineString, round } from "@turf/helpers"
import cleanCoords from "@turf/clean-coords"

import caloriesBurnt from "calories-burnt"

export { 
	limit, 
	time,

	sms,
	localStorage,

	database,
	auth,
	axios,

	length,
	lineString,
	round,
	cleanCoords,

	caloriesBurnt
}