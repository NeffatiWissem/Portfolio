import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, retryWhen } from "rxjs/operators";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";
import { UserService } from "../_services/user.service";

@Injectable()
export class UserEditResolver implements Resolve<User>{

    constructor(private userService:UserService,
                private authService:AuthService,
                private router:Router,
                private alertify:AlertifyService) {}

    resolve(route:ActivatedRouteSnapshot):Observable<User>{
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error=> {
                this.alertify.error('There is a problem displaying the data');
                this.router.navigate(['']);
                return of({id:0,userName:'',knownAs:'',age:0,gender:'',photoUrl:'',city:'',country:''});
            })
        );
    }
}