import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/modules/database.service';
import { WeatherAPIService } from 'src/app/myservices/weather-api.service';

@Component({
  selector: 'app-comfav',
  templateUrl: './comfav.component.html',
  styleUrls: ['./comfav.component.scss'],
})
export class ComfavComponent  implements OnInit {
  public favorite?: any;
  public weatherData?: any;
  constructor(private dbase: DatabaseService, private weatherApi: WeatherAPIService, private alertcon: AlertController) { }

  async ngOnInit() {
    this.favorite = await this.dbase.readf();
  }

  async deleteFavorite(id: any) {
    const alerts = await this.alertcon.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this record?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled by the user');
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            try {
              await this.dbase.deletef(id); // Perform the delete action
              this.favorite= await this.dbase.readf(); // Refresh the list
              console.log('Record deleted successfully');
            } catch (error) {
              console.error('Error deleting the record:', error);
              alert('Failed to delete the record. Please try again.');
            }
          }
        }
      ]
    });
  
    await alerts.present();
  }

  async showEdit(fav: any) {
    const alerts = await this.alertcon.create({
      header: 'Edit Record',
      inputs: [
        {
          name: 'city',
          type: 'text',
          placeholder: 'Enter city name',
          value: fav.city, // Pre-fill with current value
        },
        {
          name: 'country',
          type: 'text',
          placeholder: 'Enter country code',
          value: fav.country, // Pre-fill with current value
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Edit cancelled');
          },
        },
        {
          text: 'Save',
          handler: async (data) => {
            
              try {
                this.weatherData = await this.weatherApi.fetchWeather(data.city, data.code);
                if (this.weatherData) {
                  const updatedFav = {
                    id: fav.id, // Retain the original record's ID
                    city: this.weatherData.name, // Updated city
                    country: this.weatherData.sys.country, // Updated country
                    temperature: this.weatherData.main.temp, // New weather data
                    humidity: this.weatherData.main.humidity,
                    weather_description: this.weatherData.weather[0].description,
                    wind_speed: this.weatherData.wind.speed,
                    icon: this.weatherData.weather[0].icon
                  };
                  try {
                    await this.dbase.updatef(updatedFav); 
                    this.favorite = await this.dbase.readf(); // Refresh the list
                    console.log('Record updated successfully:', data);
              
                  } catch (error) {
                    console.error('Error saving weather data:', error);
                    alert('No City Found.');
                  }
                } else {
                  alert('No weather data found.');
                }
              } catch (error) {
                console.error('Error fetching weather data:', error);
                alert('Failed to fetch weather data.');
              }
            
          },
        },
      ],
    });
  
    await alerts.present();
  }
  
  
}
