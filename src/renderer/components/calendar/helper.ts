export function findTimeElement(target: HTMLElement): HTMLElement | null {
    let parent: HTMLElement | null = target;
    while (parent !== null) {
        if (parent.dataset.eventId) {
            break;
        }
        parent = parent.parentElement;
    }
    return parent;
}
