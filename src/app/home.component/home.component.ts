import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BalanceService } from '../balance.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public balanceService: BalanceService) {}
  
  get denar() {
    return this.balanceService.balance;
  }
}