import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UrlencodePipe } from './Pipes/urlencode.pipe';

import { PilotsComponent } from './Components/pilots/pilots.component';
import { SpaceshipsComponent } from './Components/spaceships/spaceships.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { SpeciesComponent } from './Components/species/species.component';
import { MoviesComponent } from './Components/movies/movies.component';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { PlanetsComponent } from './Components/planets/planets.component';
import { DisplayobjectPipe } from './Pipes/displayobject.pipe';
import { HaspropPipe } from './Pipes/hasprop.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PilotsComponent,
    SpaceshipsComponent,
    UrlencodePipe,
    HomepageComponent,
    SpeciesComponent,
    MoviesComponent,
    VehiclesComponent,
    PlanetsComponent,
    DisplayobjectPipe,
    HaspropPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
