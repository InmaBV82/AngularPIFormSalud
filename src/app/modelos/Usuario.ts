export class Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
    rol?: string;//? significa que es opcional porque yo le doy un valor por defecto

    constructor(
        id: number,
        nombre: string,
        email: string,
        password: string,
        rol: string = 'usuario'  // Valor predeterminado para rol
    ) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
}