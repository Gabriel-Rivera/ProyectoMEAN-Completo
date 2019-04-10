import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router'; 
import { GLOBAL } from '../../../services/global';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';
import { UserService } from '../../../services/user.service';
import { fadeLateral } from '../../animation';
declare var $:any; 


@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations:[
    fadeLateral
  ]
})
export class ListComponent implements OnInit {

  title="Listado de Animales";
  numbers = new Array(10);
  animals : Animal[];
  token:string;
  busqueda;

  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private _animalService: AnimalService,
    private _userService: UserService

  ) { 
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getAnimals();
  }
  getAnimals(){
    this._animalService.getAnimals().subscribe(
      response =>{
        if(!response.animals){
          // this._router.navigate(['/'])
        }else{
          this.animals = response.animals;
        }
        this.animals
    },error=>{
      console.log(<any>error)
    });
  }

  deleteAnimal(id){
    $('#myModal-'+id).modal('hide');
    this._animalService.deleteAnimal(this.token,id).subscribe(
      response=>{
        if(!response.animal){
          alert('Error en el servidor');
        }else{
          this.getAnimals();
        }
      },error=>{

      });
  }

}
