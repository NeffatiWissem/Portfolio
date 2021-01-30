import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //--> définir Url de Web Api
  baseUrl= environment.apiUrl+'users/';

  constructor(private http:HttpClient) { }

  //--> Méthode "getUsers" va retourner la liste des users da Serveur API sous forme Observable
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl);
  }

  //--> "getUser" va retourner User selon id
  getUser(id:number):Observable<User>{
    return this.http.get<User>(this.baseUrl+id);
  }

  //--> UpdateUser
  updateUser(id:number, user:User){
    return this.http.put(this.baseUrl+id,user);
  }
}
