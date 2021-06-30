import { IUnsplashPhoto} from './iunsplashphoto';

export interface IUnsplash {
	results: IUnsplashPhoto[];
	total: number;
	total_pages: number;
}