/// <reference path="./Animal.ts" />
namespace mascota
{
    export class Pajaro implements IAnimal
    {
        nombre: string;
        tipo: string;
        raza: string;
        fNacimiento: string;
        velocidad:number;
        constructor(nombre:string, raza:string, fNacimiento:string, velocidad:number)
        {
            this.nombre = nombre;
            this.raza = raza;
            this.fNacimiento = fNacimiento;
            this.velocidad = velocidad;
            this.tipo = "Pajaro";
        } 
        hacerRuido()
        {
            console.log("Pio");
        }

        toJson()
        {
            return '{"tipo":"'+this.tipo+'","nombre":"'+this.nombre+'","raza":"'+this.raza+'","fNacimiento":"'+this.fNacimiento+'"}';

        }
    }
}