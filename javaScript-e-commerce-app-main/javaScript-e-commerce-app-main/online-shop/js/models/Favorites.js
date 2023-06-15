
import{getDataFromLocalStorage} from '../utils/localStorage.js'

export class FavoritesCount{

	constructor(){
		this.count = getDataFromLocalStorage("favoritesCount");
	}

	incementByOne(){
		this.count++;
	
	}

	decrementByOne(){
		if(this.count > 0){
			this.count--;
		}
	}
	
	getCount() {
		return this.count;
	  }

}


 
