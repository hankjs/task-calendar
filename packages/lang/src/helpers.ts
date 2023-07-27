import en from "./locale/en";
import zhCN from "./locale/zh-cn";

type Locale = typeof en;
type LocaleKey = keyof Locale;

const localeMap: { [k: string]: Partial<Locale> } = {
    en,
    zh: zhCN,
};

const lang = window.localStorage.getItem("language");
const locale = localeMap[lang || "en"];

export function t<K extends LocaleKey>(key: K): Locale[K] {
    if (!locale) {
        console.error("Error: Calendar locale not found", lang);
    }

    return en[key];
    //   return (locale && locale[key]) || en[key];
}
