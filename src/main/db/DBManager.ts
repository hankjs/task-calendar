import { Database } from "./Database";
import { Sqlite3 } from "./Sqlite3";
export class DBManager {
    #db: Database = new Sqlite3();

    constructor() {
        this.#db.onAttach();
    }

    list() {
        return [];
    }
}
