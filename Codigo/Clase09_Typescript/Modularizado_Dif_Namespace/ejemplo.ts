/// <refernce path="./Animal.ts" />
/// <refernce path="./Perro.ts" />
/// <refernce path="./Gato.ts" />
namespace ejemplo
{

    function hablar(p:mascota.Animal)
    {
        console.log(p.nombre);
        p.hacerRuido();
    }

    export function accionar()
    {

        console.log("************DIRECTO**********");
        var perro:mascota.Perro = new mascota.Perro("Butcher");
        var gato:mascota.Gato = new mascota.Gato("Tom");
        
        hablar(perro);
        hablar(gato);
        
        var animales = Array<mascota.Animal>();
        animales.push(perro);
        animales.push(gato);
        
        console.log("************CON ARRAY**********");
        animales.forEach(hablar);
    }
}