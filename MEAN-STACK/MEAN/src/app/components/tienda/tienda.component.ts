import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;
import { trigger, state, style, transition, animate } from '@angular/animations';
import { fadeIn } from '../animations';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  animations: [
    trigger('marcar', [
      state('inactive', style({
        border: '5px solid #ccc'
      })),
      state('active', style({
        border: '5px solid yellow',
        background: 'red',
        borderRadius: '50px',
        transform: 'scale(1.2)'
      })),
      transition('inactive => active', animate('300ms linear')),
      transition('active => inactive', animate('300ms linear'))
    ]),
    fadeIn
  ]
})
export class TiendaComponent implements OnInit {

  titulo: string;
  nombreDelParque: string;
  miParque;
  status;

  constructor() {
    this.titulo = 'Esta es la tienda';
    this.status = 'inactive';
  }

  ngOnInit() {
    $('#textjq').hide();
    $('#botonjq').click(function () {
      $('#textjq').slideToggle();
    });

    $('#caja').dotdotdot({
    // Colocar puntos suspensivos en limite de un div
    });
  }

  mostrarNombre() {
    //  console.log(this.nombreDelParque);
  }
  verDatosParque(event) {
    console.log(event);
    this.miParque = event;
  }

  cambiarEstado(status) {
    if (this.status === 'inactive') {
      this.status = 'active';
    } else {
      this.status = 'inactive';
    }
  }
}
