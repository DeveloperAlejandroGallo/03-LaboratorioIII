/// <reference path="./Animal.ts" />
/// <reference path="./Perro.ts" />
/// <reference path="./Gato.ts" />
/// <reference path="./node_modules/@types/jquery/dist/jquery.slim.d.ts" />
var ejemplo;
(function (ejemplo) {
    $(document).ready(function () {
        if (localStorage.length > 0) {
            var claves = Object.keys(localStorage), i = claves.length;
            while (i--) {
                var obj = JSON.parse(localStorage.getItem(claves[i]));
                var newMascota;
                if (obj.tipo == "Perro")
                    newMascota = new mascota.Perro(obj.nombre);
                else
                    newMascota = new mascota.Gato(obj.nombre);
                Programa.animales.push(newMascota);
            }
            alert(JSON.stringify(Programa.animales));
        }
    });
    var Programa = /** @class */ (function () {
        function Programa() {
        }
        Programa.hablar = function (p) {
            console.log(p.nombre);
            p.hacerRuido();
        };
        Programa.accionar = function () {
            console.log("************CON ARRAY**********");
            Programa.animales.forEach(Programa.hablar);
        };
        Programa.guardar = function () {
            var nombre = $("#txtAnimal").val().toString();
            var newMascota;
            if ($("#rbPerro").is(":checked"))
                newMascota = new mascota.Perro(nombre);
            else
                newMascota = new mascota.Gato(nombre);
            localStorage.setItem(newMascota.nombre, newMascota.toJson());
            Programa.animales.push(newMascota);
        };
        Programa.verLista = function () {
            console.log("************POR INICIO DE PROGRAMA************");
            Programa.animales.forEach(Programa.hablar);
            $(function () {
                $('#table').bootstrapTable({
                    data: mydata
                });
            });
        };
        Programa.animales = Array();
        return Programa;
    }());
    ejemplo.Programa = Programa;
})(ejemplo || (ejemplo = {}));
