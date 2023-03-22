import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Weather } from './model';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = "MY_API_KEY";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  onWeather = new Subject<Weather[]>

  constructor(private http : HttpClient) { }


  //PROMISE METHOD
  getWeather(city: string ): Promise<Weather[]> {
    if (!city) {
      return Promise.reject('City is required');
    }

    const params = new HttpParams()
            .set('q', city)
            .set('appid', API_KEY);

    return firstValueFrom(//convert the Observable returned by the http.get method into a Promise.
    this.http.get<Weather>(WEATHER_URL,{ params: params }) //response is expected to contain Weather data

    ).then((data: any) => {
      return data.weather as Weather[]; 
    })
    /*takes the response data and extracts the weather property, 
    which contains the array of Weather objects. 
    it returns this array as the result of the Promise.
    */
    .then(data => {
      this.onWeather.next(data)
      return data
    })
  }
}

//OBSERVABLE METHOD

  //   getWeatherObservable(city: string): Observable<Weather[]> {
  //     const params = new HttpParams()
  //       .set('q', city)
  //       .set('appid', API_KEY);
  
  //     return this.http.get<Weather[]>(WEATHER_URL, { params: params })
  //               .pipe(
  //       //         map((data: any) => {
  //       //   return data.weather as Weather[];
  //       // })
  //     )
  //   }  //map = recieves response data, extracts weather properties [weather objects], and returns it
    
  //   getWeather(city: string): Promise<Weather[]> {
  //     if (!city || city.trim() === '') {
  //       return Promise.reject('City is required');
  //     }
  //     return firstValueFrom(
  //       this.getWeatherObservable(city)
  //     )
  //     .then((data: any) => {
  //       // map() and tap()
  //       const w = data['weather'] as Weather[]
  //       //this.onWeather.next(w)
  //       return w
  //     })
  //     .then(data => {
  //       this.onWeather.next(data)
  //       return data
  //     })
  //   }
  
  // }
