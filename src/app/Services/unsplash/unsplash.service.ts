import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUnsplash} from '../../Interfaces/iunsplash';
import { IUnsplashPhoto} from '../../Interfaces/iunsplashphoto';
import { IPicture} from '../../Interfaces/ipicture';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  apikey:string="FZ3El8nj15Dlc8tus7sgjEkww5SN2u5E3lAg_vrWyBU";

  picture:IPicture={title:"",alt:"",url:""};
  pictures:IPicture[]=new Array();

  constructor(private http: HttpClient) {}

  searchPhotos(searchstring:string):void {    
    this.http.get<IUnsplash>(`https://api.unsplash.com/search/photos/?query=`+encodeURI(searchstring)+`&client_id=${this.apikey}`).subscribe(
      response => {
        this.pictures.splice(0,this.pictures.length);
        for(let result of response.results) {
          this.pictures.push({url:result.urls.small,alt:result.alt_description,title:result.description});
        }
      },
      err => console.error('Error while retrieving pictures: ' + err)
    );
  }


  fetchPhoto(photoid:string):void {   
    this.http.get<IUnsplashPhoto>(`https://api.unsplash.com/photos/${photoid}?client_id=${this.apikey}`).subscribe(
      response => {
        this.picture.url=response.urls.small;
        this.picture.alt=response.alt_description;
        this.picture.title=response.description;
      },
      err => console.error('Error while retrieving picture: ' + err)
    );
  }


  getPhoto():IPicture {
    return this.picture;
  }

  getPhotos():IPicture[] {
    return this.pictures;
  }

}
