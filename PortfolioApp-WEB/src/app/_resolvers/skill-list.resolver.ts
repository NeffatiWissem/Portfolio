import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, retryWhen } from "rxjs/operators";
import { Skill } from "../_models/skill";
import { AlertifyService } from "../_services/alertify.service";
import { SkillService } from "../_services/skill.service";


@Injectable()
export class SkillListResolver implements Resolve<Skill[]>{

    constructor(private skillService:SkillService,
                private router:Router,
                private alertify:AlertifyService) {}

    resolve(route:ActivatedRouteSnapshot):Observable<Skill[]>{
        return this.skillService.getSkills().pipe(
            catchError(error=> {
                this.alertify.error('There is a problem displaying the data');
                this.router.navigate(['']);
                return of([]);
            })
        );
    }
}