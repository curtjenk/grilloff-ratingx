import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GrillOffService } from '../grill-off.service';
import { Person } from './../person';
import { Router, ActivatedRoute } from '@angular/router';
// import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent implements OnInit {
  maxStars: Number = 5;
  contestants: Person[];
  results: any = {};
  tab = 0;
  // private key: any;

  constructor(private grillOffService: GrillOffService,
              private router: Router) { }

  ngOnInit() {
    this.getContestants();
    this.initialize();
  }
  initialize() {
    this.results = {};
  }
  getContestants() {
    this.grillOffService.getContestants()
      .subscribe( contestants => this.contestants = contestants);
  }

  rateChange(tab: string, contestant: Person, rate: number) {
    // const key = `${tab}:${contestant.id}`;
    // this.results[key] = {contestant: contestant, rate: rate};
    const ndx = this.contestants.findIndex(item => item.id === contestant.id);
    this.contestants[ndx][tab] = rate;
    contestant[tab] = rate;
    // console.log(contestant);
  }

  vote() {
    console.log(this.contestants);
    const person: Person = this.grillOffService.currentUserValue();
    this.grillOffService.vote(person, this.contestants)
      .subscribe(
        (p) => {
          this.grillOffService.logout();
          this.router.navigate(['/']);
          // console.log(p);
        }
      );
  }

}