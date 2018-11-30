/// <reference path="./Animal.ts" />
namespace mascota
{
    export class Perro implements IAnimal
    {
        nombre: string;
        tipo: string;
        raza: string;
        altura: number;
        fNacimiento: string;
        constructor(nombre:string, raza:string, altura:number, fNacimiento:string)
        {
            this.nombre = nombre;
            this.raza = raza;
            this.altura = altura;
            this.fNacimiento = fNacimiento;
            this.tipo = "Perro";
        } 
        hacerRuido()
        {
            console.log("Guauuuu");
        }

        toJson()
        {
            return '{"tipo":"'+this.tipo+'","nombre":"'+this.nombre+'","raza":"'+this.raza+'","altura":"'+this.altura+'","fNacimiento":"'+this.fNacimiento+'"}';

        }
    }
}