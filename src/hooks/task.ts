import { Task } from "@doist/todoist-api-typescript"
import { useCallback, useEffect } from "react"
import { useCurrentProject } from "./project"
import { useStore } from "./store"
import { useApi } from "./system"

export const useTasks = (): Task[] | null => {
	const api = useApi()
	const { tasks, setState } = useStore()
	const [currentProject] = useCurrentProject()

	const setTasksForCurrentProject = useCallback(
		(projectTasks: Task[]) => {
			if (currentProject) {
				setState((state) => {
					state.tasks[currentProject] = projectTasks
				})
			}
		},
		[currentProject, setState],
	)

	const fetchTasks = useCallback(async () => {
		if (currentProject) {
			const projectTasks = await api.getTasks({ projectId: currentProject })
			setTasksForCurrentProject(projectTasks)
		}
	}, [api, currentProject, setTasksForCurrentProject])

	useEffect(() => {
		fetchTasks()
	}, [api, currentProject, fetchTasks])

	if (!currentProject) {
		return null
	}

	return tasks[currentProject] ?? null
}
