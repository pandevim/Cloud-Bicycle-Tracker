import AppContext from "context/app-context.js"

import React, { useState, useContext, useEffect } from "react"
import { Text, View, StyleSheet, ScrollView } from "react-native"

import { useStopwatch } from "react-timer-hook"

import { Icon } from "constants"
import { time, length, cleanCoords, lineString, caloriesBurnt } from "utils"

const Metrics = (props) => {
  const { journey, user } = useContext(AppContext)

  const {data: [path, speed]} = {data: useState(0), ...(props.state || [])}
  const [elapsedTime, setElapsedTime] = useState("00:00:00")
  const [maxSpeed, setMaxSpeed] = useState(0)
  const [calories, setCalories] = useState(0)
  const [distance, setDistance] = useState(0)

  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({ autoStart: false })

  const weight = parseFloat(user.weight)
  const rhr = parseFloat(user.rhr)
  const age = parseInt(user.age)

  useEffect(() => {
    if (journey) setCalories(getCalories(distance, age, rhr, weight))
  }, [distance])

  const getCalories = (distance, age, rhr, weight) => {
    return caloriesBurnt({
      meters: distance*1000,
      slope: 0,
      age: age,
      restingHeartBeatsPerMinute: rhr,
      kilograms: weight
    })

    // return round((bmr*mets)/(24*time.toHour(elapsedTime)), 2)
  }

  useEffect(() => {
    if (journey && path.length>=2) setDistance(length(cleanCoords(lineString(path))))
  }, [path])

  useEffect(() => {
    setElapsedTime(time.toHourMinSec(hours, minutes, seconds))
  }, [seconds])

  useEffect(() => {
    if (journey) {
      reset()
      start()
    } else {
      pause()
    }
  }, [journey])

  useEffect(() => {
    if (speed > maxSpeed) setMaxSpeed(speed)
  }, [speed])

  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.item}>
        <Icon.Time style={styles.icon} />
        <View style={styles.info}>
         <Text style={styles.value}>{ elapsedTime }</Text>
         <Text style={styles.title}>Estimated Time</Text>
        </View>
      </View>
      <View style={styles.item}>
        <Icon.DirectionsBike style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.value}>{ speed }m/s</Text>
          <Text style={styles.title}>Current Speed</Text>
        </View>
      </View>
      <View style={styles.item}>
        <Icon.Distance style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.value}>{ distance }km</Text>
          <Text style={styles.title}>Distance</Text>
        </View>
      </View>
      <View style={styles.item}>
        <Icon.Speed style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.value}>{ maxSpeed }m/s</Text>
          <Text style={styles.title}>Max Speed</Text>
        </View>
      </View>
      <View style={styles.item}>
        <Icon.Calories style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.value}>{ calories }kcal</Text>
          <Text style={styles.title}>Calories Burn</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    maxHeight: 100,
    marginBottom: 5,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-evenly',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    minWidth: 200
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: "center",
    margin: 15
  },
  value: {
    fontSize: 20,
    fontWeight: '500'
  },
  info: {},
  title: {}
})

export default Metrics