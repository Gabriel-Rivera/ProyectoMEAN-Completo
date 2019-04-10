import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-parques',
  templateUrl: './parques.component.html',
  styleUrls: ['./parques.component.css']
})
export class ParquesComponent implements OnInit, OnChanges,DoCheck, OnDestroy{

  @Input() nombre: string;
  @Input('metrosCuadrados') metros: number;
  vegetacion: string;
  abierto: boolean;

  @Output() pasameLosDatos = new EventEmitter();

  constructor() {
    this.nombre = "Parque natural para caballos";
    this.metros = 450;
    this.vegetacion = 'alta';
    this.abierto = false;
  }

  ngOnChanges(changes :SimpleChanges){
    //  console.log(changes);
    //console.log("Existen cambios");
  }

  ngOnInit() {
      // console.log("metodo OnInit lanzado")
  }

  ngDoCheck(){
    // console.log('el DoCheck se ha ejecutado');
  }

  ngOnDestroy(){
    // console.log('Se va a eliminar el componente');
  }

  emitirEvento() {
    this.pasameLosDatos.emit({
      'nombre': this.nombre,
      'metros': this.metros,
      'vegetacion': this.vegetacion,
      'abierto': this.abierto
    });
  }

}
