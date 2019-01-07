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

  constructor(private grillOffService: GrillOffService) {}

  ngOnInit() {
    this.getUser();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  getUser() {
    this.grillOffService.currentUser
      .subscribe( 
        (resp) => {
         if (resp) {
          this.currentUser = resp;
         }
        },
        (error) => {}
      );
  }

}
