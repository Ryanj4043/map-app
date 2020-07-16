import Point from "ol/geom/Point";

export interface mapFeature{
    geometry: Point,
    name: string,
    description: string,
    owners: string
}