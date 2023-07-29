import { EventObject } from "@toast-ui/calendar";

export interface Task extends Partial<EventObject> {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string | null;
}

interface CalendarColor {
    color?: string;
    backgroundColor?: string;
    dragBackgroundColor?: string;
    borderColor?: string;
}

export interface Project extends Partial<CalendarColor> {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string | null;
}
