import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { GrillOffService } from '../grill-off.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  isLoggedIn = false;
  currentUser: Person;

  constructor(
      private grillOffService: GrillOffService,
      private route: ActivatedRoute,
      private router: Router) {}

  ngOnInit() {
    this.grillOffService.currentUser
    .subscribe(
      (person) => {
          if (person && person.id) {
            this.currentUser = person;
            this.isLoggedIn = true;
          } else {
            this.isLoggedIn = false;
          }
      },
      (error) => {
        this.isLoggedIn = false;
    });
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }
  logout() {
    console.log('----logout----');
    this.grillOffService.logout();
    this.router.navigate(['/']);
  }

}
