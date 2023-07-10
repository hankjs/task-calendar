import mitt, { EventType, Handler } from "mitt";

// eslint-disable-next-line no-undef
const self: any =
    /** @type {globalThis} */ typeof global === "object"
        ? global
        : typeof globalThis === "object"
        ? globalThis
        : this;

// @ts-ignore
if (!self.document) self.document = {};

class Event {
    type: string;
    initEvent = Object;
    constructor(type: string) {
        this.type = type;
    }
}
// if (!self.document.createEvent) {
//     self.document.createEvent = function (type) {
//         let Ctor = global[type] || Event;
//         return new Ctor(type);
//     };
// }

export class MockWorker {
    private getScopeVar: any;
    private messageQueue: any[] | null = [];
    private inside = mitt();
    private outside = mitt();
    private terminated = false;
    private scope = {
        onmessage: null,
        dispatchEvent: this.inside.emit,
        addEventListener: this.inside.on,
        removeEventListener: this.inside.off,
        postMessage: (data: any) => {
            this.outside.emit("message", { data });
        },
        importScripts: () => {},
    };

    /**
     *
     * @param code only support code worker
     * @param options
     */
    constructor(code: string, options?: object) {
        this.inside.on("message", (e) => {
            if (this.terminated) return;
            let f = this.scope.onmessage || this.getScopeVar("onmessage");
            if (f) f.call(this.scope, e);
        });
        this.addEventListener = this.outside.on;
        this.removeEventListener = this.outside.off;
        this.dispatchEvent = this.outside.emit;
        this.outside.on("message", (e) => {
            if (this.onmessage) this.onmessage(e);
        });
        this.onmessage = null;
        this.postMessage = (data: any) => {
            if (this.terminated) return;
            if (this.messageQueue != null) this.messageQueue.push(data);
            else this.inside.emit("message", { data });
        };
        this.terminate = () => {
            console.warn(
                "Worker.prototype.terminate() not supported in jsdom-worker."
            );
            this.terminated = true;
            this.messageQueue = null;
        };
        this.init(code);
    }

    init(code: string) {
        try {
            let vars = "var self=this,global=self";
            for (let k in this.scope) vars += `,${k}=self.${k}`;
            this.getScopeVar = Function(
                vars +
                    ";\n" +
                    code +
                    '\nreturn function(n){return n=="onmessage"?onmessage:null;}'
            ).call(this.scope);
            let q = this.messageQueue;
            this.messageQueue = null;
            if (q) q.forEach(this.postMessage);
        } catch (error) {
            this.outside.emit("error", error);
            console.error(error);
        }
    }

    addEventListener: (
        type: string,
        handler: Handler<Record<EventType, any>[string]>
    ) => void;
    removeEventListener: any;
    dispatchEvent: any;
    onmessage: any;
    postMessage: any;
    terminate: any;
}

self.Worker = MockWorker;
