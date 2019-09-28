import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  firstname: String;
  lastname: String;
  username: String;
  password: String;
  phonenumber: String;
  email: String;
  errorMessage: String = "";
  validateMessage: String = "";

  constructor(
    private apiService: ApiService,
    private validateService: ValidateService, 
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){

    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      password: this.password,
      phonenumber: this.phonenumber,
      email: this.email

    }

    let validate = this.validateService.validateRegister(user);

    if(!validate.valid) {
      this.errorMessage = validate.message;
      setTimeout(() => {
        this.errorMessage = "";
        return false;
      }, 3000);
    }
    else {
      this.apiService.registerUser(user).subscribe(data => {
        if(data.success) {
          this.validateMessage = data.msg;
          setTimeout(() => {
            this.clearFields();
            this.router.navigate(['/login']); 
          }, 3000);
        }
        else {
          this.errorMessage = data.msg;
          setTimeout(() => {
            this.errorMessage = "";
            this.router.navigate(['/register']); 
          }, 3000);
        }
      });
    }
  }

  clearFields() {
    this.firstname = "";
    this.lastname = "";
    this.username = "";
    this.password = "";
    this.phonenumber = "";
    this.email = "";
    this.validateMessage = "";
    this.errorMessage = "";
  }

}