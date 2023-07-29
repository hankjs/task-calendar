import dayjs from "dayjs";
import { EventObject, Options, TZDate } from "@toast-ui/calendar";
import { DEFAULT_DAY_NAMES } from "./date";

export type TimeUnit = "second" | "minute" | "hour" | "date" | "month" | "year";

export interface TemplateTimeGridHourLabel {
    hidden: boolean;
    hour: number;
    minutes: number;
}

export interface TemplateNow {
    unit: TimeUnit;
    time: TZDate;
    format: string;
}

export interface TemplateMonthGrid {
    date: string;
    day: number;
    hiddenEventCount: number;
    isOtherMonth: boolean;
    isToday: boolean;
    month: number;
    ymd: string;
}
export interface TemplateMoreTitleDate {
    ymd: string;
    date: number;
    day: number;
}

export interface TemplateWeekDayName {
    date: number;
    day: number;
    dayName: string;
    isToday: boolean;
    renderDate: string;
    dateInstance: TZDate;
}

export interface TemplateMonthDayName {
    day: number;
    label: string;
}

/**
 * If display label does not exist in the timezone options,
 * timezone offset based on timezone name will be passed
 */
export type TemplateTimezone =
    | { displayLabel: string; timezoneOffset: null }
    | { displayLabel: null; timezoneOffset: number };

const SIXTY_MINUTES = 60;

function isUndefined(value: unknown): value is undefined {
    return typeof value === "undefined";
}

export function isNil(value: unknown): value is null | undefined {
    return isUndefined(value) || value === null;
}

export function isPresent<T>(value: T | null | undefined): value is T {
    return !isNil(value);
}

