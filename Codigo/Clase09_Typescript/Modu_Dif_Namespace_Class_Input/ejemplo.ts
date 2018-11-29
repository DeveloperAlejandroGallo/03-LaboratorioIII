/// <reference path="./Animal.ts" />
/// <reference path="./Perro.ts" />
/// <reference path="./Gato.ts" />
/// <reference path="./node_modules/@types/jquery/dist/jquery.slim.d.ts" />
namespace ejemplo
{
    // $(document).ready(
    //     function()
    //     {
            
    //         if(localStorage.length > 0)
    //         {
    //             todoElLocalStorage(Programa.animales);
    //             alert(Programa.animales.toString());
    //             Programa.verLista();
    //         }
    //     });


    export class Programa 
    {
        static animales = Array<mascota.Animal>();

        static hablar(p:mascota.Animal)
        {
            console.log(p.nombre);
            p.hacerRuido();
        }
        
        static accionar()
        {
            console.log("************CON ARRAY**********");
            Programa.animales.forEach(Programa.hablar);
        }

        static guardar()
        {
            var nombre:string = $("#txtAnimal").val().toString();
            var newMascota:mascota.Animal;
            if($("#rbPerro").is(":checked"))
                newMascota= new mascota.Perro(nombre);
            else
                newMascota = new mascota.Gato(nombre);


                localStorage.setItem(newMascota.nombre,newMascota.toJson());
                Programa.animales.push(newMascota);
        }

        static verLista()
        {
            console.log("************POR INICIO DE PROGRAMA************")
            Programa.animales.forEach(Programa.hablar);
        }
    }
}