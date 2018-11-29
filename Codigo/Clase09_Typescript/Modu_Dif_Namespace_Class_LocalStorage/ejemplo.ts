/// <reference path="./Animal.ts" />
/// <reference path="./Perro.ts" />
/// <reference path="./Gato.ts" />
/// <reference path="./node_modules/@types/jquery/dist/jquery.slim.d.ts" />
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

            localStorage.setItem("miValorNuevo","Este es el valor");
            alert(localStorage.getItem("miValorNuevo"));
        }

        // static guardar()
        // {
        //     var nombre:string; 
        //     nombre = $("txtNombre").Text;
        //     console.log(nombre);
        // }
    }
}