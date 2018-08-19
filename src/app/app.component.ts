import { Component, OnInit } from '@angular/core';
import { Contestant } from './contestant';
import { EmailValidator } from '@angular/forms';
import { GrilloffService } from './grilloff.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grilloff-rating';
  voterEmail: string;
  contestants: Contestant[];
  results = [];
  doneTaste: boolean;
  doneText: boolean;
  doneAppear: boolean;

  constructor(private grillOffService: GrilloffService) { }

  ngOnInit() {
    this.getContestants();
    this.initialize();
    // console.log(this.contestants);
  }
  initialize() {
    this.results = [];
    this.voterEmail = "";
    this.doneTaste = false;
    this.doneText = false;
    this.doneAppear = false;
  }
  getContestants() {
    this.grillOffService.getContestants()
      .subscribe( contestants => this.contestants = contestants);
  }

  rateChange(tab: string, contestant: Contestant, rate: number) {
    const key = `${tab}:${contestant.id}`;
    this.results[key] = {contestant: contestant, rate: rate};
    console.log(this.results);
  }

  vote() {
    this.initialize();
  }
}
