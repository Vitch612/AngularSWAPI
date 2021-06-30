import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IPilot } from '../../Interfaces/ipilot';
import { ISpaceship } from '../../Interfaces/ispaceship';
import { IPlanet } from '../../Interfaces/iplanet';
import { IVehicle } from '../../Interfaces/ivehicle';
import { IMovie } from '../../Interfaces/imovie';
import { ISpecies } from '../../Interfaces/ispecies';
import { ISwapi } from '../../Interfaces/iswapi';
import { ISwapiConfig } from '../../Interfaces/iswapiconfig';
import { ISwapiConfigContainer } from '../../Interfaces/iswapiconfigcontainer';
import { Stringoridvalue } from '../../Types/stringoridvalue';
//import { templateJitUrl } from '@angular/compiler';

//import { exit } from 'process';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {  
  private currentconfig:ISwapiConfigContainer = {
    ships:{
      url: "https://swapi.dev/api/starships",
      next: null,
      list: new Array(),
      collection: null,
      type:"ships"
    },
    pilots:{
      url: "https://swapi.dev/api/people",
      next: null,
      list: new Array(),
      collection: null,
      type:"pilots"
    },
    species: {
      url: "https://swapi.dev/api/species",
      next: null,
      list: new Array(),
      collection: null,
      type:"species"
    },
    planets: {
      url: "https://swapi.dev/api/planets",
      next: null,
      list: new Array(),
      collection: null,
      type:"planets"
    },
    vehicles: {
      url: "https://swapi.dev/api/vehicles",
      next: null,
      list: new Array(),
      collection: null,
      type:"vehicles"
    },
    movies: {
      url: "https://swapi.dev/api/films",
      next: null,
      list: new Array(),
      collection: null,
      type:"movies"
    }
  };

  constructor(private http: HttpClient) {
    console.log("constructor called");
    if (this.currentconfig.ships.list.length==0) {
      this.refreshList(this.currentconfig.ships);
      this.refreshList(this.currentconfig.vehicles);
      this.refreshList(this.currentconfig.movies);    
      this.refreshList(this.currentconfig.planets);    
      this.refreshList(this.currentconfig.species);
      this.refreshList(this.currentconfig.pilots);
    }
  }

  private updateObservable(config:ISwapiConfig):void {
    if (config.collection!=null)
      config.collection.subscribe(
        response => {
          for (let result of response.results) {          
            config.list.push(Object.assign(Object.create({}), result));
          }
          if (response.next!=null) {
            config.next = response.next;
            this.fetchListing(config);
          } else {
            config.next = null;
          }
        },
        err => console.error('Error while retrieving list: ' + err),
        () => {
          if (config.next==null && config.type=="pilots") {
            this.processIds();
          }
        }
      );
  }

  private urltoid(url:Stringoridvalue):string {
    if (typeof url!="string") {
      return "";
    }
    if (url.indexOf("/")>=0)
      return url.substr(0,url.length-1).substr(url.substr(0,url.length-1).lastIndexOf("/")+1,url.substr(0,url.length-1).length-url.substr(0,url.length-1).lastIndexOf("/")-1);
    else
      return url;
  }


  private processIds():void {
    for(let i=0;i<this.currentconfig.ships.list.length;i++) {
      (this.currentconfig.ships.list[i] as ISpaceship).url=this.urltoid((this.currentconfig.ships.list[i] as ISpaceship).url) as string;
    }
    for(let i=0;i<this.currentconfig.movies.list.length;i++) {
      (this.currentconfig.movies.list[i] as IMovie).url=this.urltoid((this.currentconfig.movies.list[i] as IMovie).url)  as string;
    }
    for(let i=0;i<this.currentconfig.species.list.length;i++) {            
      (this.currentconfig.species.list[i] as ISpecies).url=this.urltoid((this.currentconfig.species.list[i] as ISpecies).url) as string;
    }
    for(let i=0;i<this.currentconfig.vehicles.list.length;i++) {
      (this.currentconfig.vehicles.list[i] as IVehicle).url=this.urltoid((this.currentconfig.vehicles.list[i] as IVehicle).url) as string;
    }
    for(let i=0;i<this.currentconfig.planets.list.length;i++) {
      (this.currentconfig.planets.list[i] as IPlanet).url=this.urltoid((this.currentconfig.planets.list[i] as IPlanet).url) as string;
    }
    for(let i=0;i<this.currentconfig.pilots.list.length;i++) {
      (this.currentconfig.pilots.list[i] as IPilot).url=this.urltoid((this.currentconfig.pilots.list[i] as IPilot).url) as string;
    }     
    this.processList(this.currentconfig.movies);
    this.processList(this.currentconfig.pilots);
    this.processList(this.currentconfig.vehicles);            
    this.processList(this.currentconfig.ships);
    this.processList(this.currentconfig.planets);            
    this.processList(this.currentconfig.species);
  }

  private processList(config:ISwapiConfig):void {
    switch(config.type) {
      case "ships":
        for(let i=0;i<config.list.length;i++) {
          for (let j=0;j<(config.list[i] as ISpaceship).films.length;j++) {
            if (typeof (config.list[i] as ISpaceship).films[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as ISpaceship).films[j]);          
              (config.list[i] as ISpaceship).films[j] ={id:tmpid,value:this.getByID(this.currentconfig.movies,tmpid)} as Stringoridvalue;              
            }
          };
          for (let j=0;j<(config.list[i] as ISpaceship).pilots.length;j++) {
            (config.list[i] as ISpaceship).pilots[j]=this.urltoid((config.list[i] as ISpaceship).pilots[j]);
            if (typeof (config.list[i] as ISpaceship).pilots[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as ISpaceship).pilots[j]);
              (config.list[i] as ISpaceship).pilots[j] ={id:tmpid,value:this.getByID(this.currentconfig.pilots,tmpid)} as Stringoridvalue;              
            }
          };
        }
      break;
      case "movies":
        for(let i=0;i<config.list.length;i++) {
          for (let j=0;j<(config.list[i] as IMovie).characters.length;j++) {              
            if (typeof (config.list[i] as IMovie).characters[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IMovie).characters[j]);
              (config.list[i] as IMovie).characters[j] ={id:tmpid,value:this.getByID(this.currentconfig.pilots,tmpid)} as Stringoridvalue;              
            }
          };
          for (let j=0;j<(config.list[i] as IMovie).planets.length;j++) {
            if (typeof (config.list[i] as IMovie).planets[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IMovie).planets[j]);
              (config.list[i] as IMovie).planets[j] ={id:tmpid,value:this.getByID(this.currentconfig.planets,tmpid)} as Stringoridvalue;              
            }
          };
          for (let j=0;j<(config.list[i] as IMovie).species.length;j++) {
            if (typeof (config.list[i] as IMovie).species[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IMovie).species[j]);
              (config.list[i] as IMovie).species[j] ={id:tmpid,value:this.getByID(this.currentconfig.species,tmpid)} as Stringoridvalue;              
            }
          };
          for (let j=0;j<(config.list[i] as IMovie).starships.length;j++) {
            if (typeof (config.list[i] as IMovie).starships[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IMovie).starships[j]);
              (config.list[i] as IMovie).starships[j] ={id:tmpid,value:this.getByID(this.currentconfig.ships,tmpid)} as Stringoridvalue;
            }
          };
          for (let j=0;j<(config.list[i] as IMovie).vehicles.length;j++) {
            if (typeof (config.list[i] as IMovie).vehicles[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IMovie).vehicles[j]);
              (config.list[i] as IMovie).vehicles[j] ={id:tmpid,value:this.getByID(this.currentconfig.vehicles,tmpid)} as Stringoridvalue;
            }
          };
        }
      break;
      case "species":
        for(let i=0;i<config.list.length;i++) {            
          (config.list[i] as ISpecies).homeworld=this.urltoid((config.list[i] as ISpecies).homeworld);
          for (let j=0;j<(config.list[i] as ISpecies).films.length;j++) {
            if (typeof (config.list[i] as ISpecies).films[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as ISpecies).films[j]);
              (config.list[i] as ISpecies).films[j] ={id:tmpid,value:this.getByID(this.currentconfig.movies,tmpid)} as Stringoridvalue;
            }
          };
          for (let j=0;j<(config.list[i] as ISpecies).people.length;j++) {
            if (typeof (config.list[i] as ISpecies).people[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as ISpecies).people[j]);
              (config.list[i] as ISpecies).people[j] ={id:tmpid,value:this.getByID(this.currentconfig.pilots,tmpid)} as Stringoridvalue;
            }
          };
        }
      break;
      case "vehicles":
        for(let i=0;i<config.list.length;i++) {
          for (let j=0;j<(config.list[i] as IVehicle).films.length;j++) {
            if (typeof (config.list[i] as IVehicle).films[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IVehicle).films[j]);
              (config.list[i] as IVehicle).films[j] ={id:tmpid,value:this.getByID(this.currentconfig.movies,tmpid)} as Stringoridvalue;
            }            
          };
          for (let j=0;j<(config.list[i] as IVehicle).pilots.length;j++) {
            if (typeof (config.list[i] as IVehicle).pilots[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IVehicle).pilots[j]);
              (config.list[i] as IVehicle).pilots[j] ={id:tmpid,value:this.getByID(this.currentconfig.pilots,tmpid)} as Stringoridvalue;
            }
          };
        }
      break;
      case "planets":
        for(let i=0;i<config.list.length;i++) {
          for (let j=0;j<(config.list[i] as IPlanet).films.length;j++) {
            (config.list[i] as IPlanet).films[j]=this.urltoid((config.list[i] as IPlanet).films[j]);
            if (typeof (config.list[i] as IPlanet).films[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IPlanet).films[j]);
              (config.list[i] as IPlanet).films[j] ={id:tmpid,value:this.getByID(this.currentconfig.movies,tmpid)} as Stringoridvalue;
            }            
          };
          for (let j=0;j<(config.list[i] as IPlanet).residents.length;j++) {
            if (typeof (config.list[i] as IPlanet).residents[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IPlanet).residents[j]);
              (config.list[i] as IPlanet).residents[j] ={id:tmpid,value:this.getByID(this.currentconfig.pilots,tmpid)} as Stringoridvalue;
            }
          };
        }
      break;
      case "pilots":
        for(let i=0;i<config.list.length;i++) {
          (config.list[i] as IPilot).homeworld=this.urltoid((config.list[i] as IPilot).homeworld);
          for (let j=0;j<(config.list[i] as IPilot).films.length;j++) {
            if (typeof (config.list[i] as IPilot).films[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IPilot).films[j]);
              (config.list[i] as IPilot).films[j] ={id:tmpid,value:this.getByID(this.currentconfig.movies,tmpid)} as Stringoridvalue;
            }
          };
          for (let j=0;j<(config.list[i] as IPilot).species.length;j++) {
            if (typeof (config.list[i] as IPilot).species[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IPilot).species[j]);
              (config.list[i] as IPilot).species[j] ={id:tmpid,value:this.getByID(this.currentconfig.species,tmpid)} as Stringoridvalue;
            }            
          };
          for (let j=0;j<(config.list[i] as IPilot).vehicles.length;j++) {
            if (typeof (config.list[i] as IPilot).vehicles[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IPilot).vehicles[j]);
              (config.list[i] as IPilot).vehicles[j] ={id:tmpid,value:this.getByID(this.currentconfig.vehicles,tmpid)} as Stringoridvalue;
            }            
          };
          for (let j=0;j<(config.list[i] as IPilot).starships.length;j++) {
            if (typeof (config.list[i] as IPilot).starships[j]=="string") {
              let tmpid=this.urltoid((config.list[i] as IPilot).starships[j]);
              (config.list[i] as IPilot).starships[j] ={id:tmpid,value:this.getByID(this.currentconfig.ships,tmpid)} as Stringoridvalue;
            }
          };
        }        
      break;
    }  
  }

  private getByID(config:ISwapiConfig,id:string):string {
    switch(config.type) {
      case "ships":
        for(let i=0;i<config.list.length;i++) {
            if ((config.list[i] as ISpaceship).url==id) {
              return (<ISpaceship>config.list[i]).name;
            }
        }
      break;
      case "movies":
        for(let i=0;i<config.list.length;i++) {
            if ((config.list[i] as IMovie).url==id) {
              return (<IMovie>config.list[i]).title;
            }
        }
      break;
      case "species":
        for(let i=0;i<config.list.length;i++) {            
            if ((config.list[i] as ISpecies).url==id) {
              return (<ISpecies>config.list[i]).name;
            }
        }
      break;
      case "vehicles":
        for(let i=0;i<config.list.length;i++) {
            if ((config.list[i] as IVehicle).url==id) {
              return (<IVehicle>config.list[i]).name;
            }
        }
      break;
      case "planets":
        for(let i=0;i<config.list.length;i++) {
            if ((config.list[i] as IPlanet).url==id) {
              return (<IPlanet>config.list[i]).name;
            }
        }
      break;
      case "pilots":
        for(let i=0;i<config.list.length;i++) {
            if ((config.list[i] as IPilot).url==id) {
              return (<IPilot>config.list[i]).name;
            }
        }        
      break;
    }
    return "";
  }


  refreshList(config:ISwapiConfig):void {
    config.list.splice(0,config.list.length);
    config.next = config.url;
    this.fetchListing(config);    
  }

  private fetchListing(config:ISwapiConfig):void {
    if (config.next!=null) {
      config.collection = this.http.get<ISwapi>(config.next);
      this.updateObservable(config);
    }
  }

  getSpaceships():ISpaceship[] {
    return this.currentconfig.ships.list as Array<ISpaceship>;
  }
  getPilots():IPilot[] {
    return this.currentconfig.pilots.list as Array<IPilot>;
  }
  getPlanets():IPlanet[] {
    return this.currentconfig.planets.list as Array<IPlanet>;
  }
  getVehicles():IVehicle[] {
    return this.currentconfig.vehicles.list as Array<IVehicle>;
  }
  getMovies():IMovie[] {
    return this.currentconfig.movies.list as Array<IMovie>;
  }
  getSpecies():ISpecies[] {
    return this.currentconfig.species.list as Array<ISpecies>;
  }
}
