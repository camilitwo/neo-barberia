import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const toggles = this.el.nativeElement.querySelectorAll('.faq-toggle') as NodeListOf<HTMLElement>;

    toggles.forEach((toggle: HTMLElement) => {
      this.renderer.listen(toggle, 'click', () => {
        const parent = toggle.parentNode as HTMLElement;
        parent.classList.toggle('active');
      });
    });
  }

}
