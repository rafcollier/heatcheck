import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){

    let passwordRegex = /(?=.*[A-Z]+.*)(?=.*[a-z]+.*)(?=.*\d+.*)(?=.*[!@#$%^&*()]+.*).{8,}/; 
    let passwordTest = passwordRegex.test(user.password);
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailTest = emailRegex.test(user.email);
    let phonenumberRegex = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/;
    let phonenumberTest = phonenumberRegex.test(user.phonenumber);

    if(user.firstname == ("" || undefined || null) || (user.firstname.length == 0)) {
      let response = {
        valid: false,
        message: "Please enter a first name."
      }
      return response;
    }  
    else if(user.lastname == ("" || undefined || null) || (user.lastname.length == 0)) {
      let response = {
        valid: false,
        message: "Please enter a last name."
      }
      return response;
    }  
    else if(user.username == ("" || undefined || null) || (user.username.length == 0)) {
      let response = {
        valid: false,
        message: "Please enter a username."
      }
      return response;
    }  
    else if(!emailTest) {
      let response = {
        valid: false,
        message: "Invalid email address."
      }
      return response;
    } 
    else if(!passwordTest) {
      let response = {
        valid: false,
        message: "Invalid password."
      }
      return response;
    }
    else if(!phonenumberTest) {
      let response = {
        valid: false,
        message: "Invalid phone number."
      }
      return response;
    } 
    else {
      let response = {
        valid: true,
        message: "Validation Passed."
    }
    return response;
    }

  }

  validateLogin(user) {

    if(user.email == ("" || undefined || null) || (user.email.length == 0)) {
      let response = {
        valid: false,
        message: "Please fill both fields."
      }
      return response;
    }  
    else if(user.password == ("" || undefined || null) || (user.password.length == 0)) {
      let response = {
        valid: false,
        message: "Please fill both fields."
      }
      return response;
    }  
    else {
      let response = {
      valid: true,
      message: "Validation Passed."
    }
    return response;
    }

  }

  validateDate(date) {

    if(date == ("" || undefined || null) || (date.length == 0)) {
      let response = {
        valid: false,
        message: "Invalid Date."
      }
      return response;
    }  
    else {
      let response = {
      valid: true,
      message: "Validation Passed."
    }
    return response;
    }

  }

}


