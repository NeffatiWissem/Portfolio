import { PhotoProject } from "./photoProject";

export interface Project {
    //--> Propriétés For List
    id:number;   
    projectName: string;
    photoUrl: string;

    //--> Propriétés For Details
    companyName?: string ;
    dateOn?: Date;
    dateOf?: Date;
    mission?: string;
    environment?: string ;
    city?: string ;
    country?: string;
    photos?:PhotoProject[];
}
