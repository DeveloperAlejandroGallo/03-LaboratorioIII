/// <refernce path="./Animal.ts" />
var ejemplo;
(function (ejemplo) {
    var Gato = /** @class */ (function () {
        function Gato(nombre) {
            this.nombre = nombre;
        }
        Gato.prototype.hacerRuido = function () {
            console.log("Miauuuu");
        };
        return Gato;
    }());
    ejemplo.Gato = Gato;
})(ejemplo || (ejemplo = {}));
