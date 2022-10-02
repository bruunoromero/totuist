import { Project, Task } from "@doist/todoist-api-typescript"
import React, {
	createContext,
	PropsWithChildren,
	useCallback,
	useState,
} from "react"
import produce from "immer"

export type Screen = "projects" | "tasks"

export type State = {
	screen: Screen
	projects: Project[] | null
	tasks: Record<string, Task[]>
	currentProject: string | null
	currentTask: string | null
}

export type Setter = {
	setState: (setter: (state: State) => void) => void
}

export type Store = State & Setter

export const appContext = createContext<Store>({
	tasks: {},
	screen: "projects",
	projects: null,
	currentProject: null,
	currentTask: null,
	setState: () => {},
})

const { Provider } = appContext

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, setState] = useState<State>({
		tasks: {},
		screen: "projects",
		projects: null,
		currentProject: null,
		currentTask: null,
	})

	const immerSetState = useCallback(
		(setter: (state: State) => void) => {
			setState(produce(setter))
		},
		[setState],
	)

	return (
		<Provider value={{ ...state, setState: immerSetState }}>
			{children}
		</Provider>
	)
}
