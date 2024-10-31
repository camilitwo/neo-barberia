import { Routes } from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {FaqComponent} from "./components/faq/faq.component";
import {AboutComponent} from "./components/about/about.component";

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
