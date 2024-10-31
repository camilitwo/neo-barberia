import { Component } from '@angular/core';
import {NavbarComponent} from "../../features/navbar/navbar.component";
import {FooterComponent} from "../../features/footer/footer.component";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
