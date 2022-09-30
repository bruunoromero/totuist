#!/usr/bin/env node
import "reflect-metadata"
import React from "react"
import { render } from "ink"
import * as system from "./system"
import { program } from "commander"
import { App } from "./App"
import { SWRConfig } from "swr"

const { apiToken } = program
	.option("--api-token <token>", "TodoIst api token")
	.parse()
	.opts()

system.start(apiToken)

render(
	<SWRConfig
		value={{
			refreshInterval: 5 * 60 * 1000,
		}}
	>
		<App />
	</SWRConfig>,
)
