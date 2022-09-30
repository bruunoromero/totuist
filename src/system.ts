import { TodoistApi } from "@doist/todoist-api-typescript"
import { container, inject, singleton } from "tsyringe"

export const start = (apiToken: string) => {
	container.register<string>("ApiToken", { useValue: apiToken })
}

@singleton()
export class Todoist extends TodoistApi {
	constructor(@inject("ApiToken") apiToken: string) {
		super(apiToken)
	}
}
