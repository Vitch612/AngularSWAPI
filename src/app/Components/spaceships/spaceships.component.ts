import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../Services/swapi/swapi.service';
import { ISpaceship } from '../../Interfaces/ispaceship';
import {Stringoridvalue} from '../../Types/stringoridvalue';

@Component({
  selector: 'app-spaceships',
  templateUrl: './spaceships.component.html',
  styleUrls: ['./spaceships.component.css']
})
export class SpaceshipsComponent implements OnInit {

  spaceships!:ISpaceship[];
  id:string|null=null;

  constructor(private swapiService: SwapiService,private route: ActivatedRoute) {} 

  ngOnInit(): void {    
    this.spaceships=this.swapiService.getSpaceships();
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
