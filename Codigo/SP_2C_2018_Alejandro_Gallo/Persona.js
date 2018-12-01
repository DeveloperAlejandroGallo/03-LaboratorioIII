var Personas;
(function (Personas) {
    var Persona = /** @class */ (function () {
        function Persona(id, nombre, apellido) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }
        return Persona;
    }());
    Personas.Persona = Persona;
})(Personas || (Personas = {}));
