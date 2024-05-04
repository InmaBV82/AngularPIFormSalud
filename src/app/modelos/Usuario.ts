export class Usuario {
    id?: number;//? significa que es opcional porque es autoincrementable en la BD
    nombre: string;
    email: string;
    password?: string;
    rol?: string;

    constructor(
        nombre: string,
        email: string,
        password: string,
        rol: string = 'usuario'  // Valor predeterminado para rol
    ) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
}