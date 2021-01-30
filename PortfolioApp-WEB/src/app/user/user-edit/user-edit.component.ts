import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {

  @ViewChild("editForm") editForm?: NgForm;

  user: User={id:0,age:41,city:'SOUSSE',country:'Tunisie',gender:'',knownAs:'Wissem',photoUrl:'',userName:'NEFFATI Wissem'};
  
  constructor(private route:ActivatedRoute, 
              private alertify:AlertifyService,
              private userService:UserService,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      this.user = data['user'];
    })
  }

  updateUser(){
   
    this.userService.updateUser(this.authService.decodedToken.nameid,this.user).subscribe(
      next=>{
        this.alertify.success('Modifier user avec success');
        this.editForm?.reset(this.user);
      },
      error=>this.alertify.error(error)
    )
  }
}
