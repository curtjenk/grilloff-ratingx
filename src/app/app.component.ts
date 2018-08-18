import { Component, OnInit } from '@angular/core';
import { Contestant } from './contestant';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GrilloffService } from './grilloff.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grilloff-rating';
  email: string;
  contestants: Contestant[];
  results = [];

  constructor(private grillOffService: GrilloffService) { }

  ngOnInit() {
    this.getContestants();
    // console.log(this.contestants);
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
}
