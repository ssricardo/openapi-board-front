/** Concentrates paths external to this app */

class Api {
    static readonly NAMESPACES = "/namespaces";
    static readonly GET_NAMESPACE = "/:namespace";
    static readonly GET_APP = "/:namespace/:appName";
    static readonly POST_COMPARE = "/compare";
    static readonly GET_APP_VERSION = "/versions/:namespace/:appName";
    static readonly GET_API_SOURCE = "/source/:namespace/:appName";
    static readonly EXAMPLES = "/api/app/requests";
}

export class Config {
    static readonly PATH = "/api/manager";

    static readonly API = Api

    static fullPath(key: string): string {
        return Config.PATH + key;
    }
}