import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SWAPI';
  constructor(private location: Location) {}

  public toggle(event:any) {
    event.preventDefault();
    event.target.parentElement.parentElement.querySelector('.details').classList.toggle('hidden');
  }

  public backpressed(event:any) {
    console.log("back pressed");
    event.preventDefault();
    this.location.back();
  }
}
