import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations:[
    fadeIn
  ]
})
export class ContactComponent implements OnInit {

  title='Contact'
  emailContacto:string;
  constructor() { }

  ngOnInit() {
    console.log('component Contact Iniciado');
    
  }

  guardarEmail(){
    localStorage.setItem('emailContacto',this.emailContacto);    
     console.log(localStorage.getItem('emailContacto'));    
     this.emailContacto=null;  
  }
}
