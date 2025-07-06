import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/modules/database.service';
import { WeatherAPIService } from 'src/app/myservices/weather-api.service';

@Component({
  selector: 'app-comhis',
  templateUrl: './comhis.component.html',
  styleUrls: ['./comhis.component.scss'],
})
export class ComhisComponent  implements OnInit {
 @Input() public history?: any;
 public weatherHistory?: any;

  constructor(private dbase: DatabaseService, private weatherApi: WeatherAPIService, private alertcon: AlertController) { }

  async ngOnInit() {
    this.weatherHistory = await this.dbase.read();
  }

  async calldelete(id: any) {
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
              await this.dbase.delete(id); // Perform the delete action
              this.weatherHistory = await this.dbase.read(); // Refresh the list
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
}
