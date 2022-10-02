import { Project } from "@doist/todoist-api-typescript"
import { Box, Text, useInput } from "ink"
import React, { useCallback } from "react"
import { useCurrentProject, useProjects } from "../../hooks/project"
import { useScreen } from "../../hooks/screen"
import {
	getNextById,
	getPreviousById,
	maybeGetprojectId,
} from "../../logic/project"

type ProjectItemProps = {
	project: Project
	isFocused: boolean
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, isFocused }) => {
	return (
		<Box key={project.id}>
			<Text bold={isFocused}>
				{project.name} {project.id}
			</Text>
		</Box>
	)
}

type ListProps = {
	projects: Project[]
	currentProject: string
}

const List: React.FC<ListProps> = ({ projects, currentProject }) => {
	return (
		<Box flexDirection="column">
			{projects.map((project) => (
				<ProjectItem
					key={project.id}
					project={project}
					isFocused={project.id === currentProject}
				/>
			))}
		</Box>
	)
}

const Empty: React.FC = () => {
	return (
		<Box>
			<Text>empty</Text>
		</Box>
	)
}

type ContainerProps = {
	projects: Project[] | null
	currentProject: string | null
}

const Container: React.FC<ContainerProps> = ({ projects, currentProject }) => {
	return (
		<Box>
			{projects && currentProject ? (
				<List projects={projects} currentProject={currentProject} />
			) : (
				<Empty />
			)}
		</Box>
	)
}

export const ProjectList: React.FC = () => {
	const projects = useProjects()
	const [screen, setScreen] = useScreen()
	const [currentProject, setCurrentProject] = useCurrentProject()

	const focusNext = useCallback(() => {
		if (projects && currentProject) {
			const nextProject = getNextById(projects, currentProject)
			const nextProjectId = maybeGetprojectId(nextProject)

			if (nextProjectId) {
				setCurrentProject(nextProjectId)
			}
		}
	}, [projects, currentProject, setCurrentProject])

	const focusPrevious = useCallback(() => {
		if (projects && currentProject) {
			const previousProject = getPreviousById(projects, currentProject)
			const previousProjectId = maybeGetprojectId(previousProject)

			if (previousProjectId) {
				setCurrentProject(previousProjectId)
			}
		}
	}, [projects, currentProject, setCurrentProject])

	useInput(
		(input, key) => {
			if (input === "j") {
				return focusNext()
			}

			if (input === "k") {
				return focusPrevious()
			}

			if (input === "l") {
				return setScreen("tasks")
			}

			if (key.return && currentProject) {
				return setScreen("tasks")
			}
		},
		{ isActive: screen === "projects" },
	)

	return <Container projects={projects} currentProject={currentProject} />
}
