import moment from "moment"

export default time = {
	toHourMinSec: (hours, minutes, seconds) => {
	  const time = moment.duration({seconds: seconds, minutes: minutes, hours: hours })
	  return moment.utc(time.asMilliseconds()).format("HH:mm:ss")
	},
	toHour: (elapsedTime) => {
	  return moment.duration(elapsedTime).asHours()
	}
}
