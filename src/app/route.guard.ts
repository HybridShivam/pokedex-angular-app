import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree, Router, ActivatedRoute
} from '@angular/router';
import {Observable} from 'rxjs';
import {SidebarService} from './sidebar/sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

  constructor(private sidebarService: SidebarService, private router: Router, private activatedRoute: ActivatedRoute) {
    // history.pushState(null, '/', window.location.href);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
    // if (screen.width <= 768 && (this.sidebarService.getSidebarState() === false)) {
    //   // console.log('Sidebar Close');
    //   history.pushState(null, null, window.location.href);
    //   // history.forward();
    //   // history.back();
    //   this.sidebarService.toggle();
    //   // this.router.navigate([this.activatedRoute]);
    //   return false;
    // } else {
    //   console.log('Normal Routing');
    //   return true;
    // }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
