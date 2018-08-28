import { Component, OnInit } from '@angular/core';
import { GrillOffService } from '../grill-off.service';
import { Person } from './../person';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-manage-contestants',
  templateUrl: './manage-contestants.component.html',
  styleUrls: ['./manage-contestants.component.css']
})
export class ManageContestantsComponent implements OnInit {
  data: Person[];
  source: LocalDataSource;
  settings = {
    mode: 'inline',
    edit:   { confirmSave: true },
    add:    { confirmCreate: true },
    delete: { confirmDelete: true },
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

  onEdit(event) {
    console.log(event);
  }
  
  onCreate(event) {
    console.log(event);
    event.confirm.resolve();
  }

  onDelete(event) {
    console.log(event);
    event.confirm.resolve();
  }

  ngOnInit() {
    this.getContestants();
  }

  getContestants() {
    this.grillOffService.getContestants()
      .subscribe( contestants => {
         this.data = contestants;
         this.source = new LocalDataSource(contestants);
        });
  }
}
