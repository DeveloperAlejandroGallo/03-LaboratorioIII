/// <refernce path="./Animal.ts" />
namespace ejemplo
{
    export class Perro implements Animal
    {
        nombre: string;
        constructor(nombre:string)
        {
            this.nombre = nombre;
        } 
        hacerRuido()
        {
            console.log("Guauuuu");
        }
    }
}