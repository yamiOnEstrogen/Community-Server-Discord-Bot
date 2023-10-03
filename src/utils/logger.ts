type ConsoleMethod = "log" | "info" | "warn" | "error";

class ConsoleLogger {
    private ogConsoleMethods: { [key in ConsoleMethod]: (...args: any[]) => void };

    constructor() {
        this.ogConsoleMethods = {
            log: console.log,
            info: console.info,
            warn: console.warn,
            error: console.error,
        };
    }

    public start(): void {
        console.log = (...args: any[]) => this.log("log", args);
        console.info = (...args: any[]) => this.log("info", args);
        console.warn = (...args: any[]) => this.log("warn", args);
        console.error = (...args: any[]) => this.log("error", args);
    }

    private log(method: ConsoleMethod, args: any[]) {
        const types = {
            log: "[+]",
            info: "[*]",
            warn: "[!]",
            error: "[!]",
        }

        this.ogConsoleMethods[method](types[method], ...args);
    }
}

export default new ConsoleLogger();