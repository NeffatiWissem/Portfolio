import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery-9';

import { Project } from 'src/app/_models/project';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

 project : Project = {id:0, projectName: '',  photoUrl: ''};

 galleryOptions: NgxGalleryOptions[]=[];
 galleryImages: NgxGalleryImage[]=[];

  constructor(private projectService: ProjectService, 
              private alertify:AlertifyService, 
              private route:ActivatedRoute) { }

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe(data=> {
      this.project=data['project']
    });

    //--> Paraméter Gallerie image
    this.galleryOptions=[{
      width:'600px',
      height:'600px',
      imagePercent:100,
      thumbnailsColumns:4,
      imageAnimation:NgxGalleryAnimation.Slide,
      preview:false
    }]

    this.galleryImages=this.getImages();
   }

  ////--> Ajouter la liste des photos d'un projet dans la Gallerie
  getImages(){
    const imageUrls=[];
    if(this.project.photos)
    {
      for (let i = 0; i < this.project.photos.length; i++) {
        imageUrls.push({
          small: this.project.photos[i].url,
          medium: this.project.photos[i].url,
          big: this.project.photos[i].url,
        })   
      };
    }
    return imageUrls;
  }

  // loadUser(){
  //   this.projectService.getProject(+this.route.snapshot.params['id']).subscribe(
  //     (project:Project)=>{this.project=project},
  //     error=>this.alertify.error(error)
  //   )
  // }
}
