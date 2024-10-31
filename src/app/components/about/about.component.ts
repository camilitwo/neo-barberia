import { Component } from '@angular/core';
import {NavbarComponent} from "../../features/navbar/navbar.component";
import {FooterComponent} from "../../features/footer/footer.component";
import {TeamComponent} from "../team/team.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TeamComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
