/// <reference path="./Animal.ts" />
/// <reference path="./Perro.ts" />
/// <reference path="./Gato.ts" />
/// <reference path="./node_modules/@types/jquery/dist/jquery.slim.d.ts" />
namespace ejemplo
{
    $(document).ready(
        function()
        {
            
            if(localStorage.length > 0)
            {
                var claves = Object.keys(localStorage),
                i = claves.length;
                while ( i-- ) 
                {
                    var obj = JSON.parse(localStorage.getItem(claves[i]));
                    var newMascota:mascota.Animal;
                    if(obj.tipo == "Perro")
                        newMascota= new mascota.Perro(obj.nombre);
                    else
                        newMascota = new mascota.Gato(obj.nombre);
                    Programa.animales.push(newMascota);
                }
                alert(JSON.stringify( Programa.animales));

            }
        });



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
            $(function () {
                $('#table').bootstrapTable({
                    data: mydata
                });
            });
        }
    }
}