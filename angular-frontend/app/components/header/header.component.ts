import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	@Output() public sidenavToggle = new EventEmitter();

  constructor( 
    public apiService: ApiService,
    private router: Router 
  ) { }

	ngOnInit() {
	}

	public onToggleSidenav = () => {
		this.sidenavToggle.emit();
	}

  onLogoutClick(){
    this.apiService.logout();
    this.router.navigate(['/login']);
    return false;
  }

}
