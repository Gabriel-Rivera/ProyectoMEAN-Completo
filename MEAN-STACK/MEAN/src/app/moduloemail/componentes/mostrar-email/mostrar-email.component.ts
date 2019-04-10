import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-email',
  templateUrl: './mostrar-email.component.html',
  styleUrls: ['./mostrar-email.component.css']
})
export class MostrarEmailComponent implements OnInit {

  title="MostrarEmail";
  emailContacto:string;
  constructor() { }

  ngOnInit(){
    this.emailContacto=localStorage.getItem('emailContacto');
  }
  ngDoCheck(){
    this.emailContacto=localStorage.getItem('emailContacto');
  }

  borrarEmail(){
    localStorage.clear();
    this.emailContacto=null;
  }
}
