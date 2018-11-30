namespace mascota
{
    export interface IAnimal
    {
        nombre: string;
        tipo:string;
        raza:string;
        altura?:number;
        fNacimiento:string;
        hacerRuido():void;
        toJson();
    }


}

