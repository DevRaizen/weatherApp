import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'src/app/components/card/card.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComhisComponent } from 'src/app/components/comhis/comhis.component';
import { ComfavComponent } from 'src/app/components/comfav/comfav.component';

const myComponent = [CardComponent,ComhisComponent,ComfavComponent];

@NgModule({
  declarations: [myComponent],
  imports: [
    CommonModule,IonicModule,RouterModule
  ],
  exports: myComponent
})
export class MyModulesModule { }
