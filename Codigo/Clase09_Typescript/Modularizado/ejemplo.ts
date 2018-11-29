/// <refernce path="./Animal.ts" />
/// <refernce path="./Perro.ts" />
/// <refernce path="./Gato.ts" />
namespace ejemplo
{

    function hablar(p:Animal)
    {
        console.log(p.nombre);
        p.hacerRuido();
    }

    console.log("************DIRECTO**********");
    var perro:Perro = new Perro("Butcher");
    var gato:Gato = new Gato("Tom");

    hablar(perro);
    hablar(gato);

    var animales = Array<Animal>();
    animales.push(perro);
    animales.push(gato);

    console.log("************CON ARRAY**********");
    animales.forEach(hablar);
}