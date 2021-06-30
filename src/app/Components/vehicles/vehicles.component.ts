import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../Services/swapi/swapi.service';
import { IVehicle } from '../../Interfaces/ivehicle';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  vehicles!:IVehicle[];
  id:string|null=null;

  constructor(private swapiService: SwapiService,private route: ActivatedRoute) {}

  ngOnInit(): void {    
    this.vehicles=this.swapiService.getVehicles();
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
