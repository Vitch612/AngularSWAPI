import { ISwapiConfig } from '../Interfaces/iswapiconfig';

export interface ISwapiConfigContainer {
	ships:ISwapiConfig,
    pilots:ISwapiConfig,
    species:ISwapiConfig,
    planets:ISwapiConfig,
    vehicles:ISwapiConfig,
    movies:ISwapiConfig
}