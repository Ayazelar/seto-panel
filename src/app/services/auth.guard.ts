import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from "@angular/router";
import * as identity from '@spica-devkit/identity'
import { environment } from "src/environments/environment";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | Promise<boolean> {
		//identity paketinde check jwt
		let token = localStorage.getItem('identity');
		identity.initialize({
			identity: token,
			publicUrl: environment.url
		})
		let isAuthenticated = identity.verifyToken(token).then(() => {
			return true
		}).catch(() => {
			this.router.navigate(['/login']);
			return false
		})
		return isAuthenticated
	}
}
