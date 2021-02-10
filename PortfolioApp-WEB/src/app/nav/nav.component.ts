import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model : any = {};
  photoUrl:string="";

  constructor(public authService: AuthService, 
              private alertify: AlertifyService,
              private router: Router ) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(
      photoUrl =>this.photoUrl=photoUrl);
  }
 
  login(){
    //--> Appel méthode login de authSerive s'il y a de retour donc il exécuté next si non erreur
    this.authService.login(this.model).subscribe(
      next =>  {this.alertify.success('Connexion réussie')},
      error => {this.alertify.error(error)},
      ()=>{this.router.navigate([''])}      
    )
  }
  
  //--> Méthode permet de faire la déconnexion
  loggedOut(){
    //--> Supprimer variable localStorage 'token'
    localStorage.removeItem('token');
    this.authService.decodedToken=null;
    localStorage.removeItem('user');
    this.authService.currentUser??null;

    this.alertify.message('Déconnexion avec succès');
    this.router.navigate(['/home']);
  }

  //--> Méthode qui permet d'aaficher from si user n'a pas de Token 
  // si non affiche message BienVenue
  loggedIn(){
   return this.authService.loggedIn();
  }

}
