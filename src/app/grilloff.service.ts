import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Contestant } from './contestant';

@Injectable({
  providedIn: 'root'
})
export class GrilloffService {

  private contestants = [
    {id: 1, name: 'Anthony Chinn'},
    {id: 2, name: 'Darnell Tolbert'},
    {id: 3, name: 'George Anderson'}
  ];
  constructor() { }

  getContestants(): Observable<Contestant[]> {
    return of(this.contestants);
  }
}
