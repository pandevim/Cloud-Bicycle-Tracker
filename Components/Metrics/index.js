import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Carousel from 'react-native-snap-carousel'
import { Icon, SIZES } from "constants"

import AppContext from "context/app-context.js"

const Metrics = () => {

  const { metrics } = useContext(AppContext)

  const entries = [
    {
      title: "Estimated Time",
      value: `${metrics.elapsedTime}`,
      img: `<Icon.Time />`
    },
    {
      title: "Avg Speed",
      value: `${metrics.avgSpeed}m/s`,
      img: `<Icon.DirectionsBike />`
    },
    {
      title: "Distance",
      value: `${metrics.distance}km`,
      img: `<Icon.Distance />`
    },
    {
      title: "Max Speed",
      value: `${metrics.maxSpeed}m/s`,
      img: `<Icon.Speed />`
    },
    {
      title: "Calories",
      value: `${metrics.calories}kcal`,
      img: `<Icon.Calories />`
    }
  ]

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
	      <Text>{ item.img }</Text>
        <View style={styles.info}>
          <Text style={styles.value}>{ item.value }</Text>
          <Text style={styles.title}>{ item.title }</Text>
        </View>
      </View>
    )
  }

  return (
    <Carousel
      data={entries}
      renderItem={_renderItem}
      sliderWidth={SIZES.width}
      sliderHeight={100}
      itemWidth={200}
    />
  )
}

const styles = StyleSheet.create({
  container: {},
  slide: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
  },
  info: {},
  title: {},
  value: {
    fontSize: 20,
    fontWeight: '500'
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: "center"
  }
})

export default Metrics