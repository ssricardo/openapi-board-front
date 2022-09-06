/** Concentrates paths external to this app */

export class Placeholder {
    static readonly NS = ":namespace";
    static readonly API_NAME = ":appName";
}

class Api {
    static readonly LOGIN = "/api/auth/login";
    static readonly NAMESPACES = "/namespaces";
    static readonly GET_NAMESPACE = `/namespaces/${Placeholder.NS}`;
    static readonly GET_APP = `/namespaces/${Placeholder.NS}/apis/${Placeholder.API_NAME}`;
    static readonly POST_COMPARE = "/apis/comparison";
    static readonly GET_APP_VERSION = `/namespaces/${Placeholder.NS}/apis/${Placeholder.API_NAME}/versions`;
    static readonly GET_API_SOURCE = `/namespaces/${Placeholder.NS}/apis/${Placeholder.API_NAME}/source`;
    static readonly OAB_DEFINITIONS = "/apis/self";
    static readonly EXAMPLES = "/api/requests";
    static readonly SUBSCRIPTIONS = "/api/subscriptions";
}

export class Config {
    static readonly PATH = "/api";

    static readonly API = Api;

    static readonly MAIN_NAMESPACE = "Production"

    static fullPath(key: string): string {
        return Config.PATH + key;
    }
}