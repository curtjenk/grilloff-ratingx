import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, delay } from "rxjs/operators";

import { Person } from './person';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GrillOffService {

  private contestants = [
    {id: 1, name: 'Anthony Chinn',   email: '', type: 1, token: ''},
    {id: 2, name: 'Darnell Tolbert', email: '', type: 1, token: ''},
    {id: 3, name: 'George Anderson', email: '', type: 1, token: ''},
    {id: 4, name: 'Victory Speight', email: '', type: 1, token: ''},
    {id: 5, name: 'Rodney Houston',  email: '', type: 1, token: ''},
  ];
  constructor(private http: HttpClient) { }

  getContestants(): Observable<Person[]> {
    return of(this.contestants);
    // return this.http.get<Person[]>('/contestants');
  }

  getPersonById(id: number) {
    return of(this.contestants[2]);
    // return this.http.get<Person>('/person');
  }

  login(email: string): Observable<Person> {
      return of( {id: 10, name: 'Mother Pippins',   email: '', type: 2, token: ''}).pipe(delay(3000));
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
    localStorage.removeItem('currentUser');
  }
}
