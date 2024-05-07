import { ResenaDTO } from "./ResenaDTO";

export interface PlatoDTO{
    id : number;

    nombre: String

    descripcion: String
    
    foto:String;

    ingredientes: String

    tiempo: number;
    
    categoriaNombre: String;
	
    autor:String

    resenas: ResenaDTO[];


}
