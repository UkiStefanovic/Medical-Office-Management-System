import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Korisnik from '../models/korisnik';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-login-menadzer',
  templateUrl: './login-menadzer.component.html',
  styleUrls: ['./login-menadzer.component.css']
})
export class LoginMenadzerComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private korisnikService: KorisnikService) { }

  korisnicko_ime: string;
  lozinka: string;
  error_message: string = "";

  ngOnInit(): void {
  }

  loginMenadzer() {
    if (this.korisnicko_ime == "" || this.lozinka == "") {
      this.error_message = "Niste uneli sve podatke!";
      return;
    }
    this.error_message = "";

    this.korisnikService.loginMenadzer(this.korisnicko_ime,this.lozinka).subscribe((vracen_korisnik: Korisnik) => {
      if (vracen_korisnik) {
        localStorage.setItem('tip_korisnika', 'menadzer');
        localStorage.setItem('ulogovan_korisnik', vracen_korisnik.korisnicko_ime);
        this.router.navigate([vracen_korisnik.tip]);
      }
      else {
        this.error_message = "Uneli ste pogresno korisničko ime ili lozinku. Pokušajte ponovo";
        return;
      }
    })
  }
}


