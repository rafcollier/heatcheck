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
    let pageNum = 1;
    let games = [];
    this.onGetApiData(gameDayString, pageNum, games); 
  }

  onGetApiData(gameDayString, pageNum, games) {

    let apiData = new Promise((resolve, reject) => {
      this.apiService.getStats(gameDayString, pageNum).subscribe(data => {
        resolve(data);
      });
    });

    apiData.then((fromResolve) => {
      games = games.concat(fromResolve['data']);
      if(fromResolve['meta']['next_page'] != null) {
        this.onGetApiData(gameDayString, fromResolve['meta']['next_page'], games);
      }
      else {
        this.onFilterGames(games);
      }
    });
      
  }

  onFilterGames(games) {

    let playersOver20 = games.filter(x => x.pts >= 20)
      .map(x => ({
        points: x.pts, 
        fgPct: x.fg_pct.toString(),
        threes: x.fg3m.toString(),
        rebounds: x.reb.toString(), 
        assists: x.ast.toString(), 
        name: x.player.first_name  + ' ' + x.player.last_name,
        color:(() => {
          if(x.pts < 30) return "#FBEC5D";
          else if(x.pts < 40) return "#FFB00F"; 
          else if(x.pts < 50) return "#FF6103"; 
          else return "#CD2626"
        })()
      })
    )
    .sort((a,b) => (a.points < b.points) ? 1 : -1)
    .slice(0,10);
    this.onShowChart(playersOver20);

  }

  onShowChart(players) {

    this.showChart = true;
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
            let reboundsArr = players.map(x => 'Rebounds: ' + x.rebounds);
            let assistsArr = players.map(x => 'Assists: ' + x.assists);
            let threesArr = players.map(x => 'Three Pointers: ' + x.threes);
            let fgpArr = players.map(x => 'Field Goal %: ' + x.fgPct);
            let multistringText = ['Points: ' + tooltipItems.xLabel];
            multistringText.push(reboundsArr[tooltipItems.index]);
            multistringText.push(assistsArr[tooltipItems.index]);
            multistringText.push(threesArr[tooltipItems.index]);
            multistringText.push(fgpArr[tooltipItems.index]);
            return multistringText;
          }
        }
      }
    };

    this.barChartData = [{
      data: players.map(x => x.points), 
      backgroundColor: players.map(x => x.color),
      hoverBackgroundColor: "#D3D3D3"
    }];

    this.barChartLabels = players.map(x => x.name);

  }

}
