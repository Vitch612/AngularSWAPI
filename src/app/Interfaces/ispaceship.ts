import {Stringoridvalue} from '../Types/stringoridvalue';

export interface ISpaceship {
   	MGLT: string;
    cargo_capacity: string;    
    consumables: string;
    cost_in_credits: string;
    created: string;
    crew: string;
    edited: string;
    films: Stringoridvalue[];
    hyperdrive_rating: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    pilots: Stringoridvalue[];
    starship_class: string;
    url: string;
}