import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import Korisnik from '../models/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private korisnikService:KorisnikService, private router: Router) { }

  korisnicko_ime:string;
  lozinka:string;
  error_message:string="";

  ngOnInit(): void {
  }

  login(){
    if (this.korisnicko_ime == "" || this.lozinka == "") {
      this.error_message = "Niste uneli sve podatke!";
      return;
    }
    this.error_message = "";

    this.korisnikService.login(this.korisnicko_ime,this.lozinka).subscribe((vracen_korisnik: Korisnik) => {
      if (vracen_korisnik) {
        localStorage.setItem('ulogovan_korisnik', vracen_korisnik.korisnicko_ime);
        localStorage.setItem('tip_korisnika', vracen_korisnik.tip);
        this.router.navigate([vracen_korisnik.tip]);
      }
      else {
        this.error_message = "Uneli ste pogresno korisničko ime ili lozinku. Pokušajte ponovo";
        return;
      }
    })
  }

  povratak() {
    this.router.navigate(['']);
  }

  goTo(){
    this.router.navigate(['loginMenadzer']);
  }

}
