import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, delay, tap} from 'rxjs/operators';

import { Person } from './person';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GrillOffService {

  private _behaviorSubject: BehaviorSubject<Person> = new BehaviorSubject(null);
  public readonly currentUser: Observable<Person> = this._behaviorSubject.asObservable();
  private contestants = [
    {id: 1, name: 'Anthony Chinn',   email: '', type: 1, token: ''},
    {id: 2, name: 'Darnell Tolbert', email: '', type: 1, token: ''},
    {id: 3, name: 'George Anderson', email: '', type: 1, token: ''},
    {id: 4, name: 'Victory Speight', email: '', type: 1, token: ''},
    {id: 5, name: 'Rodney Houston',  email: '', type: 1, token: ''},
  ];
  private judges = [
    {id: 11, name: 'Judge 1', email: '', type: 2, token: ''},
    {id: 12, name: 'Judge 1', email: '', type: 2, token: ''},
    {id: 13, name: 'Judge 1', email: '', type: 2, token: ''},
    {id: 14, name: 'Judge 1', email: '', type: 2, token: ''},
    {id: 15, name: 'Judge 1', email: '', type: 2, token: ''},
  ];
  constructor(private http: HttpClient) { }

  getContestants(): Observable<Person[]> {
    return of(this.contestants);
    // return this.http.get<Person[]>('/contestants');
  }
  saveContestant(newPerson: Person): Observable<Person> {
    newPerson.type = 1;
    newPerson.token = 'mptoken';
    return of(newPerson);
  }
  updateContestant(person: Person): Observable<Person> {
    return of(person);
  }
  deleteContestant(person: Person): Observable<Person> {
    return of(person);
  }
  getJudges(): Observable<Person[]> {
    return of(this.judges);
    // return this.http.get<Person[]>('/judges');
  }

  getPersonById(id: number) {
    return of(this.contestants[2]);
    // return this.http.get<Person>('/person');
  }
  // changeCurrentUser(person: Person) {
  //   this._behaviorSubject.next(person);
  // }

  login(email: string): Observable<Person> {
      const person = {id: 10, name: 'Mother Pippins',   email: '', type: 0, token: 'mptoken'};
      const saveLocal = () => {
        console.log('---login---');
        this._behaviorSubject.next(person);
        localStorage.setItem('currentUser', JSON.stringify(person));
      };
      return of(person)
        .pipe(
          delay(1500),
          tap(saveLocal)
          );
    // return this.http.post<any>('/api/authenticate', {email: email}, httpOptions)
      // .pipe(map( (person) => {
      //   // login successful if there's a jwt token in the response
      //   if (person && person.token) {
      //     // store user details and jwt token in local storage to keep user logged in between page refreshes
      //     localStorage.setItem('currentUser', JSON.stringify(person));
      //   }
      //   return person;
      // }));
  }

  logout() {
    // remove user from local storage to log user out
    console.log('----Service logout----');
    this._behaviorSubject.next(null);
    localStorage.removeItem('currentUser');
  }
}
