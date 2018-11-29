/// <reference path="./Animal.ts" />
/// <reference path="./Perro.ts" />
/// <reference path="./Gato.ts" />
/// <reference path="./node_modules/@types/jquery/dist/jquery.slim.d.ts" />
var ejemplo;
(function (ejemplo) {
    $(document).ready(function () {
        if (localStorage.length > 0) {
            todoElLocalStorage(Programa.animales);
            alert(Programa.animales.toString());
            Programa.verLista();
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
            this.animales.forEach(this.hablar);
        };
        Programa.guardar = function () {
            var nombre = $("#txtAnimal").val().toString();
            var newMascota;
            if ($("#rbPerro").is(":checked"))
                newMascota = new mascota.Perro(nombre);
            else
                newMascota = new mascota.Gato(nombre);
            localStorage.setItem(newMascota.nombre, newMascota.toJson());
            this.animales.push(newMascota);
        };
        Programa.verLista = function () {
            console.log("************POR INICIO DE PROGRAMA************");
            this.animales.forEach(this.hablar);
        };
        Programa.animales = Array();
        return Programa;
    }());
    ejemplo.Programa = Programa;
})(ejemplo || (ejemplo = {}));
