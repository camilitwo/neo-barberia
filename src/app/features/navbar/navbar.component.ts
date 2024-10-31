import {Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  title = 'BarberHub';

  toggleMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('ul.nav-menu');

    menuToggle?.addEventListener('click', () => {
      navMenu?.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  ngOnInit() {
    this.toggleMenu();
  }

}
