import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, retryWhen } from "rxjs/operators";
import { Project } from "../_models/project";
import { AlertifyService } from "../_services/alertify.service";
import { ProjectService } from "../_services/project.service";

@Injectable()
export class ProjectListResolver implements Resolve<Project[]>{

    constructor(private projectService:ProjectService,
                private router:Router,
                private alertify:AlertifyService) {}

    resolve(route:ActivatedRouteSnapshot):Observable<Project[]>{
        return this.projectService.getProjects().pipe(
            catchError(error=> {
                this.alertify.error('There is a problem displaying the data');
                this.router.navigate(['']);
                return of([]);
            })
        );
    }
}