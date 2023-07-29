import { Options } from "@toast-ui/calendar";
import { DEFAULT_THEME } from "./theme";
import { DEFAULT_MONTH_OPTIONS, DEFAULT_WEEK_OPTIONS } from "./date";
import { DEFAULT_TEMPLATE } from "./template";
import { DEFAULT_TIMEZONE } from "./timezone";

/**
 * [Document](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#defaultview)
 */
export enum ViewType {
    Month = "month",
    Week = "week",
    Day = "day",
}
/**
 * [Document](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#gridselection)
 */
export const DEFAULT_GRID_SELECTION = {
    enableDblClick: true,
    enableClick: true,
};

/**
 * [Document](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#options)
 */
export const DEFAULT_CONFIG: Readonly<Options> = {
    defaultView: ViewType.Day,
    /** use custom popup */
    useFormPopup: false,
    /** use custom popup */
    useDetailPopup: false,
    isReadOnly: false,
    /** Not Needing */
    usageStatistics: false,
    /**
     * [Document](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#eventfilter)
     */
    eventFilter: (event) => !!event.isVisible,
    week: {
        ...DEFAULT_WEEK_OPTIONS,
    },
    month: {
        ...DEFAULT_MONTH_OPTIONS,
    },
    calendars: [],
    gridSelection: {
        ...DEFAULT_GRID_SELECTION,
    },

    theme: {
        common: {
            ...DEFAULT_THEME.common,
        },
        week: {
            ...DEFAULT_THEME.week,
        },
        month: {
            ...DEFAULT_THEME.month,
        },
    },
    template: {
        ...DEFAULT_TEMPLATE,
    },
    timezone: DEFAULT_TIMEZONE,
};
