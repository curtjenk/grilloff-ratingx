import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {map, delay, tap, catchError} from 'rxjs/operators';

import { Person } from './person';
import { environment } from '../environments/environment';
import { validateConfig } from '@angular/router/src/config';

const baseUrl = {
  contestants: 'api/contestant',
  judges: 'api/judge',
  user: 'api/user',
  vote: 'api/judge/vote',
  results: 'api/judge/results'
};
const host = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GrillOffService {

  private _behaviorSubject: BehaviorSubject<Person> = new BehaviorSubject(null);
  public readonly currentUser: Observable<Person> = this._behaviorSubject.asObservable();
  public readonly currentUserValue = () => this._behaviorSubject.getValue();

  // private contestants = [
  //   {id: 1, name: 'Anthony Chinn',   email: '', type: 1, token: ''},
  //   {id: 2, name: 'Darnell Tolbert', email: '', type: 1, token: ''},
  //   {id: 3, name: 'George Anderson', email: '', type: 1, token: ''},
  //   {id: 4, name: 'Victory Speight', email: '', type: 1, token: ''},
  //   {id: 5, name: 'Rodney Houston',  email: '', type: 1, token: ''},
  // ];
  // private judges = [
  //   {id: 11, name: 'Judge 1', email: '', type: 2, token: ''},
  //   {id: 12, name: 'Judge 2', email: '', type: 2, token: ''},
  //   {id: 13, name: 'Judge 3', email: '', type: 2, token: ''},
  //   {id: 14, name: 'Judge 4', email: '', type: 2, token: ''},
  //   {id: 15, name: 'Judge 5', email: '', type: 2, token: ''},
  // ];

  constructor(private http: HttpClient) { }

  getResults(): Observable<any> {
    const url = host + '/' + baseUrl.results;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getResults', []))
      );
  }

  deleteResults(): Observable<HttpResponse<any>> {
    const person: Person = JSON.parse(localStorage.getItem('currentUser'));
    const url = host + '/' + baseUrl.results;
    const options: {} = Object.assign(
        {params: {name: person.name}}, {observe: 'response'}, httpOptions);
    return this.http.delete<any>(url, options);
  }

  getContestants(): Observable<Person[]> {
    // console.log('service:getContestants');
    // return of(this.contestants);
    const url = host + '/' + baseUrl.contestants;
    return this.http.get<Person[]>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getContestants', []))
      );
  }
  saveContestant(newPerson: Person): Observable<Person> {
    newPerson.id = null;
    newPerson.type = 1;
    newPerson.token = '';
    // return of(newPerson);
    const url = host + '/' + baseUrl.contestants;
    return this.http.post<Person>(url, newPerson, httpOptions)
      .pipe(
        catchError(this.handleError('saveContestant', newPerson))
      );
  }
  updateContestant(person: Person): Observable<Person> {
    // return of(person);
    const url = host + '/' + baseUrl.contestants + '/' + person.id;
    return this.http.put<Person>(url, person, httpOptions)
      .pipe(
        catchError(this.handleError('updateContestant', person))
      );
  }
  deleteContestant(person: Person): Observable<Person> {
    // return of(person);
    const url = host + '/' + baseUrl.contestants + '/' + person.id;
    return this.http.delete<Person>(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteContestant', person))
      );
  }
  getJudges(): Observable<Person[]> {
    const url = host + '/' + baseUrl.judges;
    return this.http.get<Person[]>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getJudges', []))
      );
  }
  saveJudge(newPerson: Person): Observable<Person> {
    newPerson.id = null;
    newPerson.type = 1;
    newPerson.token = '';
    // return of(newPerson);
    const url = host + '/' + baseUrl.judges;
    return this.http.post<Person>(url, newPerson, httpOptions)
      .pipe(
        catchError(this.handleError('saveJudge', newPerson))
      );
  }
  updateJudge(person: Person): Observable<Person> {
    // return of(person);
    const url = host + '/' + baseUrl.judges + '/' + person.id;
    return this.http.put<Person>(url, person, httpOptions)
      .pipe(
        catchError(this.handleError('updateJudge', person))
      );
  }
  deleteJudge(person: Person): Observable<Person> {
    // return of(person);
    const url = host + '/' + baseUrl.judges + '/' + person.id;
    return this.http.delete<Person>(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteJudge', person))
      );
  }

  vote(person: Person, vote: any): Observable<Person> {
    const url = host + '/' + baseUrl.vote;
    const body = Object.assign({vote: vote}, {person: person});
    return this.http.post<Person>(url, body, httpOptions)
      .pipe(
        catchError(this.handleError('vote', person))
      );
  }

  // async userLogin(person: Person) {
  //   const value = await this.login(person).toPromise();
  //   console.log('gos:', value);
  //   return value;
  // }
  login(person: Person): Observable<HttpResponse<Person>> {
    const saveLocal = (p) => {
      this._behaviorSubject.next(p);
      localStorage.setItem('currentUser', JSON.stringify(p));
    };
    const url = host + '/' + baseUrl.user;
    const options: {} = Object.assign(
        {params:
          {name: person.name, email: person.email}
        },
        {observe: 'response'},
        httpOptions);
    // saveLocal(this.judges[2]);
    // return of(this.judges[2]);
    return this.http.get<HttpResponse<Person>>(url, options)
      .pipe(
        tap( val => saveLocal(val.body))
      );
  }

  logout() {
    // remove user from local storage to log user out
    // console.log('----Service logout----');
    this._behaviorSubject.next(null);
    localStorage.removeItem('currentUser');
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    // console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    // this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    // return of(result as T);

    // rethow the error
    return throwError(error);
  };
}
}
