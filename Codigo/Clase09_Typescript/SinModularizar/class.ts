interface Animal
{
    nombre: string;
    hacerRuido():void;
}

class Perro implements Animal
{
    nombre: string;
    constructor(nombre:string)
    {
        this.nombre = nombre;
    } 
    hacerRuido()
    {
        console.log("Guauuuu");
    }
}

class Gato implements Animal
{
    nombre: string;
    constructor(nombre:string)
    {
        this.nombre = nombre;
    } 
    hacerRuido()
    {
        console.log("Miauuuu");
    }
}

function hablar(p:Animal)
{
    console.log(p.nombre);
    p.hacerRuido();
}


var perro:Perro = new Perro("Butcher");
var gato:Gato = new Gato("Tom");

hablar(perro);
hablar(gato);

var animales = Array<Animal>();
animales.push(perro);
animales.push(gato);

console.log("Con Array");
animales.forEach(hablar);
