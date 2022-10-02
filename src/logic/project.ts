import { Project } from "@doist/todoist-api-typescript"
import _ from "lodash/fp"

export const sortByOrder = (projects: Project[]): Project[] => {
	return _.sortBy("order", projects)
}

export const maybeGetprojectId = (project?: Project | null): string | null => {
	return project?.id ?? null
}

export const getPreviousById = (
	projects: Project[],
	id: string,
): Project | null => {
	const sortedProjects = sortByOrder(projects)
	const currentProjectIndex = _.findIndex(
		(projects) => projects.id === id,
		sortedProjects,
	)
	const nextProjectIndex = currentProjectIndex - 1

	return sortedProjects[nextProjectIndex] ?? null
}

export const getNextById = (
	projects: Project[],
	id: string,
): Project | null => {
	const sortedProjects = sortByOrder(projects)
	const currentProjectIndex = _.findIndex(
		(projects) => projects.id === id,
		sortedProjects,
	)
	const nextProjectIndex = currentProjectIndex + 1

	return sortedProjects[nextProjectIndex] ?? null
}
