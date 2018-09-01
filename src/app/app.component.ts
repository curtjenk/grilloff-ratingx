import { Component, OnInit } from '@angular/core';
import { Person } from './person';
import { EmailValidator } from '@angular/forms';
import { GrillOffService } from './grill-off.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // title = 'grilloff-rating';
  voterEmail: string;
  // contestants: Person[];
  results = [];
  doneTaste: boolean;
  doneText: boolean;
  doneAppear: boolean;
  // timeToVote = false;

  constructor(private grillOffService: GrillOffService) { }

  ngOnInit() {
    // this.getContestants();
    this.initialize();
    // console.log(this.contestants);
  }
  initialize() {
    this.results = [];
    this.voterEmail = '';
    this.doneTaste = false;
    this.doneText = false;
    this.doneAppear = false;
    // this.timeToVote = false;
  }
  getContestants() {
    // this.grillOffService.getContestants()
    //   .subscribe( contestants => this.contestants = contestants);
  }

  rateChange(tab: string, contestant: Person, rate: number) {
    const key = `${tab}:${contestant.id}`;
    this.results[key] = {contestant: contestant, rate: rate};
    console.log(this.results);
  }

  vote() {
    this.initialize();
  }

}
