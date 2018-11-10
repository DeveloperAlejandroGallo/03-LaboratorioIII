function saludar(persona: string):string
{
    return "Hola, " + persona;
}

let user = "Ale Gallo";

document.body.innerHTML = saludar(user);