export interface TimezoneConfig {
    timezoneName: string;
    displayLabel?: string;
    tooltip?: string;
}

export interface TimezoneOptions {
    zones?: TimezoneConfig[];
    customOffsetCalculator?: (
        timezoneName: string,
        timestamp: number
    ) => number;
}

/**
 * [Document](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#timezone)
 */
export const DEFAULT_TIMEZONE: TimezoneOptions = {};
