import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.component.html',
  styleUrls: ['./keepers.component.css'],
  animations:[
    fadeIn
  ]
})
export class KeepersComponent implements OnInit {

  title:string;
  keepers :User[];
  url:string;

  constructor(
    private _userService: UserService
  ) {
      this.title= 'Cuidadores';
      this.url= GLOBAL.url;
   }

  ngOnInit() {
    console.log('component Keppers Iniciado');
    this.getKeepers(); 
  }

  getKeepers(){
    this._userService.getKeepers().subscribe(
      response =>{
        if(!response.users){
          // this._router.navigate(['/'])
        }else{
          this.keepers = response.users;
        }
    },error=>{
      console.log(<any>error)
    });
  }

}
