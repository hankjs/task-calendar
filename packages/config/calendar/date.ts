import { Options } from "@toast-ui/calendar";

export const DEFAULT_DAY_NAMES = [
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
] as [string, string, string, string, string, string, string];

/**
 * [Document](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#week)
 */
export const DEFAULT_WEEK_OPTIONS: Readonly<Options["week"]> = {
    startDayOfWeek: 0,
    dayNames: DEFAULT_DAY_NAMES,
    narrowWeekend: false,
    workweek: false,
    showNowIndicator: true,
    showTimezoneCollapseButton: false,
    timezonesCollapsed: false,
    hourStart: 0,
    hourEnd: 24,
    eventView: true,
    taskView: true,
    collapseDuplicateEvents: false,
};

/**
 * [Document](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#month)
 */
export const DEFAULT_MONTH_OPTIONS: Readonly<Options["month"]> = {
    dayNames: DEFAULT_DAY_NAMES,
    visibleWeeksCount: 0,
    workweek: false,
    narrowWeekend: false,
    startDayOfWeek: 0,
    isAlways6Weeks: true,
    visibleEventCount: 6,
};
