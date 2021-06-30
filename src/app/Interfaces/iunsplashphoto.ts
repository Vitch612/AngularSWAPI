import { IUnsplashURLS} from './iunsplashurls';

export interface IUnsplashPhoto {
    alt_description: string;
	blur_hash: string;
	categories: string[];
	color: string;
	created_at: string;
	current_user_collections: string[];
	description: string;
	downloads: number;
	exif: Object;
	height: number;
	id: string;
	liked_by_user: boolean;
	likes: number
	links: Object;
	location: Object;
	meta: Object;
	promoted_at: string|null
	related_collections: Object;
	sponsorship: null
	tags: Object[];
	topics: string[];
	updated_at: string;
	urls: IUnsplashURLS;
	user: Object;
	views: number;
	width: number;

}