import { ViewType } from "@task/config/calendar";
import { EventObject } from "@toast-ui/calendar";

export type CalendarProps = {
    view?: ViewType;
    events?: EventObject[];
};

export interface SelectDateTimeInfo {
    start: Date;
    end: Date;
    isAllday: boolean;
    nativeEvent?: MouseEvent;
    gridSelectionElements: Element[];
}
export interface UpdatedEventInfo {
    event: EventObject;
    changes: EventObject;
}
export interface DayNameInfo {
    date: string;
}
export interface EventInfo {
    event: EventObject;
    nativeEvent: MouseEvent;
}
export interface MoreEventsButton {
    date: Date;
    target: HTMLDivElement;
}

// prettier-ignore
export type CalendarEmits = {
    (e: "selectDateTime", info: SelectDateTimeInfo): void
    (e: "beforeCreateEvent", event: EventObject): void
    (e: "beforeUpdateEvent", info: UpdatedEventInfo): void
    (e: "beforeDeleteEvent", event: EventObject): void
    (e: "afterRenderEvent", event: EventObject): void
    (e: "clickDayName", dayNameInfo: DayNameInfo): void
    (e: "clickEvent", eventInfo: EventInfo): void
    (e: "clickMoreEventsBtn", info: MoreEventsButton): void
    (e: "clickTimezonesCollapseBtn", prevCollapsedState: boolean): void
    (e: "clickEvent", eventInfo: EventInfo): void;
    (e: "hoverEvent", eventInfo: EventInfo): void;
};
