import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animal';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
  animations:[
    fadeIn
  ]
})
export class AnimalsComponent implements OnInit {

  title:string;
  animal:Animal;
  animals:Animal[];
  url:string;

  constructor(
    private _animalService: AnimalService
  ) { 
    this.title= 'Animales';
    this.url= GLOBAL.url;
  }

  ngOnInit() {
    console.log('component Animales Iniciado');
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
    },error=>{
      console.log(<any>error)
    });
  }

}
