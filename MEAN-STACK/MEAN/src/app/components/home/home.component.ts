import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    fadeIn
  ]

})
export class HomeComponent implements OnInit {

  constructor() { }
  title='Bienvenido a NGZOO';

  ngOnInit() {
    console.log('home.component cargado');
    
  }

}
