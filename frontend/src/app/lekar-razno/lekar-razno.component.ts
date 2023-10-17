import { Component, OnInit } from '@angular/core';
import { ZahtevNovaVrstaPregledaService } from '../services/zahtev-nova-vrsta-pregleda.service';
import { KorisnikService } from '../services/korisnik.service';
import Korisnik from '../models/korisnik';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lekar-razno',
  templateUrl: './lekar-razno.component.html',
  styleUrls: ['./lekar-razno.component.css']
})
export class LekarRaznoComponent implements OnInit {

  constructor(
    private zahtevNovaVrstaPregledaService: ZahtevNovaVrstaPregledaService,
    private korisnikService: KorisnikService,
    private _location: Location,
    private router: Router
  ) { }

  naziv: string;
  trajanje: number;
  cena: string;

  error_message: string = "";

  ngOnInit(): void {
  }

  posaljiZahtev() {
    if (this.naziv == "" || this.naziv == null) {
      this.error_message = "Uneli ste loše naziv.";
      return;
    }
    if (this.trajanje < 0 || this.trajanje == null) {
      this.error_message = "Uneli ste loše trajanje";
      return;
    }
    var cena_regex = new RegExp(/\d+(\.\d+)?/);
    if (!cena_regex.test(this.cena)) {
      this.error_message = "Loš unos cene";
      return;
    }
    // dobro su uneti podaci
    this.error_message="";

    // treba dohvatiti specijalizaciju i ime i prezime lekara
    var korisnicko_ime = localStorage.getItem('ulogovan_korisnik');
    this.korisnikService.dohvatiKorisnika(korisnicko_ime).subscribe((vraceni_korisnik: Korisnik) => {
      if (vraceni_korisnik) {
        let specijalizacija = vraceni_korisnik.specijalizacija;
        let ime = vraceni_korisnik.ime;
        let prezime = vraceni_korisnik.prezime;
        this.zahtevNovaVrstaPregledaService.dodaj(this.naziv, this.trajanje, this.cena, specijalizacija, ime, prezime).subscribe((resp) => {
          alert(resp['message']);
          location.reload();
        })
      }
    })
  }

  povratak() {
    this.router.navigate(['lekar']);
  }
  izloguj() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
