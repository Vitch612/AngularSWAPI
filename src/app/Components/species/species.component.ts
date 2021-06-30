import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../Services/swapi/swapi.service';
import { ISpecies } from '../../Interfaces/ispecies';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {

  species!:ISpecies[];
  id:string|null=null;

  constructor(private swapiService: SwapiService,private route: ActivatedRoute) {}

  ngOnInit(): void {    
    this.species=this.swapiService.getSpecies();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id=="") 
        this.id=null;
    });
  }
  
  public toggle(event:any) {
    event.preventDefault();
    event.target.parentElement.parentElement.querySelector('.details').classList.toggle('hidden');
  }

}
