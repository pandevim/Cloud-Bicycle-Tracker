import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

export const SIZES = {
	width,
	height
}

export const COLORS = {
	// base
	primary: "",
	secondary: "",
	brand: "",
	background: "",

	// shade

	// tints

	// feedback
	success: "",
	warning: "",
	error: "",
	information: "",

	// buttons
	default: "",
	hover: "",
	active: "",
	selected: "",
	focus: ""
}

export const FONTS = {

}

export default { COLORS, SIZES, FONTS }