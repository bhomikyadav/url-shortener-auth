
import { AsyncLocalStorage } from "node:async_hooks";
type ContextStore = Map<string, unknown>;

export class RequestContext {
    private static storage = new AsyncLocalStorage<ContextStore>();

    static run(callback: () => void) {
        this.storage.run(new Map(), callback);
    }

    static set<T>(key: string, value: T) {
        this.storage.getStore()?.set(key, value);
    }
    static get<T>(key: string): T | undefined {
        return this.storage.getStore()?.get(key) as T | undefined;
    }

}