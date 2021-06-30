import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../Services/swapi/swapi.service';
import { IPilot } from '../../Interfaces/ipilot';

@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.css']
})
export class PilotsComponent implements OnInit {

  pilots!:IPilot[];
  id:string|null=null;

  constructor(private swapiService: SwapiService,private route: ActivatedRoute) {}

  ngOnInit(): void {    
    this.pilots=this.swapiService.getPilots();
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
