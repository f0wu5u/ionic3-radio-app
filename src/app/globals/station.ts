export class Station{
    id: string;
    name: string;
    port: number;

    private mp3Ext:string = '_128k.mp3'
    private aacExt:string = '_64k.aac'

    constructor(id:string,name:string,port:number){
        this.id = id
        this.name = name
        this.port = port
    }

    getID():string{
        return this.id
    }

    getName():string{
        return this.name
    }

    getMP3PlaybackURL():string{
        return this.id+this.mp3Ext;
    }

    getAACPlaybackURL():string{
        return this.id+this.aacExt
    }

    getPlaybackFallbackPort():number{
        return this.port
    }
}
