import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	authToken: any;
	user: any;

	constructor(private http: Http) { }

	registerUser(user) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
		.pipe(map(res => res.json()));
	}

	getStats() {
		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
    	console.log(headers);
    	//return this.http.get('https://www.balldontlie.io/api/v1/players?search=davis')
    	//return this.http.get('https://www.balldontlie.io/api/v1/games?seasons[]=2019')
    	//return this.http.get('https://www.balldontlie.io/api/v1/stats?per_page=100&dates[]="2019-03-16"')
    	return this.http.get('https://www.balldontlie.io/api/v1/stats?page=1&per_page=100&dates[]="2019-03-17"')
        .pipe(map(res => res.json()));
	}
}
