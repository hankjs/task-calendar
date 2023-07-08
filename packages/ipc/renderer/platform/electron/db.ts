import { TaskDB } from "../../../interface/db";

export class TaskFileDB<State> extends TaskDB<State> {
  get<K extends keyof State>(key: K): Promise<State[K]> {
    throw new Error("Method not implemented.");
  }
  set<K extends keyof State>(key: K, val: State[K]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
