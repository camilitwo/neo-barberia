import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import * as AOS from 'aos';


@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit, AfterViewInit {
  @ViewChild('imgContainer', { static: false }) imgContainer!: ElementRef;
  isImageVisible = false;

  equipo = [
    {
      nombre: 'Christofer Beltran',
      apodo: 'Stofer',
      especialidad: 'Corte Clásico',
      descripcion: 'Con más de 10 años de experiencia, Carlos domina el estilo clásico con precisión y profesionalismo.',
      imagen: 'https://avatar.anywhere.app/files/img/fwX5JH1Nz5M9/profilepic.png',
      instagram: 'https://instagram.com/carlosperez',
      facebook: 'https://facebook.com/carlosperez'
    },

    {
      nombre: 'Vicente Bravo',
      apodo: 'Viishon',
      especialidad: 'Corte Clásico',
      descripcion: 'Con más de 10 años de experiencia, Carlos domina el estilo clásico con precisión y profesionalismo.',
      imagen: 'https://avatar.anywhere.app/files/img/fSJlNA2u1AsE/profilepic.png',
      instagram: 'https://instagram.com/carlosperez',
      facebook: 'https://facebook.com/carlosperez'
    },
    {
      nombre: 'Fabián Garrido',
      apodo: 'Keo',
      especialidad: 'Corte Clásico',
      descripcion: 'Con más de 10 años de experiencia, Carlos domina el estilo clásico con precisión y profesionalismo.',
      imagen: 'https://avatar.anywhere.app/files/img/fkneURSA3h6p/profilepic.png',
      instagram: 'https://instagram.com/carlosperez',
      facebook: 'https://facebook.com/carlosperez'
    },
    {
      nombre: 'Julio Cesar',
      apodo: 'Juliocersabarber',
      especialidad: 'Corte Clásico',
      descripcion: 'Con más de 10 años de experiencia, Carlos domina el estilo clásico con precisión y profesionalismo.',
      imagen: 'https://avatar.anywhere.app/files/img/fLLJb3F5TdW0/1726283971723.png',
      instagram: 'https://instagram.com/carlosperez',
      facebook: 'https://facebook.com/carlosperez'
    },
  ];

  constructor() {}

  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isImageVisible = true;
          observer.unobserve(entry.target);
        }
      });
    });
    if (this.imgContainer) {
      observer.observe(this.imgContainer.nativeElement);
    }
  }

}
