/** Concentrates paths external to this app */

class Api {
    static readonly LOGIN = "/api/auth/login";
    static readonly NAMESPACES = "/namespaces";
    static readonly GET_NAMESPACE = "/namespaces/apps?nm=:namespace";
    static readonly GET_APP = "/apps?nm=:namespace&app=:appName";
    static readonly POST_COMPARE = "/compare";
    static readonly GET_APP_VERSION = "/versions?nm=:namespace&app=:appName";
    static readonly GET_API_SOURCE = "/source?nm=:namespace&app=:appName";
    static readonly OAB_DEFINITIONS = "/describe";
    static readonly EXAMPLES = "/api/app/requests";
}

export class Config {
    static readonly PATH = "/api/manager";

    static readonly API = Api;

    static readonly MAIN_NAMESPACE = "master"

    static fullPath(key: string): string {
        return Config.PATH + key;
    }
}