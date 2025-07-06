import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  constructor(private router: Router,private menuCTRL: MenuController,private navCTRL: NavController) { }

  ngOnInit() {
  }

  async navigateto(page: string) {
    try {
      console.log(`Navigating to: ${page}`);
      await this.menuCTRL.close(); // Close the menu before navigation
      await this.router.navigate([`/${page}`], { replaceUrl: true });  // Navigate to the new page
      this.navCTRL.navigateForward('/' + page)
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  }

  ionViewWillEnter() {
    this.menuCTRL.enable(true); // Enable menu for this page
  }
}
