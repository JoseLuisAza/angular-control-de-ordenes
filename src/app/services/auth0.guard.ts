// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { AuthService } from '@auth0/auth0-angular';

// @Injectable({
//   providedIn: 'root'
// })
// export class Auth0Guard implements CanActivate {
//   constructor(private auth: AuthService) {}
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
//     return this.auth.isAuthenticated$.pipe(
//       tap(loggedIn => {
//         if (!loggedIn) {
//           this.auth.login(state.url);
//         }
//       })
//     );
//   }
  
// }
