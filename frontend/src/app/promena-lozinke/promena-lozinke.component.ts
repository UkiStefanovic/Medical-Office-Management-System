import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(
    private _location: Location,
    private korisnikService: KorisnikService,
    private router: Router) { }

  error_message: string = "";
  prethodna_lozinka: string;
  nova_lozinka: string;
  nova_lozinka_ponovo: string;
  ulogovani_korisnik: Korisnik;

  ngOnInit(): void {
    let korisnicko_ime = localStorage.getItem('ulogovan_korisnik');
    this.korisnikService.dohvatiKorisnika(korisnicko_ime).subscribe((vracen_korisnik: Korisnik) => {
      this.ulogovani_korisnik = vracen_korisnik;
    });
  }

  promenaLozinke() {
    var lozinka_regex = new RegExp(/(?=.*[!?@#$%^&*()\[\]:;.,<>/\\])(?=.*\d)(?=.*[A-Z])^[a-zA-Z].{7,13}/);

    // provera da li je uneta dobra prethodna lozinka
    if (this.prethodna_lozinka != this.ulogovani_korisnik.lozinka) {
      this.error_message = "Uneli ste pogrešnu prethodnu lozinku.";
      return;
    }
    // provera da li je novouneta lozinka u dobrom formatu
    if (!lozinka_regex.test(this.nova_lozinka)) {
      this.error_message = "Novouneta lozinka nije u dobrom formatu.";
      return;
    }
    // lozinka je u gorenapisanom formatu
    // ostaje da proverimo da li su svi susedi razliciti
    let razliciti_susedi = true;
    for (var i = 0; i < this.nova_lozinka.length - 1; i++) {
      if (this.nova_lozinka[i] == this.nova_lozinka[i + 1]) {
        razliciti_susedi = false;
        break;
      }
    }
    if (!razliciti_susedi) {
      this.error_message = "Novouneta lozinka nije u dobrom formatu.";
      return;
    }
    // provera da li su obe lozinke iste
    if (this.nova_lozinka != this.nova_lozinka_ponovo) {
      this.error_message = "Nije ista ponovljena lozinka.";
      return;
    }
    this.error_message = "";

    this.korisnikService.promeniLozinku(this.ulogovani_korisnik.korisnicko_ime, this.nova_lozinka).subscribe((resp) => {
      alert(resp['message']);
      // izlogujemo korisnika i vracamo ga na pocetni ekran
      localStorage.clear();
      this.router.navigate(['']);
    })
  }

  povratak() {
    var tip_korisnika = localStorage.getItem('tip_korisnika');
    this.router.navigate([tip_korisnika]);
  }
  izloguj() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
