import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model : any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    //--> Appel méthode login de authSerive s'il y a de retour donc il exécuté next si non erreur
    this.authService.login(this.model).subscribe(
      next =>  {console.log('Connexion réussie')},
      error => {console.log('Échec de la connexion')}      
    )
  }

  //--> Méthode qui permet d'aaficher from si user n'a pas de Token 
  // si non affiche message BienVenue
  loggedIn(){
    //--> récuper le contenu de variable locaStorage sous le nom 'token'
    const token = localStorage.getItem('token');

    //--> si token contient des données retourne true sinon false
    return !! token 
  }

  //--> Méthode permet de faire la déconnexion
  loggedOut(){
    //--> Supprimer variable localStorage 'token'
    localStorage.removeItem('token');
    console.log('Déconnexion avec succès');
  }
}
