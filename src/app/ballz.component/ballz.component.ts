import { Component, signal, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { BalanceService } from '../balance.service';

@Component({
  selector: 'app-ballz.component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ballz.component.html',
  styleUrl: './ballz.component.scss'
})


export class BallzComponent {
  multiplier:number = 2;
  chance:number = 0;
  max:number = 2;
  gameStart:boolean = false;
  gameOver:boolean = true;
  betAmount:number = 10;
  potentialWinnings:number = 0;

  gameResult:string = "Won.";

  constructor(public balanceService: BalanceService) {}

  get denar(){
    return this.balanceService.balance;
  }


  ballClick(){
    if(!this.gameStart){
      return;
    }

    this.chance = Math.floor(Math.random() * this.max);
    console.log(this.chance)


    if(this.chance == 1){
      this.multiplier = this.multiplier * 2;
      this.potentialWinnings *= 2;
      this.gameResult = "Won."
    }

    else{
      this.gameResult = "Lost.";
      this.multiplier = 2;
      this.gameOver = false;
      this.gameStart = false;
    }

  }


  startGame(){

    if(this.betAmount > this.denar){
      alert('Not enough money!');
      return;
    }
   
    this.balanceService.subtractBalance(this.betAmount);

    this.potentialWinnings = this.betAmount;
    this.gameOver = false;
    this.gameStart = true;

  }

  tryAgain(){
    this.gameOver = true;
  }

  cashoutFun(){
    if(this.multiplier == 2)return;

    this.balanceService.addBalance(this.potentialWinnings);

    this.multiplier = 2;

    this.gameOver = false;
    this.gameStart = false;
  }

}
