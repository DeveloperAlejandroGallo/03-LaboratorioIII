/// <reference path="./Animal.ts" />
namespace mascota
{
    export class Gato implements IAnimal
    {
        nombre: string;
        tipo: string;
        raza: string;
        fNacimiento: string;
        constructor(nombre:string, raza:string, fNacimiento:string)
        {
            this.nombre = nombre;
            this.raza = raza;
            this.fNacimiento = fNacimiento;
            this.tipo = "Gato";
        } 
        hacerRuido()
        {
            console.log("Miauuuu");
        }

        toJson()
        {
            return '{"tipo":"'+this.tipo+'","nombre":"'+this.nombre+'","raza":"'+this.raza+'","fNacimiento":"'+this.fNacimiento+'"}';
        }
    }
}