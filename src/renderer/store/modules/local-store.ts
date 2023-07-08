/**
 * Returns a default user-settings object.
 *
 * @returns {object} The default user-settings.
 */
function generateSettings() {
  return {
    alwaysOnTop: false,
    breakAlwaysOnTop: false,
    autoStartWorkTimer: true,
    autoStartBreakTimer: true,
    minToTray: false,
    minToTrayOnClose: false,
    notifications: true,
    workRounds: 4,
    theme: null,
    tickSounds: false,
    tickSoundsDuringBreak: true,
    timeLongBreak: 15,
    timeShortBreak: 5,
    timeWork: 25,
    volume: 100,
    globalShortcuts: {
      // If new shortcuts are added, the migrations of this should be handled
      "call-timer-toggle": "Control+F1",
      "call-timer-reset": "Control+F2",
      "call-timer-skip": "Control+F3",
    },
  } as Settings;
}

export const defaults = generateSettings();

let store

export function initSettings() {
}

export function useSettingsStore() {}
