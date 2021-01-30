import { Component, OnInit } from '@angular/core';
//inporter le service HttpClient
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode : boolean = false;
  
  //injecter le service HttpClient pour faire la laison avec la response API
  constructor(private http:HttpClient, 
              private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
   if(this.authService.loggedIn()){
     this.router.navigate(['/members']);
   }
  }

  
  registerToggle(){
    this.registerMode = true;
  }

  //--> Méthode permet de récuper la valeur envoyé par componet fils "Register"
  cancelRegister(mode:boolean){
    this.registerMode = mode;
  }

}
