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
      id: {
        title: 'ID', editable: false
      },
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
    const {id, name, email} = event.newData;
    if (name.length) {
      const person = new Person(id, name, email, 1, null);
      this.grillOffService.updateContestant(person)
        .subscribe( (p: Person) => {
          console.log('update contestant ', p);
          event.confirm.resolve();
        });
    }
  }

  onCreate(event) {
    const {id, name, email} = event.newData;
    if (name.length) {
      const person = new Person(0, name, email, 1, null);
      this.grillOffService.saveContestant(person)
        .subscribe( (p: Person) => {
          console.log('save contestant ', p);
          this.getContestants();
          event.confirm.resolve();
        });
    }
  }

  onDelete(event) {
    const {id, name, email} = event.data;
    if (name.length) {
      const person = new Person(id, name, email, null, null);
      this.grillOffService.deleteContestant(person)
        .subscribe( (p: Person) => {
          console.log('delete contestant ', p);
          this.getContestants();
          event.confirm.resolve();
        });
    }
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
