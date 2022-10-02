#!/usr/bin/env node
import "reflect-metadata"
import React from "react"
import { render } from "ink"
import * as system from "./system"
import { program } from "commander"
import { App } from "./App"
import { AppProvider } from "./providers/AppProvider"

const { apiToken } = program
	.option("--api-token <token>", "TodoIst api token")
	.parse()
	.opts()

system.start(apiToken)

render(
	<AppProvider>
		<App />
	</AppProvider>,
)
