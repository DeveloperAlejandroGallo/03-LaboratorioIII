/// <refernce path="./Animal.ts" />
var mascota;
(function (mascota) {
    var Perro = /** @class */ (function () {
        function Perro(nombre) {
            this.nombre = nombre;
        }
        Perro.prototype.hacerRuido = function () {
            console.log("Guauuuu");
        };
        return Perro;
    }());
    mascota.Perro = Perro;
})(mascota || (mascota = {}));
