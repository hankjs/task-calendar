export type Settings = {
  alwaysOnTop: boolean;
  breakAlwaysOnTop: boolean;
  autoStartWorkTimer: boolean;
  autoStartBreakTimer: boolean;
  minToTray: boolean;
  minToTrayOnClose: boolean;
  notifications: boolean;
  workRounds: number;
  theme: null;
  tickSounds: boolean;
  tickSoundsDuringBreak: boolean;
  timeLongBreak: number;
  timeShortBreak: number;
  timeWork: number;
  volume: number;
  globalShortcuts: Record<string, string>;
};

/**
 * Returns a default user-settings object.
 *
 * @returns {object} The default user-settings.
 */
export function genSettings(): Settings {
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
  };
}

export abstract class TaskDB<State> {
  /**
   * @params str filename, prefix localstorage
   */
  constructor(str: string, initialState?: State) {}

  abstract get<K extends keyof State>(key: K): Promise<State[K]>;

  /**
   * Set and store a key-value pair in local storage data.
   */
  abstract set<K extends keyof State>(key: K, val: State[K]): Promise<void>;
}
