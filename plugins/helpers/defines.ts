import { Options } from "./options.type";

export function defineStringify(defines: Record<string, any>) {
  const ret = {} as Options["defines"];

  for (const k in defines) {
    switch (typeof defines[k]) {
      case "boolean":
        ret[k] = defines[k] ? "true" : "false";
        break;

      case "object":
      case "string":
        ret[k] = `"${defines[k]}"`;
        break;

      case "function":
        break;

      default:
        ret[k] = defines[k];
        break;
    }
  }
  return ret;
}
