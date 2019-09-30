import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;
  errorMessage: String = "";
  validateMessage: String = "";

  constructor(
    private apiService: ApiService,
    private validateService: ValidateService, 
    private router: Router
    ) { }

  ngOnInit() {
  }

  onLoginSubmit(){

    //Validate the input to ensure both fields have data.
    //Check the user database to find the email address of the user and display message if not found.
    //If user is found, authenicate the password and direct to home page.

    const user = {
      email: this.email,
      password: this.password
    }

    let validate = this.validateService.validateLogin(user);

    if(!validate.valid) {
      this.errorMessage = validate.message;
      setTimeout(() => {
        this.errorMessage = "";
        return false;
      }, 3000);
    }
    else {
      this.apiService.authenticateUser(user).subscribe(data => {
        if(data.success) {
          this.apiService.storeUserData(data.token, data.user);
          this.validateMessage = data.msg;
          setTimeout(() => {
            this.clearFields();
            this.router.navigate(['/home']); 
          }, 3000);
        }
        else {
          this.errorMessage = data.msg;
          setTimeout(() => {
            this.errorMessage = "";
            this.router.navigate(['/login']); 
          }, 3000);
        }
      });
    }
  }

  clearFields() {
    this.password = "";
    this.email = "";
    this.validateMessage = "";
    this.errorMessage = "";
  }

}
