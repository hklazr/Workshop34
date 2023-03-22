import { Component, OnInit } from '@angular/core';
import { Weather } from './model';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  weather : Weather[] = [];

  constructor(private weatherSvc : WeatherService) {};

  ngOnInit() {

    this.weatherSvc.getWeather('')
      .then(result => this.weather = result)
  }

  
 

}
