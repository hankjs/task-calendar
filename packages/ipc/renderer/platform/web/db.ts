import { TaskDB, genSettings } from "../../../interface/db";

export class TaskWebDB<State> extends TaskDB<State> {
  #state: State;
  #name: string;

  constructor(name: string, initialState?: State) {
    const remoteSettings = localStorage.getItem(name);
    let state = initialState as State;

    try {
      const parsed = JSON.parse(remoteSettings ?? "{}");
      state = parsed;
    } catch (error) {}
    super(name, state);

    this.#name = name;
    this.#state = state;
  }

  async get<K extends keyof State>(key: K): Promise<State[K]> {
    return Promise.resolve(this.#state[key]);
  }

  async set<K extends keyof State>(key: K, val: State[K]): Promise<void> {
    this.#state[key] = val;

    localStorage.setItem(this.#name, JSON.stringify(this.#state));
  }
}
