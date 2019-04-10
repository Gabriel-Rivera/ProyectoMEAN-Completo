import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router'; 
import { GLOBAL } from '../../../services/global';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { Animal } from '../../../models/animal';
import { fadeLateral } from '../../animation';

@Component({
  selector: 'admin-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  animations:[
    fadeLateral
  ]
})
export class AddComponent implements OnInit {

  title="Añadir";
  url:string;
  animal:Animal;
  identity;
  token;
  status;

  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private _userService: UserService,
    private _animalService: AnimalService,
    private _uploadService: UploadService,
  
  ) { 
    this.animal= new Animal('','','',2017,'','');
    this.identity = this._userService.getIdentity();
    this.token= this._userService.getToken();
    this.url= GLOBAL.url;
  }

  ngOnInit() {
  }
  onSubmit(){
    this._animalService.addAnimal(this.token,this.animal)
        .subscribe(response=>{         
          if(!response.animal){
            this.status= "error";
          }else{
            this.status= "success";
            this.animal = response.animal;
            //subir imagen
             if(!this.fileToUpload){
               this._router.navigate(['/admin-panel/listado']);
             }else{
               this._uploadService.makeFileRequest(`${this.url}upload-image-animal/${this.animal._id}`,[],this.fileToUpload,this.token,'image')
               .then((result:any)=>{
                   this.animal.image= result.image;
                   this._router.navigate(['/admin-panel/listado']);
             });           
            }


           }
        },error=>{
          var errorMessage = <any>error;
          if(errorMessage != null){
            this.status='error';
          }
        });
  }
  //metodo para capturar ficheros que estoy poniendo en mi input
fileToUpload:Array<File>;

fileChangeEvent(fileInput :any){
  this.fileToUpload = <Array<File>>fileInput.target.files;  
}

}
