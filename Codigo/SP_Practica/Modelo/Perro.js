/// <reference path="./Animal.ts" />
var mascota;
(function (mascota) {
    var Perro = /** @class */ (function () {
        function Perro(nombre, raza, altura, fNacimiento) {
            this.nombre = nombre;
            this.raza = raza;
            this.altura = altura;
            this.fNacimiento = fNacimiento;
            this.tipo = "Perro";
        }
        Perro.prototype.hacerRuido = function () {
            console.log("Guauuuu");
        };
        Perro.prototype.toJson = function () {
            return '{"tipo":"' + this.tipo + '","nombre":"' + this.nombre + '","raza":"' + this.raza + '","altura":"' + this.altura + '","fNacimiento":"' + this.fNacimiento + '"}';
        };
        return Perro;
    }());
    mascota.Perro = Perro;
})(mascota || (mascota = {}));
