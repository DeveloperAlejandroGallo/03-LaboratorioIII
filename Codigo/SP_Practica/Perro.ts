/// <reference path="./Animal.ts" />
namespace mascota
{
    export class Perro implements Animal
    {
        nombre: string;
        type: string = "Perro";
        constructor(nombre:string)
        {
            this.nombre = nombre;
        } 
        hacerRuido()
        {
            console.log("Guauuuu");
        }

        toJson()
        {
            return '{"tipo":"'+this.type+'","nombre":"'+this.nombre+'"}';
        }
    }
}