import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeComponent } from './tictactoe.component';

@NgModule({
  declarations: [
    TicTacToeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TicTacToeComponent
  ]
})
export class TicTacToeModule { }
