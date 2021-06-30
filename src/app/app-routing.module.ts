import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Components/homepage/homepage.component';

import { SpaceshipsComponent } from './Components/spaceships/spaceships.component';
import { VehiclesComponent } from './Components/vehicles/vehicles.component';
import { SpeciesComponent } from './Components/species/species.component';
import { PlanetsComponent } from './Components/planets/planets.component';
import { PilotsComponent } from './Components/pilots/pilots.component';
import { MoviesComponent } from './Components/movies/movies.component';

const routes: Routes = [
  { path: 'spaceships', redirectTo: 'spaceships/', pathMatch: 'full' },    
  { path: 'vehicles', redirectTo: 'vehicles/', pathMatch: 'full'},
  { path: 'species', redirectTo: 'species/', pathMatch: 'full'},
  { path: 'planets', redirectTo: 'planets/', pathMatch: 'full'},
  { path: 'pilots', redirectTo: 'pilots/', pathMatch: 'full'},
  { path: 'movies', redirectTo: 'movies/', pathMatch: 'full'},
  { path: 'spaceships/:id', component: SpaceshipsComponent },    
  { path: 'vehicles/:id', component: VehiclesComponent},
  { path: 'species/:id', component: SpeciesComponent},
  { path: 'planets/:id', component: PlanetsComponent },
  { path: 'pilots/:id', component: PilotsComponent},
  { path: 'movies/:id', component: MoviesComponent},  
  { path: '**', component:  HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
