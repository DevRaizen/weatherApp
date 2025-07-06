import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/modules/database.service';
import { WeatherAPIService } from 'src/app/myservices/weather-api.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  
  public weatherData?: any;
  public isWeatherDataVisible: boolean = false;
  public icolor: any = "light";
  
  // For NG Class
  getTemperatureClass(): string {
    const temp = this.weatherData?.main?.temp;

    if (temp) {
      if (temp >= 30) {
        return 'hot'; // For temperatures 30°C or above (hot)
      } else if (temp >= 15 ) {
        return 'warm'; // For temperatures between 15°C and 30°C (warm)
      } else {
        return 'cold'; // For temperatures below 15°C (cold)
      }
    }

    return ''; // Default if no temperature data
  } 

  //yari na

  constructor(private weather: WeatherAPIService, private dbase: DatabaseService) {}

  async ngOnInit() {
    this.callInit();
  
  }
  
  async callInit(){
    await this.dbase.initDb();
    await this.dbase.initTable();
    await this.dbase.initTableF();
    
  }


  async fetchWeather(city: any, code: any) {
    this.icolor="light";
    if (!city || city.trim() === '') {
      alert("You should provide a city name");
    } else if (!code || code.trim() === '') {
      alert("You should provide a country code");
    } else {
      try {
        this.weatherData = await this.weather.fetchWeather(city, code);
        if (this.weatherData) {
          try {
            await this.dbase.create(this.weatherData);
            this.isWeatherDataVisible = true;
          } catch (error) {
            console.error('Error saving weather data:', error);
            alert('No City Found.');
            this.isWeatherDataVisible = false;
          }
        } else {
          alert('No weather data found.');
          this.isWeatherDataVisible = false;
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data.');
        this.isWeatherDataVisible = false;
      }
    }
  }
  
  async markAsFavorite(favorite: any) {
    try {
      await this.dbase.createf(favorite);
      alert("Successfully added to favorite!");
      this.icolor="warning";
    } catch (error) {
      console.error("Error marking as favorite:", error);
      alert("tanga");
    }
  }
}
