import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http: HttpClient) { }
  readonly baseUrl = 'http://localhost:62999/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(5)]],
      ConfirmPassword: ['', Validators.required],
    }, {
      validators: this.comparePasswords
    }),
  });

  comparePasswords(fg: FormGroup) {
    let confirmPasswordCtrl = fg.get('ConfirmPassword');

    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if (fg.get('Password').value != confirmPasswordCtrl.value)
        confirmPasswordCtrl.setErrors({passwordMismatch: true});
      else
        confirmPasswordCtrl.setErrors(null);
    }
  }

  register() {
    const user = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password,
    };

    return this.http.post(`${this.baseUrl}/ApplicationUser/Register`, user);
  }

  login(formData) {
    return this.http.post(`${this.baseUrl}/ApplicationUser/Login`, formData);
  }

  getUserProfile() {
    return this.http.get(`${this.baseUrl}/UserProfile`);
  }
}
