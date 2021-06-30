import { Observable } from 'rxjs';
import { ISwapi } from '../Interfaces/iswapi';

export interface ISwapiConfig {
	url: string,
	next: string|null,
    list:Object[];
	collection: Observable<ISwapi>|null;
	type:string;
}