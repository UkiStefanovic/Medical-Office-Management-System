import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NeregistrovanGuardService implements CanActivate{

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var tip_korisnika = localStorage.getItem('tip_korisnika');
    if(tip_korisnika=='' || tip_korisnika==null || tip_korisnika==undefined){
      return true;
    }
    else{
      this.router.navigate([tip_korisnika]);
      return false;
    }
  }
}
