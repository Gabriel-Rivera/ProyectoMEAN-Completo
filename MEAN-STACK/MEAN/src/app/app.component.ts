import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service'; 
import { Router,ActivatedRoute,Params, Route } from '@angular/router';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'Curso MEAN STACK';
  identity;
  url;

  constructor(
    private _userService:UserService,
    private _router: Router
  ){
    this.url= GLOBAL.url;
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity()
  }

  ngOnInit(){
   this.identity = this._userService.getIdentity()
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/'])
  }



}

