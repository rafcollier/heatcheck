import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {
  }

  canActivate() {
    if(this.apiService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}