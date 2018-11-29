/// <reference path="./Animal.ts" />
namespace mascota
{
    export class Gato implements Animal
    {
        nombre: string;
        type:string = "Gato";

        constructor(nombre:string)
        {
            this.nombre = nombre;
        } 
        hacerRuido()
        {
            console.log("Miauuuu");
        }

        toJson()
        {
            return '{"tipo":"'+this.type+'","nombre":"'+this.nombre+'"}';
        }
    }
}