import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor (private authService : AuthService) {}

  isAuthenticated(): boolean {
    const isAuth = this.authService.isAuthenticated;

    return isAuth;
  }


  logout () {
    this.authService.logout();
  }
}
