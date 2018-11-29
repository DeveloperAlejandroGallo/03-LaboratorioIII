/// <refernce path="./Animal.ts" />
/// <refernce path="./Perro.ts" />
/// <refernce path="./Gato.ts" />
var ejemplo;
(function (ejemplo) {
    function hablar(p) {
        console.log(p.nombre);
        p.hacerRuido();
    }
    function accionar() {
        console.log("************DIRECTO**********");
        var perro = new mascota.Perro("Butcher");
        var gato = new mascota.Gato("Tom");
        hablar(perro);
        hablar(gato);
        var animales = Array();
        animales.push(perro);
        animales.push(gato);
        console.log("************CON ARRAY**********");
        animales.forEach(hablar);
    }
    ejemplo.accionar = accionar;
})(ejemplo || (ejemplo = {}));
