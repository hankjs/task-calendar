import { Ref, shallowRef, watch } from "vue";
import Calendar, { EventObject } from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { DEFAULT_CONFIG, ViewType } from "@task/config/calendar";
import {
    CalendarEmits,
    CalendarProps,
    DayNameInfo,
    EventInfo,
    MoreEventsButton,
    SelectDateTimeInfo,
    UpdatedEventInfo,
} from "./props";

export function useCalendar(
    refEl: Ref<Element | null>,
    props: CalendarProps,
    emits: CalendarEmits
) {
    const calendar = shallowRef<Calendar | null>(null);

    function renderEvents(events?: EventObject[]) {
        calendar.value?.clear();
        if (!events) {
            return;
        }
        calendar.value?.createEvents(events);
    }

    async function renderCalendar(el: Element | null) {
        if (!el) {
            return;
        }

        const cal = new Calendar(el as Element, {
            ...DEFAULT_CONFIG,
            calendars: props.calendars,
        });
        cal.on("selectDateTime", (info: SelectDateTimeInfo) => {
            if (info.gridSelectionElements.length > 0) {
                emits("selectDateTime", info);
            }
            cal.clearGridSelections();
        });
        cal.on("beforeCreateEvent", (event: EventObject) => {
            emits("beforeCreateEvent", event);
        });
        cal.on("beforeUpdateEvent", (updatedEventInfo: UpdatedEventInfo) => {
            emits("beforeUpdateEvent", updatedEventInfo);
        });
        cal.on("beforeDeleteEvent", (event: EventObject) => {
            emits("beforeDeleteEvent", event);
        });
        cal.on("afterRenderEvent", (event: EventObject) => {
            emits("afterRenderEvent", event);
        });

        cal.on("clickDayName", (dayNameInfo: DayNameInfo) => {
            emits("clickDayName", dayNameInfo);
        });
        cal.on("clickEvent", (eventInfo: EventInfo) => {
            emits("clickEvent", eventInfo);
        });
        cal.on("clickMoreEventsBtn", (moreEventsBtnInfo: MoreEventsButton) => {
            emits("clickMoreEventsBtn", moreEventsBtnInfo);
        });
        cal.on("clickTimezonesCollapseBtn", (prevCollapsedState: boolean) => {
            emits("clickTimezonesCollapseBtn", prevCollapsedState);
        });

        calendar.value = cal;
        renderEvents(props.events);
    }

    watch(
        () => props.view,
        (view) => {
            if (!view) {
                return;
            }

            calendar.value?.changeView(view);
        }
    );

    watch(() => props.events, renderEvents);

    watch(() => refEl.value, renderCalendar);

    watch(
        () => props.calendars,
        (calendars) => {
            if (!calendars) {
                return;
            }
            calendar.value?.setCalendars(calendars);
        }
    );

    return {
        calendar,
    };
}
