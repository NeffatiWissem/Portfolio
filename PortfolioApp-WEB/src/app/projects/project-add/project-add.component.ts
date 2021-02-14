import { Component, OnInit, Output,EventEmitter } from '@angular/core';

import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProjectService } from 'src/app/_services/project.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { Project } from 'src/app/_models/project';
import { Router } from '@angular/router';
defineLocale('fr', frLocale);

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  project : Project = {id:0, projectName: '',  photoUrl: ''};

  registerForm!:FormGroup;
  bsConfig: Partial<BsDatepickerConfig>={};
  locale = 'fr';

  constructor(private projectService:ProjectService, private alertify:AlertifyService,
              private fb:FormBuilder, private localeService: BsLocaleService,
              private route: Router  ) { 
                
                this.localeService.use(this.locale);
              }

  ngOnInit(){
    this.bsConfig = {
      containerClass: 'theme-red',//--> Afficher couleur de DatePicker en rouge 
      showWeekNumbers: false //--> Cacher les numéros des somaines
    };
    this.createRegisterForm();
  }

  //--> Création méthode pour FormBuilder
  createRegisterForm(){
    this.registerForm = this.fb.group({
      projectName: new FormControl('',[Validators.required,Validators.minLength(4)]),
      companyName: new FormControl('',[Validators.required,Validators.minLength(4)]),
      mission: new FormControl('',[Validators.required,Validators.minLength(4)]),
      environment: new FormControl('',[Validators.required,Validators.minLength(4)]),
      city: new FormControl('',[Validators.required,Validators.minLength(4)]),
      country: new FormControl('',[Validators.required,Validators.minLength(4)]),
      dateOn:new FormControl(null, Validators.required)
    })
  }

  register() {
    if(this.registerForm.valid){
      
     this.project=Object.assign({}, this.registerForm.value);

     this.projectService.addProject(this.project).subscribe(
      ()=>{ this.alertify.message('Nouvel project enregister')},
      error=>{this.alertify.error(error)},
      ()=>{this.route.navigate(['/projects'])}

    );
    }
 
   
  }
  
  cancel() {
    this.alertify.message('Pas maintenant');
    //--> Envoye au component père variable boolen 
    this.cancelRegister.emit(false);
  }

}
