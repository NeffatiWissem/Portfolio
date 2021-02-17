import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProjectService } from 'src/app/_services/project.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  
  @ViewChild("editForm") editForm?: NgForm;

  project: Project={id:0,photoUrl:'',projectName:''};

  registerForm!:FormGroup;
  bsConfig: Partial<BsDatepickerConfig>={};
  locale = 'fr';

   //--> Format de date de création de projet
 options={weekday:'long', year:'numeric', month:'long', day:'numeric'};
 created: string="";

  //--> Pour faire de controle si on fermer la page
  @HostListener('window:beforeunload',['$event'])
 unLoadNotification($event:any){
   if(this.editForm?.dirty){
     $event.returnValue=true;
   }
 }


  constructor(private route:ActivatedRoute, 
              private alertify:AlertifyService,
              private projectService:ProjectService,
              private localeService: BsLocaleService, ) {
                this.localeService.use(this.locale);
               }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.project = data['project'];
    });

    this.bsConfig = {
      containerClass: 'theme-red',//--> Afficher couleur de DatePicker en rouge 
      showWeekNumbers: false //--> Cacher les numéros des somaines
    };

     //--> Modifier format date de création
     this.created=new Date(this.project.dateOn??new Date()).toLocaleString('fr-fr',this.options);
  }

  updateProject(){
   this.projectService.updateProject(this.project.id,this.project).subscribe(
    next=>{
      this.alertify.success('Modifier project avec success');
      this.editForm?.reset(this.project);
    },
    error=>this.alertify.error(error)
  )
  }

  updateMainPhoto(photoUrl:string){
   this.project.photoUrl=photoUrl;
  }
}
