import { Component, OnInit } from '@angular/core';
import { GrillOffService } from '../grill-off.service';
import { Person } from './../person';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent implements OnInit {
  contestants: Person[];
  results: any = {};
  doneTaste: boolean;
  doneText: boolean;
  doneAppear: boolean;
  // timeToVote = false;

  constructor(private grillOffService: GrillOffService, private router: Router) { }

  ngOnInit() {
    this.getContestants();
    this.initialize();
  }
  initialize() {
    this.results = {};
    this.doneTaste = false;
    this.doneText = false;
    this.doneAppear = false;
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
    console.log(person);
    console.log(this.results);

    this.grillOffService.vote(person, this.results)
      .subscribe(
        (p) => {
          this.grillOffService.logout();
          this.router.navigate(['/']);
          console.log(p);
        }
      );
  }

}
