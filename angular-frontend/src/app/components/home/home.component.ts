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
  showChart: Boolean = false;

	constructor(
  		private apiService: ApiService,
  		private router: Router,
	) { }


  public barChartOptions = {};

  public barChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public barChartLabels = [];

  public barChartData = [
    {data: [], backgroundColor: [], hoverBackgroundColor: "#D3D3D3"},
  ];

  ngOnInit() {
    this.showChart = false;
  }


  onSearchSubmit() {

  	const gameDayString = moment(this.gameDate).format("YYYY-MM-DD");
  	console.log(typeof gameDayString);
  	console.log(gameDayString);

  	this.apiService.getStats(gameDayString).subscribe(data => {
      console.log(data);

      let games = data.data;

      if(games.length == 0) {
        this.showChart = false;
      }
      else {
        this.showChart = true;
      }


      console.log(games);

      let playersOver20 = games.filter(x => x.pts >= 20)
                               .map(x => (
                                 {
                                   points: x.pts, 
                                   fgPct: x.fg_pct.toString(),
                                   threes: x.fg3m.toString(),
                                   rebounds: x.reb.toString(), 
                                   assists: x.ast.toString(), 
                                   name: x.player.first_name 
                                         + ' ' 
                                         + x.player.last_name,
                                   color:(
                                           () => {
                                                   if(x.pts < 30) return "#FBEC5D";
                                                   else if(x.pts < 40) return "#FFB00F"; 
                                                   else if(x.pts < 50) return "#FF6103"; 
                                                   else return "#CD2626"
                                                  }
                                          )()
                                  })
                                )
                               .sort((a,b) => (a.points < b.points) ? 1 : -1);


      console.log(playersOver20);

      let playersWarm = playersOver20.filter(x => x.points < 30);
      console.log(playersWarm);

      let playersHot = playersOver20.filter(x => x.points >= 30 && x.points <40);
      console.log(playersHot);

      let playersWhiteHot = playersOver20.filter(x => x.points >= 40 && x.points <50);
      console.log(playersWhiteHot);

      let playersLavaHot = playersOver20.filter(x => x.points > 50);
      console.log(playersLavaHot);


  this.barChartOptions = {
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
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      custom: (tooltip) => {
        if (!tooltip) return;
        tooltip.displayColors = false;
      },
      callbacks: {
        label: function(tooltipItems, data) { 
          var reboundsArr = playersOver20.map(x => 'Rebounds: ' + x.rebounds);
          var assistsArr = playersOver20.map(x => 'Assists: ' + x.assists);
          var threesArr = playersOver20.map(x => 'Three Pointers: ' + x.threes);
          var fgpArr = playersOver20.map(x => 'Field Goal %: ' + x.fgPct);
          var multistringText = ['Points: ' + tooltipItems.xLabel];
          multistringText.push(reboundsArr[tooltipItems.index]);
          multistringText.push(assistsArr[tooltipItems.index]);
          multistringText.push(threesArr[tooltipItems.index]);
          multistringText.push(fgpArr[tooltipItems.index]);
          return multistringText;
        }
      }
    }

  };


      this.barChartData = [
                            {
                              data: playersOver20.map(x => x.points), 
                              backgroundColor: playersOver20.map(x => x.color),
                              hoverBackgroundColor: "#D3D3D3"
                            }
                          ];

      this.barChartLabels = playersOver20.map(x => x.name);



    });	
  }



}
