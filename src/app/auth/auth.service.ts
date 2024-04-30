import { Injectable } from '@angular/core';
import { LoginForm } from '../types/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private http: HttpClient
  ) { }

  login(form: LoginForm) {
    this.http.post<any>('https://localhost:7268/api/Login', form)
      .subscribe(
        (response) => {
          // If login is successful, redirect to the home page

          console.log(response);

          localStorage.setItem('currentUser', JSON.stringify(response));
          this.isAuthenticated = true;

          this.router.navigate(['']);
        },
        (error) => {
          // Handle errors here
          console.error('Login failed:', error.error);

          alert(error.error);
        }
      );

  }

  getUserId() {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      // Parse the string back to an object
      let userData = JSON.parse(currentUser);

      // Access the user ID property from the userData object
      let userId = userData.eid;
      return userId;
    }
  }

  initAuthStateListener(): Promise<void> {
    return new Promise<void>((resolve) => {

      const currentUser = localStorage.getItem('currentUser') !== null;

      if (currentUser) {
        console.log('User is already signed in');
        this.isAuthenticated = true;
        resolve();
      }

    })
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
