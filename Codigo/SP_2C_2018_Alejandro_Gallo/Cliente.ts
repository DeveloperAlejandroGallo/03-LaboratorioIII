namespace Personas
{
    export class Cliente extends Persona
    {
        edad: number;
        sexo: string;

        constructor(id:number, nombre: string, apellido: string, edad:number, sexo:string)
        {
            super(id,nombre, apellido);
            this.edad = edad;
            this.sexo = sexo;
        }

        toJson()
        {
            return '{"id":"'+this.id+'","nombre":"'+this.nombre+'","apellido":"'
            +this.apellido+'","edad":"'+this.edad+'","sexo":"'+this.sexo+'"}';
        }
    }
}