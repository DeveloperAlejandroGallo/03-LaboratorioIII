/// <reference path="./Animal.ts" />
var mascota;
(function (mascota) {
    var Pajaro = /** @class */ (function () {
        function Pajaro(nombre, raza, fNacimiento, velocidad) {
            this.nombre = nombre;
            this.raza = raza;
            this.fNacimiento = fNacimiento;
            this.velocidad = velocidad;
            this.tipo = "Pajaro";
        }
        Pajaro.prototype.hacerRuido = function () {
            console.log("Pio");
        };
        Pajaro.prototype.toJson = function () {
            return '{"tipo":"' + this.tipo + '","nombre":"' + this.nombre + '","raza":"' + this.raza + '","fNacimiento":"' + this.fNacimiento + '"}';
        };
        return Pajaro;
    }());
    mascota.Pajaro = Pajaro;
})(mascota || (mascota = {}));
