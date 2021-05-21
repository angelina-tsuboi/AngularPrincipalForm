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

  constructor(private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      prefix: new FormControl(""),
      postfix: new FormControl(""),
      firstName: new FormControl("", [
        Validators.required
      ]),
      middleName: new FormControl(""),
      lastName: new FormControl("", [
        Validators.required
      ]),
      gender: new FormControl("", [
        Validators.required
      ]),
      date: new FormControl(null, [
        this.checkDateAndSSN()
      ]),
      phone: new FormControl(""),
      altPhone: new FormControl(""),
      email: new FormControl(""),
      ssn: new FormControl("", [
        this.checkDateAndSSN()
      ]),
    });
  }

   checkDateAndSSN(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(!this.userForm) return {invalidValue: true};
      const validate = this.getFieldValue("ssn").length == 0 && this.getFieldValue("date") == null;
      return validate ? {invalidValue: true} : null;
    };
  }

  isFieldInvalid(field: string) {
    return !this.userForm.get(field).valid;
  }
  
  getFieldValue(field: string){
    return this.userForm.get(field).value;
  }

  validateForm(){
    return !this.isFieldInvalid("gender") && !this.isFieldInvalid("firstName") && !this.isFieldInvalid("lastName") && (!this.isFieldInvalid("date") || !this.isFieldInvalid("ssn"));
  }

  submitForm(){
    console.log(this.userForm.getRawValue());
  }

}
