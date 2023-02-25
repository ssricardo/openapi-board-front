/** Namespaces are simple names grouping Apis */
export interface ApiNamespace {
    name: string
}

/** Main entity, refers to a real App and its API metadata */
export interface ApiRecord {
    apiId: string,
    name: string, 
    namespace: string,
    urlAddress?: string,
    version?: string,
    source?: string
}

/** Aggregates Apis to be compared */
export interface Comparison {
    source: ApiRecord,
    compared: ApiRecord 
}

/** Maps validation errors coming from the server */
export interface AppValidationError {
    code: number, 
    cause?: string,
    errorOrigin: string
}

/** Refers to samples/examples */
export interface RequestSampleTO {
    requestId?: number,
    apiId?: string;
    sameNamespaceOnly?: boolean;
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
    PATCH = "PATCH",    
}

export class HttpMethodValue {

    static valueOf(strValue: string | undefined): HttpMethod {
        if (!strValue) {
            throw TypeError("valueOf expects a non-null value")
        }
        return (<any> HttpMethod)[strValue]
    }
}

export interface QueryResult<R> {
    result: Array<R>,
    complete: boolean
}


export enum ParameterType {
    QUERY = "QUERY",
    PATH = "PATH",
    MATRIX = "MATRIX",
    HEADER = "HEADER"
}

export interface ParameterMemory {
    id?: number,
    name: string,
    value: string,
    kind: ParameterType
}

export class ParameterTypeValue {

    static valueOf(strValue: string | undefined): ParameterType {
        if (!strValue) {
            throw TypeError("valueOf expects a non-null value")
        }
        return (<any> ParameterType)[strValue]
    }
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
    name: string,
    roles: Array<string>
}

export interface Subscription {
    id?: number,
    apiName: string,
    namespace?: string,
    hookAddress: string,
    onlyOnChange?:boolean,
    basePathList: Array<string>
}