import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-guardar-email',
  templateUrl: './guardar-email.component.html',
  styleUrls: ['./guardar-email.component.css']
})
export class GuardarEmailComponent implements OnInit,DoCheck {

  title="GuardarEmail";
  emailContacto:string;
  constructor() { }

  ngOnInit(){

  }
  ngDoCheck(){
    
  }

  guardarEmail(){
    localStorage.setItem('emailContacto',this.emailContacto);    
     console.log(localStorage.getItem('emailContacto'));    
     this.emailContacto=null;  
  }

}
