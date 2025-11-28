import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // ← import this
import { ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],  // ← add CommonModule here
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class App {
  protected readonly title = signal('matura');

  @ViewChildren('cell') cells!: QueryList<ElementRef>;

  chance: number = 0;
  mineId: number = 0;
  mineNum: number = 5;
  mineMenuOpen = false;

  openMineMenu() {
    this.mineMenuOpen = true;
  }

  confirmMines() {
    if(this.mineNum > 24 || this.mineNum < 1){
      console.log('debil sii')
      
    }

    else{
      console.log('Mines set to:', this.mineNum);
      this.mineMenuOpen = false;
      this.chance = (this.mineNum/25)*100

      console.log(this.chance)
    }

  }

  getMineId(id: number){
    this.mineId = id;
    console.log(this.mineId);

    const cellArray = this.cells.toArray();  // make normal array

    const cell = cellArray[id - 1].nativeElement; // because your IDs start at 1

    cell.style.backgroundColor = 'yellow';

  }

}