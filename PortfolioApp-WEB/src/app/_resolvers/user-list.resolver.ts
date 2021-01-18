import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, retryWhen } from "rxjs/operators";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";

@Injectable()
export class UserListResolver implements Resolve<User[]>{

    constructor(private userService:UserService,
                private router:Router,
                private alertify:AlertifyService) {}

    resolve(route:ActivatedRouteSnapshot):Observable<User[]>{
        return this.userService.getUsers().pipe(
            catchError(error=> {
                this.alertify.error('There is a problem displaying the data');
                this.router.navigate(['']);
                return of([]);
            })
        );
    }
}