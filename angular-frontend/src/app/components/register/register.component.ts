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
    //console.log(user);

    let validate = this.validateService.validateRegister(user);
    //console.log(validate);
    //console.log(validate.valid);
    //console.log(validate.message);
    //console.log(typeof validate);

    if(!validate.valid) {
      //this.validateMessage = validate.message;
      this.errorMessage = validate.message;
      setTimeout(() => {
        this.errorMessage = "";
        return false;
      }, 3000);
    }
    else {
      this.validateMessage = validate.message;
      setTimeout(() => {
        this.clearFields();
      }, 3000);
    }


  }

/*

    if(!this.validateService.validateRegister(user).valid) {
      this.validateMessage = this.validateService.validate;
      setTimeout(() => {
        this.validateMessage = "";
        return false;
      }, 2000);
    }
    else {
      this.apiService.registerUser(user).subscribe(data => {
        if(data.success){
          setTimeout(() => {
            this.clearFields();
            this.router.navigate(['/register']); 
          }, 1000);
        } 
        else {
          this.errorMessage = data.msg;
          setTimeout(() => {
            this.clearFields();
            this.router.navigate(['/register']); 
          }, 2000);
       }
      },
      err => {
      console.log(err);
      return false;
      });
    }


	}

  */

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