import { Component, OnInit } from '@angular/core';
import { GrillOffService } from '../grill-off.service';
import { Person } from './../person';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-manage-judges',
  templateUrl: './manage-judges.component.html',
  styleUrls: ['./manage-judges.component.css']
})
export class ManageJudgesComponent implements OnInit {
  data: Person[];
  source: LocalDataSource;
  settings = {
    mode: 'inline',
    edit:   { confirmSave: true },
    add:    { confirmCreate: true },
    delete: { confirmDelete: true },
    columns: {
      // id: {
      //   title: 'ID', editable: false
      // },
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
      this.grillOffService.updateJudge(person)
        .subscribe( (p: Person) => {
         // console.log('update Judge ', p);
          event.confirm.resolve();
        });
    }
  }

  onCreate(event) {
    const {id, name, email} = event.newData;
    if (name.length) {
      const person = new Person(0, name, email, 1, null);
      this.grillOffService.saveJudge(person)
        .subscribe( (p: Person) => {
          // console.log('save Judge ', p);
          this.getJudges();
          event.confirm.resolve();
        });
    }
  }

  onDelete(event) {
    const {id, name, email} = event.data;
    const person = new Person(id, name, email, null, null);
    this.grillOffService.deleteJudge(person)
      .subscribe( (p: Person) => {
        // console.log('delete Judge ', p);
        this.getJudges();
        event.confirm.resolve();
      });
  }

  ngOnInit() {
    this.getJudges();
  }

  getJudges() {
    this.grillOffService.getJudges()
      .subscribe( data => {
         this.data = data;
         this.source = new LocalDataSource(data);
        });
  }
}
