import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { AudiosComponent } from './pages/audios/audios.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { LoginComponent } from './pages/login/login.component';
import { ProgramarComponent } from './pages/programar/programar.component';
import { AgregarCancionComponent } from './components/agregar-cancion/agregar-cancion.component';

const appRutes: Routes = [
  { path: '', component:  LoginComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'home', component:  IndexComponent},
  { path: 'audios', component:  AudiosComponent},
  { path: 'calendar', component:  CalendarComponent},
  { path: 'programar/:fecha', component: ProgramarComponent},
  { path: 'agregar', component: AgregarCancionComponent}

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRutes);
