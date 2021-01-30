
let events = 0
const limit = (times, callback) => {
	if (events >= times) {
  	events = 0
    callback()
  } else {
  	events++
  }
}


export { limit }