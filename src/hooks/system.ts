import { container, InjectionToken } from "tsyringe"

export const useSystem = <T>(token: InjectionToken<T>): T => {
	return container.resolve<T>(token)
}
