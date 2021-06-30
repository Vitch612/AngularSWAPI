import {Stringoridvalue} from '../Types/stringoridvalue';

export interface IPilot {
	name: string;
	height: string;
	mass: string;
	hair_color:string;
	skin_color:string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: Stringoridvalue;
	films: Stringoridvalue[];
	species: Stringoridvalue[];
	vehicles: Stringoridvalue[];
	starships: Stringoridvalue[];
	created: string;
	edited: string;
	url: string;
}