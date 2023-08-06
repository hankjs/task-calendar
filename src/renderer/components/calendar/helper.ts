export function findTimeElement(target: HTMLElement): HTMLElement | null {
    let parent: HTMLElement | null = target;
    while (parent !== null) {
        if (parent.classList.contains("toastui-calendar-event-time")) {
            break;
        }
        parent = parent.parentElement;
    }
    return parent;
}
