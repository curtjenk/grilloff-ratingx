import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GrillOffService } from '../grill-off.service';
import { Person } from './../person';
import { Router, ActivatedRoute } from '@angular/router';


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
  private key: any;

  constructor(private grillOffService: GrillOffService, private router: Router) { }

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
    const key = `${tab}:${contestant.id}`;
    this.results[key] = {contestant: contestant, rate: rate};
  }

  vote() {
    const person: Person = this.grillOffService.currentUserValue();
    this.grillOffService.vote(person, this.results)
      .subscribe(
        (p) => {
          this.grillOffService.logout();
          this.router.navigate(['/']);
          // console.log(p);
        }
      );
  }

}