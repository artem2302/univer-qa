import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class PublicGuard implements CanActivate {
    isLoggedIn: boolean = false;

    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return true;
        this.isLoggedIn = !!localStorage.getItem('token');
        if (this.isLoggedIn) {
            this.router.navigate(['']);
            return false;
        } else {
            return true;
        }
    }

}