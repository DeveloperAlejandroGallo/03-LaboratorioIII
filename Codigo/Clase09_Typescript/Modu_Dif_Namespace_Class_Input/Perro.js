/// <reference path="./Animal.ts" />
var mascota;
(function (mascota) {
    var Perro = /** @class */ (function () {
        function Perro(nombre) {
            this.type = "Perro";
            this.nombre = nombre;
        }
        Perro.prototype.hacerRuido = function () {
            console.log("Guauuuu");
        };
        Perro.prototype.toJson = function () {
            return '{"tipo":"' + this.type + '","nombre":"' + this.nombre + '"}';
        };
        return Perro;
    }());
    mascota.Perro = Perro;
})(mascota || (mascota = {}));
