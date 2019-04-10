import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

//componentes
import { MainComponent } from './componentes/main/main.component';
import { AddComponent } from './componentes/add/add.component';
import { ListComponent } from './componentes/list/list.component';
import { EditComponent } from './componentes/edit/edit.component';
import { AdminGuard } from '../services/admin.guard';

const adminRoutes: Routes = [
    {
        path: 'admin-panel', component: MainComponent, canActivate: [AdminGuard],
            children: [
                {path: '', redirectTo: 'listado', pathMatch: 'full' },
                {path: 'listado', component: ListComponent},
                {path: 'crear', component: AddComponent},
                {path: 'editar/:id', component: EditComponent}
            ]
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(adminRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class AdminRoutingModule { }
