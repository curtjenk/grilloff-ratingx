import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { GrillOffService } from '../grill-off.service';
import { Person } from '../person';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private grillOffService: GrillOffService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // reset login status
    this.grillOffService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.returnUrl =  '/';
  }
  login() {
    this.loading = true;
    const person = new Person(0, this.model.username, this.model.email, null, null);
    this.grillOffService.login(person)
      .pipe(first())
      .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
          },
        error => {
            this.loading = false;
            console.log(error);
        });
  }
}
