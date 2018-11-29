/// <refernce path="./Animal.ts" />
/// <refernce path="./Perro.ts" />
/// <refernce path="./Gato.ts" />
var ejemplo;
(function (ejemplo) {
    var Programa = /** @class */ (function () {
        function Programa() {
        }
        Programa.hablar = function (p) {
            console.log(p.nombre);
            p.hacerRuido();
        };
        Programa.accionar = function () {
            console.log("************DIRECTO**********");
            var perro = new mascota.Perro("Butcher");
            var gato = new mascota.Gato("Tom");
            Programa.hablar(perro);
            Programa.hablar(gato);
            var animales = Array();
            animales.push(perro);
            animales.push(gato);
            console.log("************CON ARRAY**********");
            animales.forEach(Programa.hablar);
        };
        return Programa;
    }());
    ejemplo.Programa = Programa;
})(ejemplo || (ejemplo = {}));
