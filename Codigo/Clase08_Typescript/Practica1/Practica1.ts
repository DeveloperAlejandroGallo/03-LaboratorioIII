// Tipos
var batman:string = "Bruce";
var superman:string = "Clark";

var existe:boolean = false;

// Tuplas
var parejaHeroes:[string,string] = [batman,superman];
var villano:[string,number,boolean] = ["Lex Lutor",5,true];

// Arreglos
var aliados:string[] = ["Mujer Maravilla","Acuaman","San", "Flash"];

//Enumeraciones
var fuerzaFlash = 5;
var fuerzaSuperman = 100;
var fuerzaBatman = 1;
var fuerzaAcuaman = 0;

// Retorno de funciones
function activar_batiseñal():string
{
  return "activada";
}

function pedir_ayuda():void
{
  console.log("Auxilio!!!");
}

// Aserciones de Tipo
var poder:string = "100";
var largoDelPoder:number = poder.length;
console.log( largoDelPoder );
