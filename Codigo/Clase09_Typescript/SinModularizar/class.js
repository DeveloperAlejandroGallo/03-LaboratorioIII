var Perro = /** @class */ (function () {
    function Perro(nombre) {
        this.nombre = nombre;
    }
    Perro.prototype.hacerRuido = function () {
        console.log("Guauuuu");
    };
    return Perro;
}());
var Gato = /** @class */ (function () {
    function Gato(nombre) {
        this.nombre = nombre;
    }
    Gato.prototype.hacerRuido = function () {
        console.log("Miauuuu");
    };
    return Gato;
}());
function hablar(p) {
    console.log(p.nombre);
    p.hacerRuido();
}
var perro = new Perro("Butcher");
var gato = new Gato("Tom");
hablar(perro);
hablar(gato);
var animales = Array();
animales.push(perro);
animales.push(gato);
console.log("Con Array");
animales.forEach(hablar);
