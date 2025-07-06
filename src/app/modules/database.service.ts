import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { __await } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private dbcon!: SQLiteDBConnection;
  private weHistory!: any;
  private favorite!: any;

  constructor() { }

  async initDb() {
    try {
      this.dbcon = await this.sqlite.createConnection("Raizen", false, "no-encryption", 1, false);
      
      await this.dbcon.open();
    } catch (error) {
      console.error("Database connection failed:", error);
     
    }
  }

  async initTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS Weather_History (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT NOT NULL,
        country TEXT NOT NULL,
        temperature REAL NOT NULL,
        humidity INTEGER NOT NULL,
        weather_description TEXT NOT NULL,
        icon TEXT,
        wind_speed REAL NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await this.dbcon.execute(query);
      
    } catch (error) {
      console.error("Failed to create table:", error);
      alert("Failed to create table. Check the console for errors.");
    }
  }

  async create(weatherData: any){
    const city = weatherData.name;  
    const country = weatherData.sys.country;  
    const temperature = weatherData.main.temp; 
    const humidity = weatherData.main.humidity;  
    const weatherDescription = weatherData.weather[0].description; 
    const icon = weatherData.weather[0].icon;  
    const windSpeed = weatherData.wind.speed; 

    const query = `
      INSERT INTO Weather_History (
        city, 
        country, 
        temperature, 
        humidity, 
        weather_description, 
        icon, 
        wind_speed
      ) VALUES ('${city}', '${country}', '${temperature}', '${humidity}', '${weatherDescription}', '${icon}', '${windSpeed}')
    `;
   
    try {
    await this.dbcon.execute(query);
   
  } catch (error) {
    console.error('Error saving weather data:', error);
    alert('Failed to save weather data.');
  }

  }
  
  async read(){
    const query =`SELECT * FROM Weather_History ORDER BY id DESC`;
    const result = await this.dbcon.query(query);
    this.weHistory = result.values;
    return this.weHistory;
  }

  async delete(id: any) {
    const query = `DELETE FROM Weather_History WHERE id = '${id}'`;
    try {
      await this.dbcon.execute(query);
      console.log("Record deleted successfully");
     
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete the record. Please try again.");
    }
  }
  
  //  Favorite Table

  async initTableF() {
    const query = `
      CREATE TABLE IF NOT EXISTS Favorite (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT NOT NULL,
        country TEXT NOT NULL,
        temperature REAL NOT NULL,
        humidity INTEGER NOT NULL,
        weather_description TEXT NOT NULL,
        icon TEXT,
        wind_speed REAL NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await this.dbcon.execute(query);
      
    } catch (error) {
      console.error("Failed to create table:", error);
      alert("Failed to create table. Check the console for errors.");
    }
  }

  async createf(weatherData: any){
    const city = weatherData.name;  
    const country = weatherData.sys.country;  
    const temperature = weatherData.main.temp; 
    const humidity = weatherData.main.humidity;  
    const weatherDescription = weatherData.weather[0].description; 
    const icon = weatherData.weather[0].icon;  
    const windSpeed = weatherData.wind.speed; 

    const query = `
      INSERT INTO Favorite (
        city, 
        country, 
        temperature, 
        humidity, 
        weather_description, 
        icon, 
        wind_speed
      ) VALUES ('${city}', '${country}', '${temperature}', '${humidity}', '${weatherDescription}', '${icon}', '${windSpeed}')
    `;
   
    try {
    await this.dbcon.execute(query);
   
  } catch (error) {
    console.error('Error saving weather data:', error);
    alert('Failed to save weather data.');
  }

  }

  async readf(){
    const query =`Select * from Favorite`;
    const result = await this.dbcon.query(query);
    this.favorite = result.values;
    return this.favorite;
  }
  
  async deletef(id: any) {
    const query = `DELETE FROM Favorite WHERE id = '${id}'`;
    try {
      await this.dbcon.execute(query);
      console.log("Record deleted successfully");
     
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete the record. Please try again.");
    }
  }
  
  async updatef(favorite: any) {
    const query = `
      UPDATE Favorite 
      SET 
        city = '${favorite.city}',
        country = '${favorite.country}',
        temperature = ${favorite.temperature},
        humidity = ${favorite.humidity},
        wind_speed = ${favorite.wind_speed},
        icon = '${favorite.icon}'
      WHERE id = ${favorite.id}
    `;
    try {
      await this.dbcon.execute(query);
      console.log('favorite updated successfully');
      
    } catch (error) {
      console.error('Error updating the record:', error);
      alert('bobo hindi gumana');;
      throw error;
    }
  }
  
}
