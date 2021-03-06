import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //--> Pour communiquer avec component père, permet de modifier paramètre dans le père
  @Output() cancelRegister = new EventEmitter();

  model : any = {};

  constructor(private authService:AuthService,private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      ()=>{ this.alertify.message('Nouvel user enregister')},
      error=>{this.alertify.error(error)}      
    );
  }
  
  cancel() {
    this.alertify.message('Pas maintenant');
    //--> Envoye au component père variable boolen 
    this.cancelRegister.emit(false);
  }
}
