import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GrillOffService } from '../grill-off.service';
import { Person } from './../person';
import { Router, ActivatedRoute } from '@angular/router';
// import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent implements OnInit {
  error = false;
  maxStars: Number = 5;
  contestants: Person[];
  results: any = {};
  tab = 0;

  constructor(private grillOffService: GrillOffService,
              private router: Router) { }

  ngOnInit() {
    this.results = {};
    this.getContestants();
  }

  getContestants() {
    this.grillOffService.getContestants().pipe(first())
      .subscribe( contestants =>  {
        this.contestants = contestants;
      });
  }

  rateChange(tab: string, contestant: Person, rate: number) {
    const ndx = this.contestants.findIndex(item => item.id === contestant.id);
    this.contestants[ndx][tab] = rate;
    contestant[tab] = rate;
    this.error = false;
  }

  doneWithTab(tab: string) {
    const count = this.contestants.filter(c => c[tab]).length;
    if (count === this.contestants.length) {
      this.tab += 1;
      this.error = false;
    } else {
      this.error = true;
    }
    // console.log('count=', count);
  }
  vote() {
    // TODO: handle the already voted case
    const person: Person = this.grillOffService.currentUserValue();
    this.grillOffService.vote(person, this.contestants)
      .subscribe(
        (p) => {
          // this.grillOffService.logout();
          this.router.navigate(['/admin/results']);
        },
      );
  }

}