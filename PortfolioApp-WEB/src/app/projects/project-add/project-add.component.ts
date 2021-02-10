import { Component, OnInit, Output,EventEmitter } from '@angular/core';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model : any ={};

  constructor(private projectService:ProjectService, 
              private alertify:AlertifyService
              ) { }

  ngOnInit(): void {
    
  }

  register() {
    this.projectService.addProject(this.model).subscribe(
      ()=>{ this.alertify.message('Nouvel project enregister')},
      error=>{this.alertify.error(error)}      
    );
  }
  
  cancel() {
    this.alertify.message('Pas maintenant');
    //--> Envoye au component père variable boolen 
    this.cancelRegister.emit(false);
  }

}
