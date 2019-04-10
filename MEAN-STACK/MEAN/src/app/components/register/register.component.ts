import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { fadeIn } from '../animations';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations:[
    fadeIn
  ]
})
export class RegisterComponent implements OnInit {

  title:string;
  user:User;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private _userService: UserService
  ) { 
    this.title="Registro";
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit() {
    console.log("register.component cargado");
  }

  onSubmit(){
      this._userService.register(this.user)
        .subscribe(response =>{
          if(response.user && response.user._id){
            this.status = 'success';
            this.user = new User('','','','','','ROLE_USER','');
          }else{
            this.status = 'error';
          }
        },error=>{
          this.status = 'error';
          console.log(<any>error);
        });
  }

}
