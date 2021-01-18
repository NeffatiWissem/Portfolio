import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../_models/project';
import { AlertifyService } from '../../_services/alertify.service';
import { ProjectService } from '../../_services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  constructor(private projectService:ProjectService,
              private route:ActivatedRoute,
              private alertify:AlertifyService) { }

  ngOnInit() {
    // this.loadProjects();
    this.route.data.subscribe(data=> {
      this.projects=data['projects']
    });
  }

  // loadProjects(){
  //    this.projectService.getProjects().subscribe((projects:Project[])=>{
  //    this.projects=projects;
  //   },
  //   error=>this.alertify.error(error)
  //   )
  // }

}
