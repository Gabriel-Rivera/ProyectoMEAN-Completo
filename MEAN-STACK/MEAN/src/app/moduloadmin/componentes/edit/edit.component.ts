import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router'; 
import { GLOBAL } from '../../../services/global';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { Animal } from '../../../models/animal';
import { fadeLateral } from '../../animation';

@Component({
  selector: 'admin-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  animations:[
    fadeLateral
  ]
})
export class EditComponent implements OnInit {

  title="Editar Animal";
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
    private _uploadService: UploadService
  ) { 
     this.animal= new Animal('','','',2017,'','');
    // this.identity = this._userService.getIdentity();
    this.token= this._userService.getToken();
    this.url= GLOBAL.url;
  }

  ngOnInit() {
    this.getAnimal();
  }

  getAnimal(){
    this._route.params.forEach((params:Params)=>{
      let id = params['id'];

      this._animalService.getAnimal(id).subscribe(
        response =>{
          if(!response.animal){
            this._router.navigate(['/']);
          }else{
            this.animal = response.animal;
          }
      },error=>{
        console.log(<any>error);
        this._router.navigate(['/']);
      });
    });
  }

  onSubmit(){
    this._animalService.editAnimal(this.token,this.animal._id,this.animal)
        .subscribe(response=>{         
          if(!response.animal){
            this.status= "error";
          }else{
            this.status= "success";
            this.animal = response.animal;
            //subir imagen
             if(!this.fileToUpload){
               this._router.navigate(['/animal-detail/',this.animal._id]);
             }else{
               this._uploadService.makeFileRequest(`${this.url}upload-image-animal/${this.animal._id}`,[],this.fileToUpload,this.token,'image')
               .then((result:any)=>{
                   this.animal.image= result.image;
                   this._router.navigate(['/animal-detail/',this.animal._id]);
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
