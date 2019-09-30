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

  onGetGames(){
    this.apiService.getGames().subscribe(data => {
      console.log(data);
    });
  }

  clearFields() {
    this.password = "";
    this.email = "";
    this.validateMessage = "";
    this.errorMessage = "";
  }

}
