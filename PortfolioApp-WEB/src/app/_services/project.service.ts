import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/project';


//--> Ajouter Headers au request qui contient Token
const httpOptions={
  headers: new HttpHeaders(
    {
      'Authorization':'Bearer '+localStorage.getItem('token')
    }
  )
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

 //--> définir Url de Web Api
 baseUrl= environment.apiUrl+'project/';

 constructor(private http:HttpClient) { }

 getProjects():Observable<Project[]>{
  return this.http.get<Project[]>(this.baseUrl,httpOptions);
}

getProject(id:number):Observable<Project>{
  return this.http.get<Project>(this.baseUrl+id,httpOptions);
}

}
