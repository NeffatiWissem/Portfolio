import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 users: User[] = [];
 user: User ={id:1,userName:'',
              knownAs:'',
              age:41,
              gender:'Male',
              photoUrl:'',
              city:'Sousse',
              country:'tunisie'};

  showIntro:boolean=true;

  constructor(private userService:UserService, 
              private route:ActivatedRoute,
              private alertify:AlertifyService) { }

  ngOnInit() {
    // this.loadUsers();
    this.route.data.subscribe(data=> {
      this.users=data['users']
    });

    this.showIntro=true;
  }

  // loadUsers(){
  //   this.userService.getUsers().subscribe((users:User[])=>{
  //    this.users=users;
  //   },
  //   error=>this.alertify.error(error)
  //   )
  // }
}
