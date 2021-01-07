import { Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { OutielListComponent } from "./outiel-list/outiel-list.component";
import { ProjectListComponent } from "./project-list/project-list.component";
import { AuthGuard } from "./_guards/auth.guard";

export const appRoutes: Routes=[
    //--> s'il ne tappe rien dans url il sera vers HomeComponent
    {path:'',component:HomeComponent},

    //--> Ajouter un Guard à plusieur components
    {path:'',runGuardsAndResolvers:'always', 
             canActivate:[AuthGuard],
            children:[
                //--> s'il écrit "projects" il orienté vers ProjectsComponent
                {path:'projects',component:ProjectListComponent},
                {path:'skills',component:OutielListComponent},
                {path:'lists',component:ListsComponent},
                {path:'messages',component:MessagesComponent}
            ]
        },

    {path:'about',component:AboutComponent},
    
    //--> s'il écrit n'importe quoi il sera orienté vers HomeComponent
    {path:'**',redirectTo:'', pathMatch:'full'}
];
