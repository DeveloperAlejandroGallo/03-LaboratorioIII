/// <reference path="./Animal.ts" />
var mascota;
(function (mascota) {
    var Gato = /** @class */ (function () {
        function Gato(nombre, raza, fNacimiento) {
            this.nombre = nombre;
            this.raza = raza;
            this.fNacimiento = fNacimiento;
            this.tipo = "Gato";
        }
        Gato.prototype.hacerRuido = function () {
            console.log("Miauuuu");
        };
        Gato.prototype.toJson = function () {
            return '{"tipo":"' + this.tipo + '","nombre":"' + this.nombre + '","raza":"' + this.raza + '","fNacimiento":"' + this.fNacimiento + '"}';
        };
        return Gato;
    }());
    mascota.Gato = Gato;
})(mascota || (mascota = {}));
