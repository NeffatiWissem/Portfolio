import { Photo } from "./photo";

export interface User {
    //--> La liste des propriétés arivant de ListeUser 
    id:number;
    userName:string;
    knownAs:string;
    age:number;
    gender:string;
    photoUrl:string;
    city:string;
    country:string;

    //-->Définir la liste des propriétés arivant UserDetail comme optionnel
    lookinFor?:string;
    introduction?:string;
    interests?:string;
    photos?:Photo[];
}