function stripTags(str: string) {
    return str.replace(/<([^>]+)>/gi, "");
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function leadingZero(number: number, length: number): string {
    let zero = "";
    let i = 0;

    if (String(number).length > length) {
        return String(number);
    }

    for (; i < length - 1; i += 1) {
        zero += "0";
    }

    return (zero + number).slice(length * -1);
}

export function getDayName(day: number) {
    return DEFAULT_DAY_NAMES[day];
}

/**
 * [Document](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/template.md#template)
 */
export const DEFAULT_TEMPLATE: Readonly<Options["template"]> = {
    milestoneTitle() {
        return `<span class="task-calendar-milestone_title">Milestone</span>`;
    },

    taskTitle() {
        return `<span class="task-calendar-task_title">Task</span>`;
    },

    alldayTitle() {
        return `<span class="task-calendar-allday_title">All Day</span>`;
    },

    milestone(model: EventObject) {
        return `<span class="toastui-calendar-icon ic-milestone" />
        <span style:"background-color: ${model.backgroundColor};">${stripTags(
            model.title
        )}</span>`;
    },

    task(model: EventObject) {
        return `#${model.title}`;
    },

    allday(model: EventObject) {
        return stripTags(model.title);
    },

    time(model: EventObject) {
        const { start, title } = model;

        if (start) {
            return `
                <span>
                    <strong>${dayjs(start.toString()).format(
                        "HH:mm"
                    )}</strong>&nbsp;
                    <span>${stripTags(title)}</span>
                </span>
            `;
        }

        return stripTags(title);
    },

    goingDuration(model: EventObject) {
        const { goingDuration } = model;
        const hour = Math.floor(goingDuration / SIXTY_MINUTES);
        const minutes = goingDuration % SIXTY_MINUTES;

        return `GoingTime ${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
    },

    comingDuration(model: EventObject) {
        const { comingDuration } = model;
        const hour = Math.floor(comingDuration / SIXTY_MINUTES);
        const minutes = comingDuration % SIXTY_MINUTES;

        return `ComingTime ${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
    },

    monthMoreTitleDate(moreTitle: TemplateMoreTitleDate) {
        const { date, day } = moreTitle;

        const dayName = capitalize(getDayName(day));

        return `
            <span class="toastui-calendar-more-title-date">${date}</span>
            <span class="toastui-calendar-more-title-day">${dayName}</span>
        `;
    },

    monthMoreClose() {
        return "";
    },

    monthGridHeader(model: TemplateMonthGrid) {
        const date = parseInt(model.date.split("-")[2], 10);

        return `<span class="toastui-calendar-weekday-grid-date ${
            model.isToday ? "toastui-calendar-weekday-grid-date-decorator" : ""
        }">${date}</span>`;
    },

    monthGridHeaderExceed(hiddenEvents: number) {
        return `<span class="toastui-calendar-weekday-grid-more-events">${hiddenEvents} more</span>`;
    },

    monthGridFooter(_model: TemplateMonthGrid) {
        return "";
    },

    monthGridFooterExceed(_hiddenEvents: number) {
        return "";
    },

    monthDayName(model: TemplateMonthDayName) {
        return model.label;
    },

    weekDayName(model: TemplateWeekDayName) {
        return `
            <span class="toastui-calendar-day-name__date">${model.date}</span>&nbsp;&nbsp;
            <span class="toastui-calendar-day-name__name">${model.dayName}</span>
        `;
    },

    weekGridFooterExceed(hiddenEvents: number) {
        return `+${hiddenEvents}`;
    },

    collapseBtnTitle() {
        return `<span class="toastui-calendar-collapse-btn-icon" />`;
    },

    timezoneDisplayLabel({ displayLabel, timezoneOffset }: TemplateTimezone) {
        if (isNil(displayLabel) && isPresent(timezoneOffset)) {
            const sign = timezoneOffset < 0 ? "-" : "+";
            const hours = Math.abs(timezoneOffset / SIXTY_MINUTES);
            const minutes = Math.abs(timezoneOffset % SIXTY_MINUTES);

            return `GMT${sign}${leadingZero(hours, 2)}:${leadingZero(
                minutes,
                2
            )}`;
        }

        return displayLabel as string;
    },

    timegridDisplayPrimaryTime(props: TemplateNow) {
        const { time } = props;

        return dayjs(time.toString()).format("HH:mm");
    },

    timegridDisplayTime(props: TemplateNow) {
        const { time } = props;

        return dayjs(time.toString()).format("HH:mm");
    },

    timegridNowIndicatorLabel(timezone: TemplateNow) {
        const { time, format = "HH:mm" } = timezone;

        return dayjs(time.toString()).format(format);
    },

    popupIsAllday() {
        return "All day";
    },

    popupStateFree() {
        return "Free";
    },

    popupStateBusy() {
        return "Busy";
    },

    titlePlaceholder() {
        return "Subject";
    },

    locationPlaceholder() {
        return "Location";
    },

    startDatePlaceholder() {
        return "Start date";
    },

    endDatePlaceholder() {
        return "End date";
    },

    popupSave() {
        return "Save";
    },

    popupUpdate() {
        return "Update";
    },

    popupEdit() {
        return "Edit";
    },

    popupDelete() {
        return "Delete";
    },

    popupDetailTitle({ title }: EventObject) {
        return title;
    },

    popupDetailDate({ isAllday, start, end }: EventObject) {
        const dayFormat = "YYYY.MM.DD";
        const timeFormat = "hh:mm tt";
        const detailFormat = `${dayFormat} ${timeFormat}`;
        const startDate = dayjs(start.toString()).format(
            isAllday ? dayFormat : timeFormat
        );
        const isSame = dayjs(start.toString()).isSame(dayjs(end.toString()));
        const endDateFormat = isSame ? timeFormat : detailFormat;

        if (isAllday) {
            return `${startDate}${
                isSame ? "" : ` - ${dayjs(end.toString()).format(dayFormat)}`
            }`;
        }

        return `${dayjs(start.toString()).format(detailFormat)} - ${dayjs(
            end.toString()
        ).format(endDateFormat)}`;
    },

    popupDetailLocation({ location }: EventObject) {
        return location;
    },

    popupDetailAttendees({ attendees = [] }: EventObject) {
        return attendees.join(", ");
    },

    popupDetailState({ state }: EventObject) {
        return state || "Busy";
    },

    popupDetailRecurrenceRule({ recurrenceRule }: EventObject) {
        return recurrenceRule;
    },

    popupDetailBody({ body }: EventObject) {
        return body;
    },
};
