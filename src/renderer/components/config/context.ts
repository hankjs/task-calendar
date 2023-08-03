import { InjectionKey } from "vue";
import { ConfigContext } from "./interface";

export const configInjectionKey: InjectionKey<ConfigContext> = Symbol(
    "task-calendar-config"
);
