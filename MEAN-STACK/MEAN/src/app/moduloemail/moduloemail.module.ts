//importar modulos necesarios para crear modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//importar componentes
import { GuardarEmailComponent } from './componentes/guardar-email/guardar-email.component';
import { MostrarEmailComponent } from './componentes/mostrar-email/mostrar-email.component';
import { MainEmailComponent } from './componentes/main-email/main-email.component';

//Decorar ngModule para cargar los componentes y la configuracion del modulo

@NgModule({
    imports:[CommonModule,FormsModule],
    declarations:[
        GuardarEmailComponent,
        MostrarEmailComponent,
        MainEmailComponent
    ],
    exports:[
        MainEmailComponent
    ]
})
export class ModuloEmailModule { }
