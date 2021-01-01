import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators"; //--> importer map

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //--> définir Url de Web Api
  baseUrl='http://localhost:5000/auth/';

  //--> Faire l'injection de service HttpClient avec variable http qui sera utiliser
  constructor(private http:HttpClient) { }

  //--> Définir la méthode login pour faire la lision avec méthode login web Api
  login(model:any)
  {
    return this.http.post(this.baseUrl +'login', model).pipe(
      map((response:any)=>{
        const user = response;
        //--> si user !=  null on va ajouter uu element dans "localStorage"
        if(user){localStorage.setItem('token',user.token);}
      })
    )
  }

  //--> Ajouter méthode register pour faire la lision avec méthode register web Api
  register(model:any){
    return this.http.post(this.baseUrl+'register', model);
  }

}
