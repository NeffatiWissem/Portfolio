import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, 
              private router:Router,
              private alertify:AlertifyService) {}

  canActivate():  boolean {
    //--> Vérifier s'il est authontifier
    if(this.authService.loggedIn()){
      return true;
    }
    //--> si non il afficher Erreur et rionté vers page home
    this.alertify.error("Vous devez d'abord vous connecter");
    this.router.navigate(['']);
    return false;
  }
  
}
