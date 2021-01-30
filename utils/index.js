
let events = 0
const limit = (times, callback) => {
	if (events >= times) {
  	events = 0
    callback()
  } else {
  	events++
  }
}

import moment from 'moment'
const formatTime = (hours, minutes, seconds) => {
  const time = moment.duration({seconds: seconds, minutes: minutes, hours: hours })
  return moment.utc(time.asMilliseconds()).format("HH:mm:ss")
}

export { limit, formatTime }