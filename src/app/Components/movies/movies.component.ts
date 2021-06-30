import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../Services/swapi/swapi.service';
import { IMovie } from '../../Interfaces/imovie';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies!:IMovie[];
  id:string|null=null;

  constructor(private swapiService: SwapiService,private route: ActivatedRoute) {}

  ngOnInit(): void {    
    this.movies=this.swapiService.getMovies();
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
