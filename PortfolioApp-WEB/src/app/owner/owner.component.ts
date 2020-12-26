//inporter le service HttpClient
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  owners: any; //déclarer une varialbe de type inconnu

  //injecter le service HttpClient pour faire la laison avec la response API
  constructor(private http:HttpClient) { }

  ngOnInit() {
    //lors de exécutions faire l'appel au fonction getOwners
    this.getOwners();
  }


  getOwners(){
    //paraméter le http on ajoutant le URL 
    this.http.get('http://localhost:5000/WeatherForecast').subscribe(
      response=> {this.owners=response;},
      error=> {console.log(error);}  
    )
  }

}
