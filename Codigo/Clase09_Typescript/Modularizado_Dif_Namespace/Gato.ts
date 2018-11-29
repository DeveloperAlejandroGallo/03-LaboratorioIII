/// <refernce path="./Animal.ts" />
namespace mascota
{
    export class Gato implements Animal
    {
        nombre: string;
        constructor(nombre:string)
        {
            this.nombre = nombre;
        } 
        hacerRuido()
        {
            console.log("Miauuuu");
        }
    }
}