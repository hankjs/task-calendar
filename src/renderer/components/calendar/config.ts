import { Options } from "@toast-ui/calendar";
import { ViewType } from "./types";

export const DEFAULT_WEEK_OPTIONS: Readonly<Options["week"]> = {
    startDayOfWeek: 0,
    dayNames: [],
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

export const DEFAULT_MONTH_OPTIONS: Readonly<Options["month"]> = {
    dayNames: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    visibleWeeksCount: 0,
    workweek: false,
    narrowWeekend: false,
    startDayOfWeek: 0,
    isAlways6Weeks: true,
    visibleEventCount: 6,
};

const DEFAULT_MONTH_DAYNAME = {
    borderLeft: "none",
    backgroundColor: "inherit",
};

const DEFAULT_MORE_VIEW = {
    border: "1px solid #d5d5d5",
    boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    width: null,
    height: null,
};

export const DEFAULT_CONFIG: Readonly<Options> = {
    defaultView: ViewType.Week,
    useFormPopup: false,
    useDetailPopup: false,
    isReadOnly: false,
    usageStatistics: false,
    eventFilter: (event) => !!event.isVisible,
    week: {
        ...DEFAULT_WEEK_OPTIONS,
    },
    month: {
        ...DEFAULT_MONTH_OPTIONS,
    },
    calendars: [],

    theme: false,
    template: false,
    gridSelection: false,
    timezone: false,
};
