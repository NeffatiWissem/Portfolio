import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/_models/skill';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  @Input() skill: Skill ={id:0,skillName:'',percentage:0};
  constructor() { }

  ngOnInit() {
  }

}
