/** Concentrates paths external to this app */

export class Placeholder {
    static readonly NS = ":namespace";
    static readonly API_NAME = ":apiName";
    static readonly API_ID = ":apiId";
}

class Api {
    static readonly LOGIN = "/api/auth/login";
    static readonly NAMESPACES = "/namespaces";
    static readonly GET_APIS_ON_NAMESPACE = `/apis?nm=${Placeholder.NS}`;
    static readonly GET_API = `/apis/${Placeholder.API_ID}`;
    static readonly POST_COMPARE = `/apis/comparison`;
    static readonly GET_APP_VERSION = `/apis/${Placeholder.API_ID}/versions`;
    static readonly GET_API_SOURCE = `/apis/${Placeholder.API_ID}/source`;
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