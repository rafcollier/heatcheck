import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	gameDate: Date;

	constructor(
  		private apiService: ApiService,
  		private router: Router,
	) { }

  ngOnInit() {

  }


  onSearchSubmit() {
  	const gameDayString = moment(this.gameDate).format("YYYY-MM-DD");
  	console.log(typeof gameDayString);
  	console.log(gameDayString);

  	this.apiService.getStats(gameDayString).subscribe(data => {
      console.log(data);

      let games = data.data;
      console.log(games);

      let playersOver20 = games.filter(x => x.pts >= 20)
                               .map(x => ({points: x.pts, firstname: x.player.first_name, lastname: x.player.last_name}));

      console.log(playersOver20);

      let playersWarm = playersOver20.filter(x => x.points < 30);
      console.log(playersWarm);

      let playersHot = playersOver20.filter(x => x.points >= 30 && x.points <40);
      console.log(playersHot);

      let playersWhiteHot = playersOver20.filter(x => x.points >= 40 && x.points <50);
      console.log(playersWhiteHot);

      let playersLavaHot = playersOver20.filter(x => x.points > 50);
      console.log(playersLavaHot);


    });	
  }

}
