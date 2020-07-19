/** Namespaces are simple names grouping Apps */
export interface AppNamespace {
    name: string
}

/** Main entity, refers to a real App and its API metadata */
export interface AppRecord {
    name: string, 
    namespace: string,
    urlAddress?: string,
    version?: string,
    source?: string
}

/** Agregates Apps to be compared */
export interface Comparison {
    source: AppRecord,
    compared: AppRecord 
}

/** Maps validation errors comming from the server */
export interface AppValidationError {
    code: number, 
    cause?: string,
    rapp: string
}

/** Refers to memory/examples */
export interface RequestMemoryTO {
    requestId?: number,
    appName?: string;
    namespace?: string;
    path?: string;
    title?: string,
    body?: string,
    methodType?: HttpMethod,
    parameters?: Array<ParameterMemory>,
    requestHeaders?: Array<ParameterMemory>
}

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

export interface QueryResult<R> {
    result: Array<R>,
    complete: boolean
}

export interface ParameterMemory {
    id?: number,
    name: string,
    value: string,
    kind: HttpMethod
}

export enum ParameterType {
    QUERY = "QUERY",
    PATH = "PATH",
    MATRIX = "MATRIX",
    HEADER = "HEADER"
}

export interface KeyValueString {
    key:string,
    value:string
}

export interface LoginData {
    user: string,
    password: string
}

export interface LoggedUser {
}

export interface AlertSubscriber {
    id?: number,
    appId: number,
    appName: string,
    email: string,
    basePathList: Array<string>
}