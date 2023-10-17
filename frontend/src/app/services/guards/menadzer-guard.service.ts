import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenadzerGuardService implements CanActivate{

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var tip_korisnika = localStorage.getItem('tip_korisnika');
    if(tip_korisnika=='menadzer'){
      return true;
    }
    else{
      if(tip_korisnika==null || tip_korisnika == undefined){
        tip_korisnika='';
      }
      this.router.navigate([tip_korisnika]);
      return false;
    }
  }
}
