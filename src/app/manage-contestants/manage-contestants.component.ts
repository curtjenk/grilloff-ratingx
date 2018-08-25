import { Component, OnInit } from '@angular/core';
import { Person } from './../person';
import { GrillOffService } from '../grill-off.service';

@Component({
  selector: 'app-manage-contestants',
  templateUrl: './manage-contestants.component.html',
  styleUrls: ['./manage-contestants.component.css']
})
export class ManageContestantsComponent implements OnInit {
  data: Person[];
  settings = {
    columns: {
      name: {
        title: 'Name'
      },
      email: {
        title: 'Email'
      }
    },
    attr: {
        class: 'table table-bordered'
    }
  };

  constructor(private grillOffService: GrillOffService) { }

  ngOnInit() {
    this.getContestants();
  }

  getContestants() {
    this.grillOffService.getContestants()
      .subscribe( contestants => this.data = contestants);
  }
}
