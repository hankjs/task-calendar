import { Database } from "./Database";
import DB from "better-sqlite3";

export class Sqlite3 extends Database {
    onAttach(): void {
        this.#db = new DB("sqlite3.db", {
            verbose: console.log,
            nativeBinding:
                "./node_modules/better-sqlite3/build/Release/better_sqlite3.node",
        });
        this.#db.pragma("journal_mode = WAL");
    }

    onDetach(): void {
        this.#db?.close();
    }

    #db?: DB.Database;
}
