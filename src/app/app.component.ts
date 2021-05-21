import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  userForm: FormGroup;
  user = {prefix: "", postfix: "", firstName: "", gender: "", middleName: "", lastName: "", date: null, ssn: "", phone: "", altPhone: "", email: ""};

  constructor(private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      prefix: new FormControl(this.user.prefix),
      postfix: new FormControl(this.user.postfix),
      firstName: new FormControl(this.user.firstName, [
        Validators.required
      ]),
      middleName: new FormControl(this.user.middleName),
      lastName: new FormControl(this.user.lastName, [
        Validators.required
      ]),
      gender: new FormControl(this.user.gender, [
        Validators.required
      ]),
      date: new FormControl(this.user.date, [
        this.checkDateAndSSN()
      ]),
      phone: new FormControl(this.user.phone),
      altPhone: new FormControl(this.user.altPhone),
      email: new FormControl(this.user.email),
      ssn: new FormControl(this.user.ssn, [
        this.checkDateAndSSN()
      ]),
    });
  }

   checkDateAndSSN(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(!this.userForm) return {validValue: true};
      const validate = this.getFieldValue("ssn").length == 0 && this.getFieldValue("date") == null;
      return validate ? {validValue: true} : null;
    };
  }

  isFieldInvalid(field: string) {
    return !this.userForm.get(field).valid;
  }
  
  getFieldValue(field: string){
    return this.userForm.get(field).value;
  }

  submitForm(){
    console.log(this.userForm.getRawValue());
  }

}
