class Api {
    static readonly NAMESPACES = "/namespaces";
    static readonly GET_NAMESPACE = "/:namespace";
    static readonly GET_APP = "/:namespace/:appName";
    static readonly POST_COMPARE = "/compare";
    static readonly GET_APP_VERSION = "/versions/:namespace/:appName";
}

export class Config {
    static readonly PATH = "/api/manager";

    static readonly API = Api

    static fullPath(key: string): string {
        return Config.PATH + key;
    }
}