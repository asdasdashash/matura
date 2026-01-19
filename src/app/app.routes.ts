import { Routes } from '@angular/router';
import { HomeComponent } from './home.component/home.component';
import { MinesComponent } from './mines.component/mines.component';
import { LoginComponent } from './login.component/login.component';
import { RegisterComponent } from './register.component/register.component';
import { BallzComponent } from './ballz.component/ballz.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mines', component: MinesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'ballz', component: BallzComponent },
  { path: '**', redirectTo: '' }
];