import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private router: Router,private menuCTRL: MenuController, private navCTRL: NavController) {}

  async navigateto(page: string) {
    try {
      console.log(`Navigating to: ${page}`);
      await this.menuCTRL.close(); 
      await this.router.navigate([`/${page}`], { replaceUrl: true }); 
      this.navCTRL.navigateForward('/' + page);
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  }

  ionViewWillEnter() {
    this.menuCTRL.enable(true); 
  }
}
