import fs from "fs-extra";
import {normalize} from "path"
import { MockWorker } from "./worker.mock";

export class VitestWorker extends MockWorker {
    constructor(url: string | URL, options?: object) {
        let code = url as string;
        if (url instanceof URL) {
            const path = url.href.replace("file:///", "")
            code = fs.readFileSync(normalize(path), "utf-8");
        }

        super(code, options)
    }
}
