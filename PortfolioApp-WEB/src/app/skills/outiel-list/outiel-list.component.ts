import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Skill } from '../../_models/skill';
import { AlertifyService } from '../../_services/alertify.service';
import { SkillService } from '../../_services/skill.service';

@Component({
  selector: 'app-outiel-list',
  templateUrl: './outiel-list.component.html',
  styleUrls: ['./outiel-list.component.scss']
})
export class OutielListComponent implements OnInit {

  skills: Skill[] = [];
  constructor(private skillService:SkillService, 
              private route:ActivatedRoute,
              private alertify:AlertifyService) { }

  ngOnInit() {
    // this.loadSkills();
    this.route.data.subscribe(data=> {
      this.skills=data['skills']
    });
  }

  // loadSkills(){
  //    this.skillService.getSkills().subscribe((skills:Skill[])=>{
  //    this.skills=skills;
  //   },
  //   error=>this.alertify.error(error)
    
  //   )
  // }

}
