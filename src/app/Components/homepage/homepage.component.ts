import { Component, OnInit } from '@angular/core';
import { UnsplashService } from '../../Services/unsplash/unsplash.service';
import { IPicture} from '../../Interfaces/ipicture';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  background:IPicture;

  constructor(private unsplashService: UnsplashService) {     
    this.unsplashService.fetchPhoto("R8Ohir17iak");
    this.background = this.unsplashService.getPhoto();
  } 

  ngOnInit(): void {
  }


}
