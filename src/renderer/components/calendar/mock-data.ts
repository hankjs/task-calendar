// @ts-nocheck
import * as Chance from "chance";
import dayjs from "dayjs";

const chance = new Chance();

export const MOCK_CALENDARS = [
    {
        id: "1",
        name: "My Calendar",
        color: "#ffffff",
        borderColor: "#9e5fff",
        backgroundColor: "#9e5fff",
        dragBackgroundColor: "#9e5fff",
    },
    {
        id: "2",
        name: "Work",
        color: "#ffffff",
        borderColor: "#00a9ff",
        backgroundColor: "#00a9ff",
        dragBackgroundColor: "#00a9ff",
    },
    {
        id: "3",
        name: "Family",
        color: "#ffffff",
        borderColor: "#DB473F",
        backgroundColor: "#DB473F",
        dragBackgroundColor: "#DB473F",
    },
    {
        id: "4",
        name: "Friends",
        color: "#ffffff",
        borderColor: "#03bd9e",
        backgroundColor: "#03bd9e",
        dragBackgroundColor: "#03bd9e",
    },
    {
        id: "5",
        name: "Travel",
        color: "#ffffff",
        borderColor: "#bbdc00",
        backgroundColor: "#bbdc00",
        dragBackgroundColor: "#bbdc00",
    },
];

export const EVENT_CATEGORIES = ["milestone", "task"];

export function generateRandomEvent(calendar, renderStart, renderEnd) {
    function generateTime(event, renderStart, renderEnd) {
        let startDate = dayjs(renderStart.getTime());
        let endDate = dayjs(renderEnd.getTime());
        const diffDate = endDate.diff(startDate, "day");

        event.isAllday = chance.bool({ likelihood: 30 });
        if (event.isAllday) {
            event.category = "allday";
        } else if (chance.bool({ likelihood: 30 })) {
            event.category =
                EVENT_CATEGORIES[chance.integer({ min: 0, max: 1 })];
            if (event.category === EVENT_CATEGORIES[1]) {
                event.dueDateClass = "morning";
            }
        } else {
            event.category = "time";
        }

        const add = chance.integer({ min: 0, max: diffDate });
        startDate = startDate.add(add, "day");
        startDate = startDate.hour(chance.integer({ min: 0, max: 23 }));
        startDate = startDate.minute(chance.bool() ? 0 : 30);
        event.start = startDate.toDate();

        endDate = dayjs(startDate);
        if (event.isAllday) {
            endDate = endDate.add(chance.integer({ min: 0, max: 3 }), "day");
        }

        event.end = endDate
            .add(chance.integer({ min: 1, max: 4 }), "hour")
            .toDate();

        if (!event.isAllday && chance.bool({ likelihood: 20 })) {
            event.goingDuration = chance.integer({ min: 30, max: 120 });
            event.comingDuration = chance.integer({ min: 30, max: 120 });

            if (chance.bool({ likelihood: 50 })) {
                event.end = event.start;
            }
        }
    }

    function generateNames() {
        const names = [];
        let i = 0;
        const length = chance.integer({ min: 1, max: 10 });

        for (; i < length; i += 1) {
            names.push(chance.name());
        }

        return names;
    }

    const id = chance.guid();
    const calendarId = calendar.id;
    const title = chance.sentence({ words: 3 });
    const body = chance.bool({ likelihood: 20 })
        ? chance.sentence({ words: 10 })
        : "";
    const isReadOnly = chance.bool({ likelihood: 20 });
    const isPrivate = chance.bool({ likelihood: 20 });
    const location = chance.address();
    const attendees = chance.bool({ likelihood: 70 }) ? generateNames() : [];
    const recurrenceRule = "";
    const state = chance.bool({ likelihood: 50 }) ? "Busy" : "Free";
    const goingDuration = chance.bool({ likelihood: 20 })
        ? chance.integer({ min: 30, max: 120 })
        : 0;
    const comingDuration = chance.bool({ likelihood: 20 })
        ? chance.integer({ min: 30, max: 120 })
        : 0;
    const raw = {
        memo: chance.sentence(),
        creator: {
            name: chance.name(),
            avatar: chance.avatar(),
            email: chance.email(),
            phone: chance.phone(),
        },
    };

    const event = {
        id: id,
        calendarId: calendarId,
        title: title,
        body: body,
        isReadOnly: isReadOnly,
        isPrivate: isPrivate,
        location: location,
        attendees: attendees,
        recurrenceRule: recurrenceRule,
        state: state,
        goingDuration: goingDuration,
        comingDuration: comingDuration,
        raw: raw,
    };

    generateTime(event, renderStart, renderEnd);

    if (event.category === "milestone") {
        event.color = "#000";
        event.backgroundColor = "transparent";
        event.borderColor = "transparent";
        event.dragBackgroundColor = "transparent";
    }

    return event;
}

export function generateRandomEvents(viewName, renderStart, renderEnd) {
    let i, j;
    let event, duplicateEvent;
    const events = [];

    MOCK_CALENDARS.forEach(function (calendar) {
        for (i = 0; i < chance.integer({ min: 20, max: 50 }); i += 1) {
            event = generateRandomEvent(calendar, renderStart, renderEnd);
            events.push(event);

            if (i % 5 === 0) {
                for (j = 0; j < chance.integer({ min: 0, max: 2 }); j += 1) {
                    duplicateEvent = JSON.parse(JSON.stringify(event));
                    duplicateEvent.id += `-${j}`;
                    duplicateEvent.calendarId = chance
                        .integer({ min: 1, max: 5 })
                        .toString();
                    duplicateEvent.goingDuration =
                        30 * chance.integer({ min: 0, max: 4 });
                    duplicateEvent.comingDuration =
                        30 * chance.integer({ min: 0, max: 4 });
                    events.push(duplicateEvent);
                }
            }
        }
    });

    return events;
}
