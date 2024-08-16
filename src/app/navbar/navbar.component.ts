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
export class NavbarComponent implements OnInit {

  toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu) {
      navMenu.classList.toggle('active');
    }
    if (hamburger) {
      hamburger.classList.toggle('active');
    }
  }

// Puedes también ajustar la lógica para cerrar el menú al hacer clic en un enlace
  closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
    if (hamburger && hamburger.classList.contains('active')) {
      hamburger.classList.remove('active');
    }
  }
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, private el: ElementRef) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.renderer.listen('window', 'scroll', () => {
        this.fixNav();
      });
    }
  }

  fixNav() {
    const nav = this.el.nativeElement.querySelector('.nav') as HTMLElement;
    if (window.scrollY > nav.offsetHeight + 150) {
      this.renderer.addClass(nav, 'active');
    } else {
      this.renderer.removeClass(nav, 'active');
    }
  }

}
