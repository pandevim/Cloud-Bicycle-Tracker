let events = 0
export default limit = (times, callback) => {
	if (events == 0) {
		events = 1
		callback()
	} else if (events >= times) {
  	events = 0
    callback()
  } else {
  	events++
  }
}