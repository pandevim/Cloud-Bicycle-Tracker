// import moment from 'moment'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Icon } from "constants"
import AppContext from "context/app-context.js"
import { useStopwatch } from 'react-timer-hook'

const initialTime = 60 * 1000
const interval = 1000

const Metrics = () => {

  const { metrics, journey } = useContext(AppContext)

  const[elapsedTime, setElapsedTime] = useState("00:00:00")

  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false })

  useEffect(() => {
    // const time = moment.duration({seconds: seconds, minutes: minutes, hours: hours })
    // console.log(time.format('HH:mm:ss', { trim: false }))
    const formattedSeconds = seconds.toString().length >= 2 ? seconds : `0${seconds}`
    const formattedMinutes = minutes.toString().length >= 2 ? minutes : `0${minutes}`
    const formattedHours = hours.toString().length >= 2 ? hours : `0${hours}`
    setElapsedTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`)
  }, [seconds])

  useEffect(() => {
    if (journey) {
      reset()
      start()
    } else pause()
  }, [journey])

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
          <Text style={styles.value}>{ metrics.avgSpeed }m/s</Text>
          <Text style={styles.title}>Avg Speed</Text>
        </View>
      </View>
      <View style={styles.item}>
        <Icon.Distance style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.value}>{ metrics.distance }km</Text>
          <Text style={styles.title}>Distance</Text>
        </View>
      </View>
      <View style={styles.item}>
        <Icon.Speed style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.value}>{ metrics.maxSpeed }m/s</Text>
          <Text style={styles.title}>Max Speed</Text>
        </View>
      </View>
      <View style={styles.item}>
        <Icon.Calories style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.value}>{ metrics.calories }kcal</Text>
          <Text style={styles.title}>Calories</Text>
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