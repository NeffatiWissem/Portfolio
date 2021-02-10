import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from "rxjs/operators"; //--> importer map
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //--> Créer un instance de JwtHelperService pour vérifier le Token
  jwtHelper = new JwtHelperService();

  decodedToken:any;

  //--> définir Url de Web Api
  baseUrl=environment.apiUrl+'auth/';

  currentUser:User ={id:1,userName:'',
  knownAs:'',
  age:41,
  gender:'Male',
  photoUrl:'',
  city:'Sousse',
  country:'tunisie'}
  photoUrl = new BehaviorSubject<string>('../../assets/img/photo.jpg');
  currentPhotoUrl= this.photoUrl.asObservable();

  //--> Faire l'injection de service HttpClient avec variable http qui sera utiliser
  constructor(private http:HttpClient) { 
  
  }

  //--> Définir la méthode login pour faire la lision avec méthode login web Api
  login(model:any)
  {
    return this.http.post(this.baseUrl +'login', model).pipe(
      map((response:any)=>{
        const user = response;
        //--> si user !=  null on va ajouter uu element dans "localStorage"
        if(user)
        {
          localStorage.setItem('token',user.token);
          localStorage.setItem('user',JSON.stringify(user.user));
          this.decodedToken= this.jwtHelper.decodeToken(user.token);
          this.currentUser=user.user;
          this.changeUserPhoto(this.currentUser.photoUrl);
        }
      })
    )
  }

  //--> Ajouter méthode register pour faire la lision avec méthode register web Api
  register(model:any){
    return this.http.post(this.baseUrl+'register', model);
  }

  //--> Pour vérifier Token
  loggedIn(){
    try {
      const token = localStorage.getItem('token');
      if(token)
      return ! this.jwtHelper.isTokenExpired(token);
      return false;
    } 
    catch {
      return false;
    }
    
  }

  changeUserPhoto(newPhotoUrl:string){
    this.photoUrl.next(newPhotoUrl);
  }

}
