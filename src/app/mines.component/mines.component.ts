import { Component, signal, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BalanceService } from '../balance.service';
import { NavbarComponent } from "../navbar.component/navbar.component";

@Component({
  selector: 'app-mines',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './mines.component.html',
  styleUrls: ['./mines.component.scss']
})
export class MinesComponent {
  @ViewChildren('cell') cells!: QueryList<ElementRef>;
  betAmount: number = 10;
  mineMenuOpen = true;
  cashoutWindow = false;
  gameLocked = true;
  stevecMin: number = 0;
  minePositions: Set<number> = new Set();
  mineNum: number = 5;
  currentMultiplier: number = 1.0;
  showLostMessage: boolean = false;
  
  constructor(public balanceService: BalanceService) {}
  
  get denar() {
    return this.balanceService.balance;
  }
  
  calculateMultiplier(): number {
    const totalCells = 25;
    const safeCells = totalCells - this.mineNum;
    
    if (this.stevecMin === 0) return 1.0;
    
    const baseMultiplier = totalCells / (safeCells - this.stevecMin + 1);
    const multiplier = Math.pow(baseMultiplier, 0.9);
    return Math.round(multiplier * 100) / 100;
  }
  
  getPotentialWinnings(): number {
    return Math.round(this.betAmount * this.currentMultiplier);
  }
  
  showMines(){
    for (let i = 1; i <= 25; i++) {
      const cellArray = this.cells.toArray();  
      const cell = cellArray[i - 1].nativeElement;
      if (this.minePositions.has(i)) {
        cell.style.backgroundColor = "black";
      } 
      else {
        cell.style.backgroundColor = "white";
      }
    }
  }
  
  openMineMenu() {
    this.mineMenuOpen = true;
  }
  
  confirmMines() {
    if(this.mineNum > 24 || this.mineNum < 1){
      console.log('debil sii')
      return;
    }
    if(this.betAmount > this.denar){
      alert('Not enough money!');
      return;
    }

    this.minePositions.clear();

    while(this.minePositions.size < this.mineNum){
      const pos = Math.floor(Math.random() * 25)+1;
      this.minePositions.add(pos);
    }

    console.log("Mine so na: ", [...this.minePositions]);
    this.mineMenuOpen = false;
    this.cashoutWindow = true;
    this.gameLocked = false;
    this.currentMultiplier = 1.0;
    this.showLostMessage = false;
    this.cells.forEach(c => {
      const el = c.nativeElement;
      el.style.backgroundColor = "";
    });
    
    this.balanceService.subtractBalance(this.betAmount);
  }
  
  checkForMine(id: number){
    const cellArray = this.cells.toArray();
    const cell = cellArray[id - 1].nativeElement;
    
    if (this.gameLocked) return;
    if (cell.style.backgroundColor) return;
    
    if (this.minePositions.has(id)){
      cell.style.backgroundColor = "black";
      this.stevecMin = 0;
      this.showMines();
      this.cashoutWindow = false;
      this.gameLocked = true;
      this.mineMenuOpen = true;
      this.showLostMessage = true;
    }

    else{
      cell.style.backgroundColor = "white";
      this.stevecMin++;
      this.currentMultiplier = this.calculateMultiplier();
    }
  }
  
  cashoutFun(){
    if(this.stevecMin == 0) return;
    
    const winnings = this.getPotentialWinnings();
    this.balanceService.addBalance(winnings);
    
    this.showMines();
    console.log(this.minePositions);
    this.minePositions.clear();
    this.gameLocked = true;
    this.mineMenuOpen = true;
    this.cashoutWindow = false;
    this.stevecMin = 0;
    this.currentMultiplier = 1.0;
    this.showLostMessage = false;
  }
}