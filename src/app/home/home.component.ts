import { Component, OnInit } from '@angular/core';
import { Person } from './../person';
import { GrillOffService } from '../grill-off.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public color = 'blue';
  public currentUser: Person;
  constructor(private grillOffService: GrillOffService) {
    this.grillOffService.currentUser
    .subscribe( 
      (resp) => {
        console.log(`---Home Component ----:`);
        this.currentUser = resp;
      },
      (error) => {});
  }

  ngOnInit() {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));   
  }

}
