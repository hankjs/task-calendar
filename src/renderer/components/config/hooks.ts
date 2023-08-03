import { inject } from "vue";
import { configInjectionKey } from "./context";

export function useConfig() {
    return inject(configInjectionKey)!;
}
