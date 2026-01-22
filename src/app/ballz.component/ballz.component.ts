import { Component, signal, ViewChildren, QueryList, ElementRef, ViewChild,  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { BalanceService } from '../balance.service';

@Component({
  selector: 'app-ballz.component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ballz.component.html',
  styleUrl: './ballz.component.scss'
})
export class BallzComponent {
  multiplier: number = 1.5;
  chance: number = 0;
  max: number = 2;
  gameStart: boolean = false;
  gameOver: boolean = true;
  betAmount: number = 10;
  potentialWinnings: number = 0;
  balloonScale: number = 1;
  currentMultiplier: number = 1; 
  balloonRedProgress: number = 0;
  dropdownMenu: boolean = true; // SPREMENI V FALSE KO SI KONEC
  
  @ViewChild('balloon') balloon!: ElementRef;
  gameResult: string = "Won.";
  
  constructor(public balanceService: BalanceService) {}
  
  get denar() {
    return this.balanceService.balance;
  }
  
  resetBallon() {
    this.balloonScale = 1;
    this.balloon.nativeElement.style.backgroundColor = '#aaa';
    this.balloon.nativeElement.style.transform = `scale(${this.balloonScale})`;
    this.currentMultiplier = 1;
    this.balloonRedProgress = 0;
  }
  
  moreRed() {
    const r = Math.round(170 + (255 - 170) * this.balloonRedProgress);
    const g = Math.round(170 - 170 * this.balloonRedProgress);
    const b = Math.round(170 - 170 * this.balloonRedProgress);
    this.balloon.nativeElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
  
  ballClick(){
  if(!this.gameStart){
    return;
  }
  const winProbability = 1 / this.multiplier;
  const randomValue = Math.random();
  console.log('Win probability:', winProbability, 'Random:', randomValue);
  if(randomValue < winProbability){
    this.currentMultiplier *= this.multiplier;
    this.potentialWinnings = Math.round(this.betAmount * this.currentMultiplier * 100) / 100;
    this.balloonScale += 0.1;
    this.balloonRedProgress = Math.min(1, this.balloonRedProgress + 0.15);
    this.balloon.nativeElement.style.transform = `scale(${this.balloonScale})`;
    this.moreRed();
    this.gameResult = "Won.";
  }
  else{
    this.balloon.nativeElement.style.transform = `scale(0)`;
    this.gameResult = "Lost.";
    this.gameOver = false;
    this.gameStart = false;
  }
}
  
  startGame() {
    if (this.betAmount > this.denar) {
      alert('Not enough money!');
      return;
    }
    
    this.balanceService.subtractBalance(this.betAmount);
    this.potentialWinnings = this.betAmount;
    this.currentMultiplier = 1; this.potentialWinnings
    this.gameOver = false;
    this.gameStart = true;
  }
  
  tryAgain() {
    this.gameOver = true;
    this.resetBallon();

  }
  
  cashoutFun() {
    if (this.currentMultiplier <= 1) return;
    this.balanceService.addBalance(this.potentialWinnings);
    this.gameOver = false;
    this.gameStart = false;
  }
}