import { Component } from '@angular/core';
import { BalanceService } from '../balance.service';
import { NgFor } from '@angular/common';
import { Card } from '../models/card.interface';
import cardsData from '../data/cardsData.json';

@Component({
  selector: 'app-card.game.component',
  imports: [NgFor],
  templateUrl: './card.game.component.html',
  styleUrl: './card.game.component.scss',
})

export class CardGameComponent {
  constructor(public balanceService: BalanceService) {}
    
  get denar() {
    return this.balanceService.balance;
  }

  clickedCount: number = 0;
  plCardValue: number = 0;
  opCardValue: number = 0;


  cards: Card[]  = cardsData.cards;
  drawnCards: Card[] = [];

  ngOnInit() {
    this.assignRandomCards();
  }

  assignRandomCards() {
    const shuffled = [...this.cards].sort(() => Math.random() - 0.5);
  
    this.drawnCards = shuffled.slice(0, 6);
  }

  cardClick(card:Card){
    if(card.clicked == false || card.clicked == undefined){
      if(this.clickedCount == 3){
        return;
      }
      this.clickedCount++;

      card.clicked = true;
    }

    else{
      card.clicked = false;
      this.clickedCount--;
    }
  }


  startGame(){
    if(this.clickedCount < 3){
      console.log("selectane so manj kot 3 karte")
      return;
    }

    else{

      for(let i = 0; i != this.drawnCards.length; i++){
        
        if(this.drawnCards[i].clicked == true){
          this.plCardValue += this.drawnCards[i].cardValue;
        }

        else{
          this.opCardValue += this.drawnCards[i].cardValue;
        }

      }
      console.log(this.plCardValue);
      console.log(this.opCardValue);
    }
  }
}
