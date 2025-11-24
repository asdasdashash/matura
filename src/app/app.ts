import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // ← import this

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],  // ← add CommonModule here
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('matura');

  mineNum: number = 5;
  mineMenuOpen = false;

  openMineMenu() {
    this.mineMenuOpen = true;
  }

  confirmMines() {
    console.log('Mines set to:', this.mineNum);
    this.mineMenuOpen = false;
  }
}

