import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_models/project';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  
  @ViewChild("editForm") editForm?: NgForm;

  project: Project={id:0,photoUrl:'',projectName:''};

  //--> Pour faire de controle si on fermer la page
  @HostListener('window:beforeunload',['$event'])
 unLoadNotification($event:any){
   if(this.editForm?.dirty){
     $event.returnValue=true;
   }
 }


  constructor(private route:ActivatedRoute, 
              private alertify:AlertifyService,
              private projectService:ProjectService ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.project = data['project'];
    })
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
