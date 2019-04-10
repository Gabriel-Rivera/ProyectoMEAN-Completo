import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders} from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Importar Modulo
import {ModuloEmailModule} from './moduloemail/moduloemail.module' 
import {AdminModule } from './moduloadmin/admin.module';

//servicios
import { UserService } from './services/user.service';
import { UploadService } from './services/upload.service';
import { AnimalService } from './services/animal.service';




import { AppComponent } from './app.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ParquesComponent } from './components/parques/parques.component';
import { HomeComponent } from './components/home/home.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { ContactComponent } from './components/contact/contact.component';
import { KeepersComponent } from './components/keepers/keepers.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AnimalDetailComponent } from './components/animal-detail/animal-detail.component';


const appRoutes :Routes=[
  // {path:'',component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'tienda',component:TiendaComponent},
  {path:'animales',component:AnimalsComponent},
  {path:'cuidadores',component:KeepersComponent},
  {path:'contacto',component:ContactComponent},
  {path:'registro',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'mis-datos',component:UserEditComponent},  
  {path:'animal-detail/:id',component:AnimalDetailComponent},  
  {path:'**',component:HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ParquesComponent,
    HomeComponent,
    AnimalsComponent,
    ContactComponent,
    KeepersComponent,
    LoginComponent,
    RegisterComponent,
    UserEditComponent,
    AnimalDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ModuloEmailModule,
    AdminModule,
    BrowserAnimationsModule
  ],
  providers: [UserService,UploadService,AnimalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
