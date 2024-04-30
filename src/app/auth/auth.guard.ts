import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.authService.initAuthStateListener();

    if (this.authService.isAuthenticated) {
      console.log(route.url[0].path)

      // if (route.url[0].path === "seller" && this.authService.getEmail() !== "seller@seller.com") {
      //   alert("Your are not authorized to access this page");
      //   this.router.navigate(['/']);
      //   return false;
      // }

      if (route.url[0].path === "login") {
        return false;
      }
      return true;
    }
    // Redirect to login page
    this.router.navigate(['/login']);
    return false;

  }

}