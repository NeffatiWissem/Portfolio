import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
        return next.handle(req).pipe(
            catchError(error=> {
                //--> Tester si c'est un Erreur de Serveur
                if(error instanceof HttpErrorResponse){
                    const applicationError = error.headers.get('Application-Error');
                    if(applicationError){
                        console.error(applicationError);
                        return throwError(applicationError);
                    }     
                }
               // --> Tester si c'est un Erreur ModelState Errors
               const serverError = error.error;
               let modelStateErrors ='';
               if(serverError && typeof serverError==='object'){
                   for(const key in serverError){
                       if(serverError[key]){
                           modelStateErrors+=serverError[key]+'\n';
                       }
                   }
               }

               //--> Unauthorized Error
               if(error.status===401){
                return throwError(error.statusText);
               }
               
               return throwError(modelStateErrors || serverError || 'Server error');    //Rethrow it back to component
            })
        )
    }
}

export const ErrorInterceptorProvidor={
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi:true
}

