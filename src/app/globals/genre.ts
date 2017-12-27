import { Station } from "./station";

export class Genre{
    id: string;
    name: string;
    stations: Station[]

    constructor(id:string,name:string,stations:Station[]=[]){
        this.id = id
        this.name = name
        this.stations = stations
    }

    getName():string{
        return this.name
    }

    getStations():Station[]{
        return this.stations
    }

    getStationsCount():number{
        return this.stations.length
    }

    hasStation(station:Station):boolean{
        return this.stations.indexOf(station) != -1 
    }
}