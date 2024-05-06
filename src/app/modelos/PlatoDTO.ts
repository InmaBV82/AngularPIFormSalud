import { resenaDTO } from "./ResenaDTO";

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

   expanded?: boolean; // Opcional, usado para controlar la visibilidad de las reseñas

}
    
    export interface ResenaDTO {
        comentario: string;
        puntuacion: number;
    }