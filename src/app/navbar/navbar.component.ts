import { Component, OnInit } from '@angular/core';
import { GrillOffService } from '../grill-off.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  isLoggedIn = false;

  constructor(private grillOffService: GrillOffService) { }

  ngOnInit() {
    this.grillOffService.behaviorSubject.subscribe()
  }

}
