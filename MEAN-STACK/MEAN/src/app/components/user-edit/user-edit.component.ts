import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { fadeIn } from '../animations';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  animations:[
    fadeIn
  ]
})
export class UserEditComponent implements OnInit {

  title:string;
  user:User;
  identity;
  token;
  status;
  url;

  constructor(
    private _userService: UserService,
    private _uploadService: UploadService,
    private _router:Router
  ) {
    this.title = "Actualizar Datos"
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url=GLOBAL.url;
   }

  ngOnInit() {
  }

  onSubmit(){    
    this._userService.updateUser(this.user)
      .subscribe(response=>{
       
          if(!response.user){
            this.status='error';
          }else{
            this.status='success';
            localStorage.setItem('identity',JSON.stringify(this.user));

            //subida de imagen
            this._uploadService.makeFileRequest(`${this.url}upload-image-user/${this.user._id}`,[],this.fileToUpload,this.token,'image')
                .then((result:any)=>{
                    this.user.image= result.image;
                    localStorage.setItem('identity',JSON.stringify(this.user));                    
                });

          }
       },error=>{
          var errorMessage= <any>error
          if(errorMessage != null){
            this.status ='error'
          }
      });
  }

//metodo para capturar ficheros que estoy poniendo en mi input
fileToUpload:Array<File>;

fileChangeEvent(fileInput :any){
  this.fileToUpload = <Array<File>>fileInput.target.files;  
}

}
