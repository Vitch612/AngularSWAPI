import {Stringoridvalue} from '../Types/stringoridvalue';

export interface IMovie {
	characters: Stringoridvalue[];
	created: string;
	director: string;
	edited: string;
	episode_id: string;
	opening_crawl: string;
	planets: Stringoridvalue[];
	producer: string;
	release_date: string;
	species: Stringoridvalue[];
	starships: Stringoridvalue[];
	title: string;
	url: string;
	vehicles: Stringoridvalue[];
}