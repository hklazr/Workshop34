import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Weather } from '../model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  cityForm! : FormGroup;
  weather : Weather[] = []
  weather$! : Observable<Weather[]>  // $ is to indicate that this variable is an Observable

  constructor (private fb : FormBuilder, private weatherSvc : WeatherService) {}

  ngOnInit() {
    this.cityForm = this.fb.group ({
      city : this.fb.control('', [Validators.required])
    });
  }

  getCityWeather() {
    const city = this.cityForm.value.city;
    console.log(city);
    this.weatherSvc.getWeather(city)
    .then(result => {
      this.weather = result;

      console.info(">>> weather: ", this.weather);

      this.cityForm.reset();
    })
    .catch(error => {
      console.info(">>> error: ", error);
      // Display an error message or handle the error as needed
    });
} }

  // getWeather() {
  //   const city = this.cityForm.value.city
  //   console.info('>>> city: ', city)
  //   this.weatherSvc.getWeather(city)
  // }

