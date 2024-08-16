import { Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {FaqComponent} from "./faq/faq.component";
import {AboutComponent} from "./about/about.component";

export const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
