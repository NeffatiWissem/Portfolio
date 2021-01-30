import { Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { OutielListComponent } from "./skills/outiel-list/outiel-list.component";
import { ProjectListComponent } from "./projects/project-list/project-list.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "./_guards/auth.guard";
import { ProjectDetailComponent } from "./projects/project-detail/project-detail.component";
import { ProjectDetailResolver } from "./_resolvers/project-detail.resolver";
import { ProjectListResolver } from "./_resolvers/project-list.resolver";
import { UserListResolver } from "./_resolvers/user-list.resolver";
import { SkillListResolver } from "./_resolvers/skill-list.resolver";
import { ProjectEditComponent } from "./projects/project-edit/project-edit.component";
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { ProjectEditResolver } from "./_resolvers/project-edit.resolver";
import { UserEditResolver } from "./_resolvers/user-edit.resolver";
import { PreventUnsavedChangesGuard } from "./_guards/prevent-unsaved-changes.guard";

export const appRoutes: Routes=[
    //--> s'il ne tappe rien dans url il sera vers HomeComponent
    {path:'',component:HomeComponent,resolve:{projects:ProjectListResolver,skills:SkillListResolver}},

    //--> Ajouter un Guard à plusieur components
    {path:'',runGuardsAndResolvers:'always', 
             canActivate:[AuthGuard],
            children:[
                //--> s'il écrit "projects" il orienté vers ProjectsComponent
                             
                {path:'lists',component:ListsComponent},
                {path:'messages',component:MessagesComponent},
                {path:'project/edit/:id',component:ProjectEditComponent,
                resolve:{project:ProjectEditResolver},
                canDeactivate:[PreventUnsavedChangesGuard]},

                {path:'user/edit',component:UserEditComponent,
                resolve:{user:UserEditResolver}},                 
            ]
        },
    {path:'users',component:UserComponent,resolve:{users:UserListResolver}},
    
    {path:'projects/:id',component:ProjectDetailComponent, resolve:{project:ProjectDetailResolver}},

    {path:'projects',component:ProjectListComponent,resolve:{projects:ProjectListResolver}},

    {path:'skills',component:OutielListComponent,resolve:{skills:SkillListResolver}},

    {path:'about',component:AboutComponent},
    
    //--> s'il écrit n'importe quoi il sera orienté vers HomeComponent
    {path:'**',redirectTo:'', pathMatch:'full'}
];
