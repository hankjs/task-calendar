self.onmessage = function (e) {
    switch (e.data.event) {
        case "ping":
            self.postMessage({ event: "pong" });
            break;
        default:
            break;
    }
};
