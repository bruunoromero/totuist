import { Box } from "ink"
import React, { PropsWithChildren } from "react"
import { useScreen } from "../../hooks/screen"
import { containerBorderColor } from "../../logic/container"
import { Screen } from "../../providers/AppProvider"

type ContainerProps = { screen?: Screen }

export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
	children,
	screen,
}) => {
	const [currentScreen] = useScreen()

	return (
		<Box
			flexGrow={1}
			borderStyle="round"
			borderColor={containerBorderColor(currentScreen, screen)}
		>
			{children}
		</Box>
	)
}
