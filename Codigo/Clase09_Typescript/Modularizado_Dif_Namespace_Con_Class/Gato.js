/// <refernce path="./Animal.ts" />
var mascota;
(function (mascota) {
    var Gato = /** @class */ (function () {
        function Gato(nombre) {
            this.nombre = nombre;
        }
        Gato.prototype.hacerRuido = function () {
            console.log("Miauuuu");
        };
        return Gato;
    }());
    mascota.Gato = Gato;
})(mascota || (mascota = {}));
