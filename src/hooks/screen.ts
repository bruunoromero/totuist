import { useCallback } from "react"
import { Screen } from "../providers/AppProvider"
import { useStore } from "./store"

export const useScreen = (): [Screen, (screen: Screen) => void] => {
	const { screen, setState } = useStore()

	const setScreen = useCallback(
		(screen: Screen) =>
			setState((state) => {
				state.screen = screen
			}),
		[setState],
	)

	return [screen, setScreen]
}
