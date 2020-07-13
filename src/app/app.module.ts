import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// tslint:disable-next-line:quotemark
import { FullCalendarModule } from "@fullcalendar/angular";
import { FormsModule } from "@angular/forms";

import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ReproductorComponent } from './components/reproductor/reproductor.component';
import { CaledarioComponent } from './components/caledario/caledario.component';
import { AudioPorDiaComponent } from './components/audio-por-dia/audio-por-dia.component';
import { EnReproduccionComponent } from './components/en-reproduccion/en-reproduccion.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { AudiosComponent } from './pages/audios/audios.component';

import { HttpClientModule } from '@angular/common/http';

// tslint:disable-next-line:quotemark
import { routing, appRoutingProviders } from "./app.routing";
import { ProgramacionComponent } from './components/programacion/programacion.component';
import { ProgramarComponent } from './pages/programar/programar.component';

// Configuracion para conexion de Firebase
import { AgregarCancionComponent } from './components/agregar-cancion/agregar-cancion.component';

// Importamos Sweet Alert
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ListaAudiosComponent } from './components/lista-audios/lista-audios.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ReproductorComponent,
    CaledarioComponent,
    AudioPorDiaComponent,
    EnReproduccionComponent,
    IndexComponent,
    LoginComponent,
    CalendarComponent,
    AudiosComponent,
    ProgramacionComponent,
    ProgramarComponent,
    AgregarCancionComponent,
    ListaAudiosComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FullCalendarModule,
    HttpClientModule,
    DragDropModule,
    FormsModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
