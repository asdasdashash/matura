import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
  // ← import this
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

  randomNumber:number = 0;
  chance: number = 0;
  mineId: number = 0;
  mineNum: number = 5;
  mineMenuOpen = true;
  safePolja = 0;
  openMineMenu() {
    this.mineMenuOpen = true;
  }

  confirmMines() {
    if(this.mineNum > 24 || this.mineNum < 1){
      console.log('debil sii')
      
    }

    else{
      console.log('Mines set to:', this.mineNum);
      this.safePolja = 25;

      this.mineMenuOpen = false;
      this.chance = (this.mineNum/25)*100;
      this.safePolja = this.safePolja - this.mineNum;
      console.log(this.safePolja);
    }

  }

  getMineId(id: number){
    this.randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(this.randomNumber)
    console.log("šansa za mino "+this.chance)
    console.log("st varnih polj "+this.safePolja)


    this.mineId = id;

    const cellArray = this.cells.toArray();  // make normal array

    const cell = cellArray[id - 1].nativeElement; // because your IDs start at 1

    if(this.chance < this.randomNumber && this.safePolja > 0){
      cell.style.backgroundColor = "yellow";
    }

    else{
      cell.style.backgroundColor = "red";
    }


    this.safePolja--;
  }

}