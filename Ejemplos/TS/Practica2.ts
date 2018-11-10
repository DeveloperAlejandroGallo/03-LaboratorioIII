// Funciones Básicas
function sumar( a, b ){
  return a + b;
}

var contar = function( heroes ){
  return heroes.length;
}
var superHeroes = ["Flash", "Arrow", "Superman", "Linterna Verde"];
contar(superHeroes);

//Parametros por defecto
function llamarBatman( llamar ){
  if( llamar ){
    console.log("Batiseñal activada");
  }
}

llamarBatman();

// Rest?
function unirheroes( ...personas:string[] ){
  return personas.join(", ");
}


// Tipo funcion
function noHaceNada( numero, texto, booleano, arreglo ){
}

// Crear el tipo de funcion que acepte la funcion "noHaceNada"
var noHaceNadaTampoco;
