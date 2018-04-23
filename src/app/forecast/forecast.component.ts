import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']  
})
export class ForecastComponent implements OnInit {
     
  private _weekForecast;
  @Input() selectedCity: string;
  listView = true;
  lineChartData:Array<any> = [];
  lineChartLabels:Array<any> = [];
  lineChartColors:Array<any> = [{ 
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(255, 0, 0, 0.8)',
    pointBackgroundColor: 'rgba(255, 0, 0, 0.9)',
    pointBorderColor: 'rgba(255, 0, 0, 1)'      
  }, {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 255, 0.8)',
    pointBackgroundColor: 'rgba(0, 0, 255, 0.9)',
    pointBorderColor: 'rgba(0, 0, 255, 1)'
  }];
  lineChartOptions = {};

  constructor() { }

  ngOnInit() {
  }

  @Input() 
  set weekForecast(data) {
    if (data) {
      this._weekForecast = data;

      const dailyMin = data.map(value => value.temperature.min);
      const dailyMax = data.map(value => value.temperature.max);

      this.lineChartData = [          
        {data: dailyMax, label: 'Temperatura máxima (ºC)', lineTension: 0},
        {data: dailyMin, label: 'Temperatura mínima (ºC)', lineTension: 0}
      ];
      this.lineChartLabels = data.map(value => {
        const split = value.date_br.split("/");
        return split.slice(0, split.length - 1).join("/");
      });
      this. lineChartOptions = {
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 5
            }
          }]
        }
      }      
    }
  }

  getWeekDay(date: string) {
    const split = date.split("/")    
    const day = new Date(parseInt(split[2]), parseInt(split[1]) - 1, 
                         parseInt(split[0])).getDay();
    let weekDay = "";
    switch (day) {
      case 0: weekDay = "Domingo"; break;
      case 1: weekDay = "Segunda-feira"; break;
      case 2: weekDay = "Terça-feira"; break;
      case 3: weekDay = "Quarta-feira"; break;
      case 4: weekDay = "Quinta-feira"; break;
      case 5: weekDay = "Sexta-feira"; break;
      case 6: weekDay = "Sábado"; break;
    }

    return weekDay + " (" + split[0] + "/" + split[1] + ")";
  }

  radioChange(e) {
    this.listView = e.currentTarget.value === 'list';
  }

  getActivitySuggestion(data) {
    const avgTemp = (data.temperature.min + data.temperature.max) / 2;
    if (data.rain.probability > 50) {      
      if (avgTemp > 25) {
        return "Assistir um filme no cinema.";
      } else if (avgTemp > 15) {
        return "Praticar algum esporte em local coberto.";
      } else {
        return "Assistir um filme em casa.";
      }
    } else {
      if (avgTemp > 25) {
        return "Tomar um banho de piscina, cachoeira ou ir à praia.";
      } else if (avgTemp > 15) {
        return "Praticar algum esporte em local aberto.";
      } else {
        return "Ir a um acampamento.";
      }
    }
  }
}
