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