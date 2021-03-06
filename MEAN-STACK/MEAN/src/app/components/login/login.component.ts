import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { fadeIn } from '../animations';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { getTestBed } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
    fadeIn
  ]
})
export class LoginComponent implements OnInit {

  title:string;
  user : User;
  identity;
  token;
 status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private _userService: UserService
  ) { 
    this.title="Login";
    this.user = new User('','','','','','ROLE_USER','');

  }

  ngOnInit() {
console.log(this._userService.getIdentity());
console.log(this._userService.getToken());    
  }

  onSubmit(){
   //loguear al usuario y conseguir sus datos  
    this._userService.signup(this.user)
      .subscribe(
        response =>{
          this.identity= response.issetEmail;
          
          if(!this.identity || !this.identity._id){
             console.log('El usuario no se ha logueado correctamente');
          }else{
            localStorage.setItem('identity',JSON.stringify(this.identity)); 
            
            //Conseguir el token
            this._userService.signup(this.user,'true')
            .subscribe(
              response=>{
                this.token= response.token;
                if(this.token.length <=0){
                  alert('El token no se ha generado');
                }else{
                  //mostrar token                   
                  localStorage.setItem('token',this.token);      
                  this.status='success';
                  this._router.navigate(['/']);
                }
              },error=>{
                console.log(<any>error);
              });
          }
        },error=>{
          var errorMessage= <any>error;
          if(errorMessage!=null){
              var body = JSON.parse(error._body);
              this.status='error';
          }
          console.log(<any>error);
        });
  }

}
