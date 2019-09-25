import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

	constructor() { }

	validateRegister(user){
		if(user.username == ("" || undefined || null) || (user.username.length<=0)) {
			return false;
		}  
		else {
			return true;
		}
	}
}
