import { Component } from '@angular/core';
import { BalanceService } from '../balance.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public balanceService: BalanceService) {}
    
  get denar() {
    return this.balanceService.balance;
  }

}

