import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	@Output() public sidenavToggle = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	public onToggleSidenav = () => {
		this.sidenavToggle.emit();
	}

}
