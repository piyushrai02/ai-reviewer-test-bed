import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list.component';
import { CardService } from './card.service';

@NgModule({
  declarations: [
    CardListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardListComponent
  ],
  providers: [
    CardService
  ]
})
export class CardListModule { }
