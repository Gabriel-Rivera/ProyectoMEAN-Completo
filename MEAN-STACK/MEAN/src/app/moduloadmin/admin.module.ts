import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminRoutingModule } from './admin-routing.module';


//importar componentes
import { MainComponent } from './componentes/main/main.component';
import { AddComponent } from './componentes/add/add.component';
import { ListComponent } from './componentes/list/list.component';
import { EditComponent } from './componentes/edit/edit.component';
import { SearchPipe } from './pipes/search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations:[
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent,
        SearchPipe
    ],
    imports:[
        CommonModule,
        FormsModule,
        HttpModule,
        AdminRoutingModule,
        BrowserAnimationsModule
    ],
    exports:[
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ],
    providers:[

    ]
})

export class AdminModule { }