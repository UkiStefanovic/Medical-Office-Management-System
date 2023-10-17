import { Component, OnInit } from '@angular/core';
import Pregled from '../models/pregled';
import { PregledService } from '../services/pregled.service';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { IzvestajService } from '../services/izvestaj.service';
import Izvestaj from '../models/izvestaj';
import { ObavestenjeService } from '../services/obavestenje.service';

@Component({
  selector: 'app-lekar-pregledi',
  templateUrl: './lekar-pregledi.component.html',
  styleUrls: ['./lekar-pregledi.component.css']
})
export class LekarPreglediComponent implements OnInit {

  constructor(
    private korisnikService: KorisnikService,
    private pregledService: PregledService,
    private izvestajService: IzvestajService
  ) { }

  ulogovani_lekar: Korisnik = null;
  pregledi: Pregled[] = [];
  prethodni_pregledi: Pregled[] = [];

  //otkazivanje
  razlog_otkazivanja: string = "";
  error_message = "";

  // karton pacijenta
  karton_bool = false;
  pacijent: Korisnik = null;
  izvestaji = [];

  // unos izvestaja
  unos_izvestaja = false;
  pregled_za_izvestaj: Pregled = null;
  razlog_dolaska: string = "";
  dijagnoza: string = "";
  preporucena_terapija: string = "";
  preporucen_datum_kontrole: Date = null;
  error_message_izvestaj: string = "";

  ngOnInit(): void {
    var lekar = localStorage.getItem('ulogovan_korisnik');
    this.pregledService.dohvatiPregledeLekara(lekar).subscribe((vraceni_pregledi: Pregled[]) => {
      this.pregledi = [];
      this.prethodni_pregledi = [];

      // IDEJA: idemo kroz niz vraceni_pregledi i za svaki pregled proveravamo da li je iz proslosti ili buducnosti

      // filtriranje buducih pregleda - ovo ce izbaciti i preglede koji su u toku
      let trenutno_vreme = new Date();
      for (var i = 0; i < vraceni_pregledi.length; i++) {
        var pregled = vraceni_pregledi[i];
        var vreme = new Date(pregled.vreme);
        if (vreme < trenutno_vreme) {
          this.prethodni_pregledi.push(pregled);
        }
        else {
          this.pregledi.push(pregled);
        }
      }

      // sortiranje pregleda od najskorijeg do najdavnijeg (rastuce)
      this.pregledi = this.pregledi.sort((a, b) => {
        var vreme1 = new Date(a.vreme);
        var vreme2 = new Date(b.vreme);
        if (vreme1 < vreme2) {
          return -1;
        }
        else if (vreme1 > vreme2) {
          return 1;
        }
        else return 0;
      })

      if (this.pregledi.length > 3) {
        this.pregledi = this.pregledi.slice(0, 3);
      }

      // sortiramo rastuce
      this.prethodni_pregledi = this.prethodni_pregledi.sort((a, b) => {
        var vreme1 = new Date(a.vreme);
        var vreme2 = new Date(b.vreme);
        if (vreme1 < vreme2) {
          return -1;
        }
        else if (vreme1 > vreme2) {
          return 1;
        }
        else return 0;
      })
    })
  }

  otkazati(pregled: Pregled) {
    if (this.razlog_otkazivanja == "") {
      this.error_message = "Morate da date obrazloženje za otkazivanje.";
      return;
    }
    this.error_message = "";
    this.korisnikService.otkazatiPregled(
      pregled.pacijent, pregled.imeLekara, pregled.prezimeLekara, pregled, this.razlog_otkazivanja
    ).subscribe((resp) => {
      this.pregledService.otkazatiPregled(pregled.pacijent, pregled.lekar, pregled.vreme, pregled.naziv, pregled.ogranak).subscribe((resp) => {
        alert(resp['message']);
        location.reload();
      })
    })
  }

  karton(pacijent_kor_ime: string) {
    this.korisnikService.dohvatiKorisnika(pacijent_kor_ime).subscribe((vraceni_korisnik: Korisnik) => {
      this.pacijent = vraceni_korisnik;
      this.karton_bool = true;

      this.izvestajService.dohvatiIzvestajePacijenta(pacijent_kor_ime).subscribe((vraceni_izvestaji: Izvestaj[]) => {
        this.izvestaji = vraceni_izvestaji;
      })
    })
  }

  izvestaj(pregled: Pregled) {
    this.unos_izvestaja = true;
    this.pregled_za_izvestaj = pregled;

  }

  zatvoritiKarton() {
    this.karton_bool = false;
    this.pacijent = null;
    this.izvestaji = [];
  }

  unetiIzvestaj() {
    // provera validnosti podataka
    if (this.razlog_dolaska == "") {
      this.error_message_izvestaj = "Niste uneli razlog dolaska.";
      return;
    }
    if (this.dijagnoza == "") {
      this.error_message_izvestaj = "Niste uneli dijagnozu.";
      return;
    }
    if (this.preporucena_terapija == "") {
      this.error_message_izvestaj = "Niste uneli preporučenu terapiju.";
      return;
    }
    let datum_preporucene_kontrole = new Date(this.preporucen_datum_kontrole);
    let trenutno_vreme = new Date();
    if (datum_preporucene_kontrole < trenutno_vreme) {
      this.error_message_izvestaj = "Uneli ste datum u prošlosti.";
      return;
    }
    if (datum_preporucene_kontrole == null) {
      this.error_message_izvestaj = "Niste uneli datum kontrole.";
    }
    this.error_message_izvestaj = "";

    this.izvestajService.dodajIzvestaj(
      this.pregled_za_izvestaj,
      this.razlog_dolaska,
      this.dijagnoza,
      this.preporucena_terapija,
      datum_preporucene_kontrole
    ).subscribe((resp) => {
      alert(resp['message']);
      // brisanje iz baze ovaj pregled
      this.pregledService.otkazatiPregled(
        this.pregled_za_izvestaj.pacijent,
        this.pregled_za_izvestaj.lekar,
        this.pregled_za_izvestaj.vreme,
        this.pregled_za_izvestaj.naziv,
        this.pregled_za_izvestaj.ogranak
      ).subscribe((resp) => {
        location.reload();
      })
    })
  }

  odustani() {
    this.unos_izvestaja = false;
  }

}
