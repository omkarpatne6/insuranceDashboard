import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginForm } from '../../types/auth';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: LoginForm = {
    email: "",
    password: ""
  }

  constructor (private authService: AuthService) {}

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  submit() {
    this.authService.login(this.form)
  }

  // isLoading (): any {
  //   // return this.authService.isLoading
  // }

}
