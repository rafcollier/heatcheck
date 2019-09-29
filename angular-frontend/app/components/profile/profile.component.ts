import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  firstname: String;
  lastname: String;
  username: String;
  phonenumber: String;
  email: String;
  userID: String;
  errorMessage: String = "";
  validateMessage: String = "";

  constructor(
    private apiService: ApiService,
    private validateService: ValidateService, 
    private router: Router
    ) { }

  ngOnInit() {

    let user = JSON.parse(this.apiService.loadUser());
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.username = user.username;
    this.email = user.email;
    this.phonenumber = user.phonenumber;
    this.userID = user.id;
  }

  onDeleteUser() {
    if(confirm("Are you sure you want to delete your profile?")) {
      this.apiService.deleteUser(this.userID).subscribe(doc => {
        this.apiService.logout();
        this.router.navigate(['/front']);
      },
      err => {
        console.log(err);
        return false;
      });
    }
  }

}
