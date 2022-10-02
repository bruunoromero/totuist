import React from "react"
import { Box, Text, useInput } from "ink"
import { useTasks } from "../../hooks/task"
import { useScreen } from "../../hooks/screen"

type TaskListProps = { projectId?: string }

export const TaskList: React.FC<TaskListProps> = () => {
	const tasks = useTasks()
	const [screen, setScreen] = useScreen()

	useInput(
		(input) => {
			if (input === "h") {
				setScreen("projects")
			}
		},
		{ isActive: screen === "tasks" },
	)

	return (
		<Box>
			{tasks?.map((task) => {
				return (
					<Box>
						<Text>{task.content}</Text>
					</Box>
				)
			})}
		</Box>
	)
}
