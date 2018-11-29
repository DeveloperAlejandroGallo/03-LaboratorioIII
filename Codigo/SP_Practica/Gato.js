/// <reference path="./Animal.ts" />
var mascota;
(function (mascota) {
    var Gato = /** @class */ (function () {
        function Gato(nombre) {
            this.type = "Gato";
            this.nombre = nombre;
        }
        Gato.prototype.hacerRuido = function () {
            console.log("Miauuuu");
        };
        Gato.prototype.toJson = function () {
            return '{"tipo":"' + this.type + '","nombre":"' + this.nombre + '"}';
        };
        return Gato;
    }());
    mascota.Gato = Gato;
})(mascota || (mascota = {}));
