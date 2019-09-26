import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
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

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
        xAxes: [{
          display: false,
          ticks: {
            min: 10,
            max: 70
          }
        }],
        yAxes: [{
            gridLines: {
              display: false
            }   
        }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 12,
        }
      }
    }

  };

  public barChartLabels = ['Lebron James', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], backgroundColor: 'rgb(255, 165, 0)'},
  ];

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

      let dataArr = playersOver20.map(x => x.points);
      console.log(dataArr);

      this.barChartData = [
         {data: dataArr, backgroundColor: 'rgb(255, 165, 0)'},
      ];

      this.barChartLabels = playersOver20.map(x => x.lastname);


    });	
  }

}
