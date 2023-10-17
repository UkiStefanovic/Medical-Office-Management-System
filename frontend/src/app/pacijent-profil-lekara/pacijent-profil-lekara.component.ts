import { Component, OnInit } from '@angular/core';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import VrstaPregleda from '../models/vrstaPregleda';
import { VrstaPregledaService } from '../services/vrsta-pregleda.service';
import { Time } from '@angular/common';
import { PregledService } from '../services/pregled.service';
import { Router } from '@angular/router';
import Pregled from '../models/pregled';
import { ObavestenjeService } from '../services/obavestenje.service';

@Component({
  selector: 'app-pacijent-profil-lekara',
  templateUrl: './pacijent-profil-lekara.component.html',
  styleUrls: ['./pacijent-profil-lekara.component.css']
})
export class PacijentProfilLekaraComponent implements OnInit {

  constructor(
    private korisnikService: KorisnikService,
    private vrstePregledaService: VrstaPregledaService,
    private pregledService: PregledService,
    private router: Router
    //private obavestenjeService: ObavestenjeService
  ) { }

  ulogovani_pacijent: Korisnik = null;
  izabrani_lekar: Korisnik = null;
  vrste_pregleda: VrstaPregleda[] = [];


  zakazivanje: boolean = false;
  pregled_zakazivanje: VrstaPregleda;
  datum_zakazivanje: Date;
  vreme_zakazivanje: Time;
  error_message = "";


  ngOnInit(): void {
    var korisnicko_ime = localStorage.getItem('izabrani_lekar');
    this.korisnikService.dohvatiKorisnika(korisnicko_ime).subscribe((vraceni_korisnik: Korisnik) => {
      this.izabrani_lekar = vraceni_korisnik;
      this.vrstePregledaService.dohvatiVrstePregleda(this.izabrani_lekar.specijalizacija).subscribe((vracene_vrste_pregleda: VrstaPregleda[]) => {
        // treba da filtriramo vracene vrste pregleda
        // u lekaru cuvamo stringove za vrste pregleda
        // dovoljno je da u listi vrste_pregleda zadrzimo one vrste pregleda koje se nalaze u lekaru
        var lekarovi_pregledi = this.izabrani_lekar.vrste_pregleda; //lista
        vracene_vrste_pregleda = vracene_vrste_pregleda.filter((pregled) => {
          return lekarovi_pregledi.includes(pregled.naziv);
        })
        this.vrste_pregleda = vracene_vrste_pregleda;


        var korisnicko_ime = localStorage.getItem('ulogovan_korisnik');
        this.korisnikService.dohvatiKorisnika(korisnicko_ime).subscribe((vraceni_korisnik: Korisnik) => {
          this.ulogovani_pacijent = vraceni_korisnik;
        })

      })
    })
  }

  profilna() {
    if (!this.izabrani_lekar) {
      var korisnicko_ime = localStorage.getItem('izabrani_lekar');
      this.korisnikService.dohvatiKorisnika(korisnicko_ime).subscribe((vraceni_korisnik: Korisnik) => {
        return vraceni_korisnik.profilna;
      })
    }
    return this.izabrani_lekar.profilna;
  }

  zakaziPregled(pregled: VrstaPregleda) {
    this.pregled_zakazivanje = pregled;
    this.zakazivanje = true;
  }
  odustaoZakazivanje() {
    this.zakazivanje = false;
  }

  zakazati() {
    let vreme = new Date(this.datum_zakazivanje + 'T' + this.vreme_zakazivanje + ':00');
    let trenutno_vreme = new Date();
    if (vreme < trenutno_vreme) {
      // uneto vreme je u proslosti
      this.error_message = "Uneli ste vreme u prošlosti. Probajte ponovo.";
      return;
    }
    this.error_message = "";

    this.pregledService.dohvatiPregledeLekara(this.izabrani_lekar.korisnicko_ime).subscribe((vraceni_pregledi_lekara: Pregled[]) => {
      // za svaki pregled u buducnosti, proveravamo da li je vreme (gornja promenljiva) unutar opsega
      // pregled.vreme i pregled.vreme + trajanje
      var odgovarajuc_termin = true;

      for (var i = 0; i < vraceni_pregledi_lekara.length; i++) {
        let pregled = vraceni_pregledi_lekara[i];
        let start = new Date(pregled.vreme);
        var end = new Date(pregled.vreme);
        end.setMinutes(end.getMinutes() + pregled.trajanje);
        if (start < trenutno_vreme && end < trenutno_vreme) {
          // ovaj pregled se zavrsio
          continue;
        }
        else if (start < trenutno_vreme && end > trenutno_vreme) {
          // ovaj pregled je u toku
          // proveravamo da li je vreme posle kraja ovog pregleda
          if (vreme < end) {
            // zakazano vreme se preklapa
            odgovarajuc_termin = false;
            break;
          }
        }
        else {
          // ovaj pregled nije poceo
          // mozemo zakazati pregled ili pre ovog ili posle ovog
          var kraj = new Date(vreme);
          kraj.setMinutes(kraj.getMinutes() + this.pregled_zakazivanje.trajanje);
          if (kraj < start) {
            // pregled koji zelimo da zakazemo se zavrsava pre ovog,
            // sve je okej
          }
          else if (vreme > end) {
            // pregled koji zelimo da zakazemo pocinje nakon ovog,
            // sve je okej
          }
          else {
            // zakazano vreme se preklapa
            odgovarajuc_termin = false;
            break;
          }
        }
      }

      if (!odgovarajuc_termin) {
        this.error_message = "Lekar je zauzet u tom terminu. Probajte ponovo.";
        return;
      }


      var vreme_obavestenje = new Date(vreme);
      vreme_obavestenje.setHours(vreme_obavestenje.getHours() - 24);
      let tekst = "Imate zakazan pregled za 24h.\nVrsta pregleda: " + this.pregled_zakazivanje.naziv +
        "\nKod lekara: " + this.izabrani_lekar.ime + " " + this.izabrani_lekar.prezime + ".";
      this.korisnikService.zakazatiPregled(vreme_obavestenje, this.ulogovani_pacijent.korisnicko_ime, tekst).subscribe((resp) => {

        // Mozemo da zakazemo 
        this.pregledService.zakazati(
          this.ulogovani_pacijent.korisnicko_ime,
          this.ulogovani_pacijent.ime,
          this.ulogovani_pacijent.prezime,
          this.izabrani_lekar.korisnicko_ime,
          this.izabrani_lekar.ime,
          this.izabrani_lekar.prezime,
          vreme,
          this.pregled_zakazivanje.naziv,
          this.pregled_zakazivanje.specijalizacija,
          this.pregled_zakazivanje.trajanje,
          this.pregled_zakazivanje.cena,
          this.izabrani_lekar.ogranak
        ).subscribe((resp) => {
          alert(resp['message']);
          this.pregled_zakazivanje = null;
          this.datum_zakazivanje = null;
          this.vreme_zakazivanje = null;
          this.zakazivanje = false;
          this.error_message = "";

        })
      })

    })

  }

  povratak() {
    localStorage.removeItem('izabrani_lekar');
    this.router.navigate(['pacijent/lekari'])
  }

}
