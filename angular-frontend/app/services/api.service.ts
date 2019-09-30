import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	token: any;
	user: any;

	constructor(private http: Http) { }

	registerUser(user) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
    //return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    return this.http.post('users/register', user, {headers: headers})
		.pipe(map(res => res.json()));
	}

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}) 
    return this.http.post('users/authenticate', user, {headers: headers}) 
      .pipe(map(res => res.json()));
  }

  deleteUser(userID) {
    this.loadToken();
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);
    params.set('userID', userID);
    options.headers = headers;
    options.search = params;
    //return this.http.delete('http://localhost:3000/users/deleteUser', options)
    return this.http.delete('users/deleteUser', options)
      .pipe(map(res => res.json()));
  }

	getStats(gameDayString, pageNum) {
		let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  	return this.http.get('https://www.balldontlie.io/api/v1/stats?page=' + 
                          pageNum + 
                          '&per_page=100&dates[]=' + 
                          gameDayString) 
      .pipe(map(res => res.json()));
	}

  getGames() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('https://www.balldontlie.io/api/v1/games') 
      .pipe(map(res => res.json()));
  }

  /////////////////////////////////////////
  // LOCAL STORAGE
  /////////////////////////////////////////

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user)); 
    this.token = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.token = token;
    return token;
  }

  loadUser(){
    const user = localStorage.getItem('user');
    return user;
  }

  logout(){
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    const token = localStorage.getItem('id_token');
    return token != null;
  }

}


