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
    {id: 3, name: 'George Anderson'},
    {id: 4, name: 'Victory Speight'},
    {id: 5, name: 'Rodney Houston'},
  ];
  constructor() { }

  getContestants(): Observable<Contestant[]> {
    return of(this.contestants);
  }
}
