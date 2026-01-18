import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private balanceSignal = signal<number>(150.00);
  
  get balance() {
    return this.balanceSignal();
  }
  
  set balance(value: number) {
    this.balanceSignal.set(value);
  }
  
  addBalance(amount: number) {
    this.balanceSignal.update(current => current + amount);
  }
  
  subtractBalance(amount: number) {
    this.balanceSignal.update(current => current - amount);
  }
}