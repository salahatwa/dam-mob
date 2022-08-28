import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { JwtService } from './jwt.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { User } from '../../../core/models/user.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/auth/me')
        .subscribe(
          data => this.setAuth(data),
          err => {
            this.logout();
          }
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.logout();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.accessToken);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);

  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/signin' : '/signup';

    return this.apiService.post('/auth' + route, credentials)
      .pipe(map(
        data => {
          this.setAuth(data);
          return data;
        }
      ));
  }

  getUserDtls(): Observable<User> {
    return this.apiService.get('/auth/me')
      .pipe(map(
        data => {
          // this.setAuth(data);
          return data;
        }
      ));
  }


  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
      .put('/users/update', user)
      .pipe(map(data => {
        // Update the currentUser observable
        this.purgeAuth();
        this.setAuth(data);
        return data;
      }));
  }

  

  updateLogo(uploadImageData): Observable<User> {
    return this.apiService.uploadFile('/users/logo/update', uploadImageData).pipe(map(data => {
      // Update the currentUser observable
      // this.purgeAuth();
      console.log(data);
      // this.setAuth(data.body);
      return data;
    }));
  }

  logout() {
    this.purgeAuth();
    this.router.navigate(['/login']);
  }

}
