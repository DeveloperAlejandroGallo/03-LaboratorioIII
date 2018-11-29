/// <refernce path="./Animal.ts" />
/// <refernce path="./Perro.ts" />
/// <refernce path="./Gato.ts" />
namespace ejemplo
{

    export class Programa 
    {

        static hablar(p:mascota.Animal)
        {
            console.log(p.nombre);
            p.hacerRuido();
        }
        
        static accionar()
        {
            
            console.log("************DIRECTO**********");
            var perro:mascota.Perro = new mascota.Perro("Butcher");
            var gato:mascota.Gato = new mascota.Gato("Tom");
            
            Programa.hablar(perro);
            Programa.hablar(gato);
            
            var animales = Array<mascota.Animal>();
            animales.push(perro);
            animales.push(gato);
            
            console.log("************CON ARRAY**********");
            animales.forEach(Programa.hablar);
        }
    }
}