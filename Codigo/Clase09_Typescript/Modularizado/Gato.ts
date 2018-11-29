/// <refernce path="./Animal.ts" />
namespace ejemplo
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