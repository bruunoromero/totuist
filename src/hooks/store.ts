import { useContext } from "react"
import { appContext, Store } from "../providers/AppProvider"

export const useStore = (): Store => {
	return useContext<Store>(appContext)
}
