export interface Observation {
     d:string,
    [key: string]:Object
}

export interface RawData{
    terms:object,
    seriesDetail:object,
    observations:Observation[]
}