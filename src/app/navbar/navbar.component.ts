import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../person';
import { GrillOffService } from '../grill-off.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = true;
  isLoggedIn = false;
  currentUser: Person;
  isAdmin: Boolean = false;
  currentUserSubscription: Subscription;

  constructor(
      private grillOffService: GrillOffService,
      private route: ActivatedRoute,
      private router: Router) {}

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  ngOnInit() {
    this.currentUserSubscription = this.grillOffService.currentUser
    .subscribe(
      (person) => {
          if (person && person.id) {
            this.currentUser = person;
            this.isLoggedIn = true;
            this.isAdmin = person.type === 0 ? true : false;
          } else {
            this.isLoggedIn = false;
            this.isAdmin = false;
          }
          console.log('ISLOGGEDIN: ', this.isLoggedIn);
      },
      (error) => {
        this.isLoggedIn = false;
    });
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.isLoggedIn = true;
      this.isAdmin = this.currentUser.type === 0 ? true : false;
    }
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }
  logout() {
    // console.log('----logout----');
    this.grillOffService.logout();
    this.router.navigate(['/']);
  }

}
