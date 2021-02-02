import { Icon } from "./icons"
import images from "./images"
import { COLORS, SIZES, FONTS } from "./theme"

const PATTERN = {
	email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	password: /^[a-zA-Z0-9]{6,}$/
	// /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
	// Password must be:
	// 1. At least one upper case English letter
	// 2. At least one lower case English letter
	// 3. At least one digit
	// 4. At least one special character
	// 5. Minimum eight in length
}

export { Icon, images, COLORS, SIZES, FONTS, PATTERN }
