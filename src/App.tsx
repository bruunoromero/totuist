import React, { useEffect } from "react"
import { Box, useInput, useStdout } from "ink"
import { ProjectList } from "./components/ProjectList/index"

export const App: React.FC = () => {
	const { stdout, write } = useStdout()

	useInput((input, _key) => {
		if (input === "q") {
			process.exit(0)
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
		<Box height={stdout && stdout.rows - 1} flexDirection="row">
			<Box width="50%" borderStyle="single">
				<ProjectList />
			</Box>
			<Box width="50%" borderStyle="single"></Box>
		</Box>
	)
}
