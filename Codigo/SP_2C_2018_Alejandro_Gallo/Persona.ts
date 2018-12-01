namespace Personas
{
    export class Persona
    {
        id: number;
        nombre: string;
        apellido: string;

        constructor(id:number, nombre:string, apellido:string)
        {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }
    }
}