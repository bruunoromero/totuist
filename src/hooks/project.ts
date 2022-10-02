import { Project } from "@doist/todoist-api-typescript"
import { useCallback, useEffect } from "react"
import { useStore } from "./store"
import { useApi } from "./system"
import * as _ from "lodash/fp"
import { maybeGetprojectId, sortByOrder } from "../logic/project"

export const useProjects = (): Project[] | null => {
	const api = useApi()
	const { projects, setState } = useStore()

	const setProjects = useCallback(
		(projects: Project[]) => {
			const sortedProjects = sortByOrder(projects)
			const currentProject = maybeGetprojectId(_.first(sortedProjects))

			setState((state) => {
				state.projects = sortedProjects

				if (!state.currentProject) {
					state.currentProject = currentProject
				}
			})
		},
		[setState],
	)

	const fetchProjects = useCallback(async () => {
		const projects = await api.getProjects()
		setProjects(projects)
	}, [api, setProjects])

	useEffect(() => {
		fetchProjects()
	}, [fetchProjects])

	return projects
}

export const useCurrentProject = (): [
	string | null,
	(projectId: string) => void,
] => {
	const { currentProject, setState } = useStore()

	const setCurrentProject = useCallback(
		(projectId: string) =>
			setState((state) => {
				state.currentProject = projectId
			}),
		[setState],
	)

	return [currentProject, setCurrentProject]
}
