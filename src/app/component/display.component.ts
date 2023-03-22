import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Weather } from '../model';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy{

  weather$!: Observable<Weather[]>
  weather : Weather[] = [];
  weatherSub! : Subscription;

  constructor(private weatherSvc: WeatherService) {}

  ngOnInit() {
    this.weatherSub = this.weatherSvc.onWeather.subscribe((data : Weather[]) => {
      this.weather = data
    })
  }

  ngOnDestroy() : void{
     this.weatherSub.unsubscribe();
  }
}
