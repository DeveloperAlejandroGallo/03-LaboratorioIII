/// <refernce path="./Animal.ts" />
var ejemplo;
(function (ejemplo) {
    var Perro = /** @class */ (function () {
        function Perro(nombre) {
            this.nombre = nombre;
        }
        Perro.prototype.hacerRuido = function () {
            console.log("Guauuuu");
        };
        return Perro;
    }());
    ejemplo.Perro = Perro;
})(ejemplo || (ejemplo = {}));
