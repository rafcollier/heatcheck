import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

	@Output() sidenavClose = new EventEmitter();

  constructor( 
    public apiService: ApiService,
    private router: Router 
  ) { }

	ngOnInit() {
	}

	public onSidenavClose = () => {
		this.sidenavClose.emit();
	}

  onLogoutClick(){
    this.apiService.logout();
    this.router.navigate(['/login']);
    return false;
  }

}
