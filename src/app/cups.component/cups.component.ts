import { Component, signal, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BalanceService } from '../balance.service';
@Component({
  selector: 'app-cups.component',
  imports: [RouterLink, FormsModule],
  templateUrl: './cups.component.html',
  styleUrl: './cups.component.scss',
})
export class CupsComponent {
  randomCup: number = 0;
  maxCh:number = 100;
  multiplier:number = 0;
  gameStart: boolean = false;
  betAmount: number = 10;

  constructor(public balanceService: BalanceService) {}
  get denar(){
    return this.balanceService.balance;
  }

  checkCup(id: number){


    if(!this.gameStart)return;
    console.log(id);
    this.randomCup = Math.floor(Math.random() * this.maxCh)
    console.log(this.randomCup);

    if(this.randomCup<=50){
      this.multiplier = 1.2;

      if(this.randomCup<=17){
        this.multiplier = 3;
        
        if(this.randomCup == 1){
          this.multiplier = 9;
        }
      }

      this.gameStart = false;
     
      console.log(this.multiplier);
      this.multiplier = 0;
    }

    else{
      console.log("zgubo si")
    }
  }

  startCups(){
    this.gameStart = true;
    this.balanceService.subtractBalance(this.betAmount)
  }

}

