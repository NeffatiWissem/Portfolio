
import { Component, Input, OnInit } from '@angular/core';

import { Project } from 'src/app/_models/project';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

   @Input() project: Project ={id:0,projectName:'',photoUrl:''};

   token:boolean = localStorage.getItem('token')?true:false;
   
   constructor() { }

   ngOnInit(): void {
    
  }

}
