import { useMemo } from "react"
import { container, InjectionToken } from "tsyringe"
import { Todoist } from "../system"

export const useSystem = <T>(token: InjectionToken<T>): T => {
	return useMemo(() => container.resolve<T>(token), [token])
}

export const useApi = (): Todoist => {
	return useSystem(Todoist)
}
