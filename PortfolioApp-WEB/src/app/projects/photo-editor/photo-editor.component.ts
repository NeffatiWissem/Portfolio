import { Component, Input, OnInit, Output } from '@angular/core';
import { PhotoProject } from 'src/app/_models/photoProject';

import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { Project } from 'src/app/_models/project';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/_services/project.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EventEmitter } from '@angular/core';




@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  //--> Passer des données de père vers le fis
 @Input() photos?:PhotoProject[]=[];
 //--> Passer des données de type string de fis vers le père
 @Output() getProjectPhotoChange = new EventEmitter<string>();


 uploader: FileUploader= new FileUploader({ url:'', itemAlias: '' });
 hasBaseDropZoneOver = false;
 baseUrl = environment.apiUrl;
 project: Project={id:0,photoUrl:'',projectName:''};
 currentMain:PhotoProject={ id:0,url:'',dateAdded:new Date(),isMain:false, description:''};

  constructor(private route:ActivatedRoute,
              private projectService:ProjectService,
              private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.project = data['project'];
    });
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader(
      {
        url: this.baseUrl + 'project/' + this.project.id + '/photos',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024
      }
    );
    this.uploader.onAfterAddingFile=(file)=>{file.withCredentials=false;};

    this.uploader.onSuccessItem=(item,Response,status,headers)=>{
      if(Response){
        const res:PhotoProject = JSON.parse(Response);
        const photo ={
          id:res.id,
          url:res.url,
          dateAdded:res.dateAdded,
          isMain:res.isMain,
          description:''         
        };
        this.photos?.push(photo);
        if(photo.isMain){
          this.getProjectPhotoChange.emit(photo.url); 
        }
      }
    }

  }

  setMainPhoto(photo:PhotoProject){
    this.projectService.setMainPhoto(this.project.id,photo.id).subscribe(
      ()=>{this.currentMain?this.photos?.filter(p=>p.isMain===true)[0]:null;
        this.currentMain.isMain=false;
        photo.isMain=true;
        //--> Fait passage par OutPut (de fis vers père)
        this.getProjectPhotoChange.emit(photo.url); 
        // this.project.photoUrl=photo.url;

      },
      ()=>{this.alertify.error('Il y a un problème');}
    );
   }

   delete(id:number){
    this.alertify.confirm("Voulez-vous supprimer cette image?",()=>{
      this.projectService.deletePhoto(this.project.id,id).subscribe(
        ()=>{
          this.photos?.splice(this.photos.findIndex(p=>p.id===id),1);
          this.alertify.success("Image supprimée avec succès");
        },
        error=>{this.alertify.error("Une erreur s'est produite lors de la suppression de l'image");}

      );
    });
  }
}
