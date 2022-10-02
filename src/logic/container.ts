import { Screen } from "../providers/AppProvider"

export const containerBorderColor = (
	currentScreen: Screen,
	expectedScreen?: Screen,
): string => {
	if (currentScreen === expectedScreen) {
		return "greenBright"
	}

	return "white"
}
