
import { Component, Input, OnInit } from '@angular/core';

import { Project } from 'src/app/_models/project';
import { AuthService } from 'src/app/_services/auth.service';
import { ProjectService } from 'src/app/_services/project.service';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

   @Input() project: Project ={id:0,projectName:'',photoUrl:''};

    constructor(public authService:AuthService) { }

   ngOnInit(){    
    
  }

  loggedIn(){
    return this.authService.loggedIn();
   }
}
