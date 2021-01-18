import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../_models/skill';


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
export class SkillService {

  //--> définir Url de Web Api
  baseUrl= environment.apiUrl+'skill/';

  constructor(private http:HttpClient) { }

  getSkills():Observable<Skill[]>{
    return this.http.get<Skill[]>(this.baseUrl,httpOptions);
  }

  getSkill(id:number):Observable<Skill>{
    return this.http.get<Skill>(this.baseUrl+id,httpOptions);
  }

}
