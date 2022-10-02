import React, { useEffect } from "react"
import { Box, useApp, useInput, useStdout } from "ink"
import { ProjectList } from "./components/ProjectList/index"
import { TaskList } from "./components/TaskList/index"
import { HintBar } from "./components/HintBar/index"
import { Container } from "./components/Container/index"
import useStdoutDimensions from "ink-use-stdout-dimensions"

export const App: React.FC = () => {
	const { exit } = useApp()
	const { write } = useStdout()
	const [_, rows] = useStdoutDimensions()

	useInput((input, _key) => {
		if (input === "q") {
			exit()
		}
	})

	useEffect(() => {
		const enterAltScreenCommand = "\x1b[?1049h"
		const leaveAltScreenCommand = "\x1b[?1049l"

		write(enterAltScreenCommand)

		process.on("exit", () => {
			process.stdout.write(leaveAltScreenCommand)
		})
	}, [write])

	return (
		<Box height={rows - 1} flexDirection="column">
			<Box flexGrow={1} flexDirection="row">
				<Box width="20%">
					<Container screen="projects">
						<ProjectList />
					</Container>
				</Box>
				<Box width="80%">
					<Container screen="tasks">
						<TaskList />
					</Container>
				</Box>
			</Box>
			<HintBar />
		</Box>
	)
}
