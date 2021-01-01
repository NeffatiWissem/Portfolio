import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      ()=>{ console.log('Nouvel user enregister')},
      error=>{console.log(error)}      
    );
  }
  
  cancel() {
    console.log('ليس الأن');
    //--> Envoye au component père variable boolen 
    this.cancelRegister.emit(false);
  }
}
