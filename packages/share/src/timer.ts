export function formatSeconds(seconds: number) {
    const minute = Math.floor(seconds / 60);
    const hours = Math.floor(minute / 60);
    const second = seconds % 60;

    return `${hours}:${minute}:${second}`;
}
