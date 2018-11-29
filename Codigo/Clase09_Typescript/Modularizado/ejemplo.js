/// <refernce path="./Animal.ts" />
/// <refernce path="./Perro.ts" />
/// <refernce path="./Gato.ts" />
var ejemplo;
(function (ejemplo) {
    function hablar(p) {
        console.log(p.nombre);
        p.hacerRuido();
    }
    console.log("************DIRECTO**********");
    var perro = new ejemplo.Perro("Butcher");
    var gato = new ejemplo.Gato("Tom");
    hablar(perro);
    hablar(gato);
    var animales = Array();
    animales.push(perro);
    animales.push(gato);
    console.log("************CON ARRAY**********");
    animales.forEach(hablar);
})(ejemplo || (ejemplo = {}));
