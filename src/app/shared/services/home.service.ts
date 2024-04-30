import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  readonly policyURL = 'https://localhost:7268/api/Policy';
  readonly userDetailURL = 'https://localhost:7268/api/Profile';

  userId: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = authService.getUserId();
  }

  getPoliciesByUser(): Observable<any> {
    return this.http.get(this.policyURL + "/" + this.userId);
  }

  getEmpDetails(): Observable<any> {
    return this.http.get(this.userDetailURL + "/" + this.userId);
  }
}