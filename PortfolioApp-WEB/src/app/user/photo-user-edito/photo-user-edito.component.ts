import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { error } from 'protractor';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-user-edito',
  templateUrl: './photo-user-edito.component.html',
  styleUrls: ['./photo-user-edito.component.css']
})
export class PhotoUserEditoComponent implements OnInit {
 
  @Input() photos?:Photo[]=[];
  uploader: FileUploader= new FileUploader({ url:'', itemAlias: '' });
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User ={id:1,userName:'',
               knownAs:'',
               age:41,
               gender:'Male',
               photoUrl:'',
               city:'Sousse',
               country:'tunisie'}

  currentMain:Photo={ id:0,url:'',dateAdded:new Date(),isMain:false, description:''};
  
  constructor(private route:ActivatedRoute, 
              private userService:UserService,
              private alertify:AlertifyService,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.user = data['user'];
    });
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader(
      {
        url: this.baseUrl + 'users/' + this.user.id + '/photos',
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
        const res:Photo = JSON.parse(Response);
        const photo ={
          id:res.id,
          url:res.url,
          dateAdded:res.dateAdded,
          isMain:res.isMain,
          description:''         
        };
         this.photos?.push(photo);
      }
    }

  }

  setMainPhoto(photo:Photo){
   this.userService.setMainPhoto(this.user.id,photo.id).subscribe(
     ()=>{this.currentMain?this.photos?.filter(p=>p.isMain===true)[0]:null;
      this.currentMain.isMain=false;
      photo.isMain=true;
      // this.user.photoUrl=photo.url;    
      this.authService.changeUserPhoto(photo.url);
      this.authService.currentUser.photoUrl=photo.url;
      localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
    },
     ()=>{this.alertify.error('Il y a un problème');}
   );
  }

  delete(id:number){
    this.alertify.confirm("Voulez-vous supprimer cette image?",()=>{
      this.userService.deletePhoto(this.user.id,id).subscribe(
        ()=>{
          this.photos?.splice(this.photos.findIndex(p=>p.id===id),1);
          this.alertify.success("Image supprimée avec succès");
        },
        error=>{this.alertify.error("Une erreur s'est produite lors de la suppression de l'image");}

      );
    });
  }


}
