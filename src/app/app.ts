import { Component, signal, viewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],  // ← add CommonModule here
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class App {
  protected readonly title = signal('matura');

  @ViewChildren('cell') cells!: QueryList<ElementRef>;
  denar: number = 100;
  betAmount: number = 100;

  mineMenuOpen = true;
  cashoutWindow = false;
  gameLocked = true;

  stevecMin: number = 0;
  minePositions: Set<number> = new Set();
  randomNumber:number = 0;
  mineId: number = 0;
  mineNum: number = 5;
  
  safePolja = 0;



  showMines(){
    for (let i = 1; i <= 25; i++) {
    
      const cellArray = this.cells.toArray();  
      const cell = cellArray[i - 1].nativeElement;

      if (this.minePositions.has(i)) {
        cell.style.backgroundColor = "black";   // mine
      } 
      
      else {
        cell.style.backgroundColor = "white"; // safe
      }
  }

  }
  openMineMenu() {
    this.mineMenuOpen = true;

  }


  confirmMines() { //PRIDOBIMO ŠTEVILO MIN
    if(this.mineNum > 24 || this.mineNum < 1){
      console.log('debil sii')
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

    this.cells.forEach(c => {
      const el = c.nativeElement;
      el.style.backgroundColor = ""; // remove yellow/red
    });

    this.denar = this.denar-this.betAmount;
  }


  checkForMine(id: number){ //KO STISNEMO NA MINO
    this.stevecMin++;

    const cellArray = this.cells.toArray();  // make normal array
    const cell = cellArray[id - 1].nativeElement; // because your IDs start at 1
    
    if (this.gameLocked) return; 

    if (this.minePositions.has(id)){
      cell.style.backgroundColor = "black";

      this.stevecMin = 0;
      this.showMines();
      this.cashoutWindow = false;
      this.gameLocked = true;
      this.mineMenuOpen = true;
    }

    else{
      cell.style.backgroundColor = "white";
    }

  }

  cashoutFun(){
    if(this.stevecMin == 0) return;
    this.showMines()
    console.log(this.minePositions);


    this.minePositions.clear();
    this.gameLocked = true;
    this.mineMenuOpen = true;
    this.cashoutWindow = false;
    this.stevecMin = 0;

  }

}