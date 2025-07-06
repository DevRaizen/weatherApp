import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {
  public key: any = "f960749b36c68a0f9dfbcd842e636712";
  constructor() { }

  async fetchWeather(city: any, code: any ){
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&appid=${this.key}&units=metric`);
      return await response.json();
     
    } catch (error) {
      console.error("Error fetching nationality:", error);
      throw error;
    }
  }

}
