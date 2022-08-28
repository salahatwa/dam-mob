import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { take } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService, private router: Router
  ) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> {
  //   return this.userService.isAuthenticated.pipe(take(1));
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var isAuthenticated = false;

    console.log(isAuthenticated);
    // Check if the user is authenticated
    this.userService.isAuthenticated.pipe(take(1)).subscribe(function (data) {
      isAuthenticated = data;
    });
    // console.log("----------------------");
    console.log(isAuthenticated);

    // If the user is not authenticated, redirect to Login page
    if (!isAuthenticated) {
      this.router.navigateByUrl('/login');
    }

    return this.userService.isAuthenticated.pipe(take(1));
  }

}
