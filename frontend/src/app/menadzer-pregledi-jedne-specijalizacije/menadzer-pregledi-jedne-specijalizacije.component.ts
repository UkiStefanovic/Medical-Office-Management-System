import { Component, OnInit } from '@angular/core';
import Specijalizacija from '../models/specijalizacija';
import { SpecijalizacijaService } from '../services/specijalizacija.service';
import VrstaPregleda from '../models/vrstaPregleda';
import { Location } from '@angular/common';
import { VrstaPregledaService } from '../services/vrsta-pregleda.service';
import { Router } from '@angular/router';
import Pregled from '../models/pregled';
import { PregledService } from '../services/pregled.service';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-menadzer-pregledi-jedne-specijalizacije',
  templateUrl: './menadzer-pregledi-jedne-specijalizacije.component.html',
  styleUrls: ['./menadzer-pregledi-jedne-specijalizacije.component.css']
})
export class MenadzerPreglediJedneSpecijalizacijeComponent implements OnInit {

  constructor(
    private specijalizacijaService: SpecijalizacijaService,
    private _location: Location,
    private vrstaPregledaService: VrstaPregledaService,
    private router: Router,
    private pregledService: PregledService,
    private korisnikService: KorisnikService
  ) { }

  odabrana_specijalizacija: string;
  sveSpecijalizacije: Specijalizacija[] = [];
  vrstePregleda: VrstaPregleda[] = [];

  // za azuriranje vrstePregleda
  pregledKojiSeAzurira: VrstaPregleda;
  azuriraSe: boolean = false;

  trajanje_pregleda_azuriranje: number = null;
  cena_pregleda_azuriranje: string;
  error_message = "";

  // za dodavanje vrste pregleda
  naziv_unos: string;
  trajanje_unos: number = null;
  cena_unos: string;
  error_message_dodaj = "";

  ngOnInit(): void {
    this.vrstePregleda = [];
    this.specijalizacijaService.dohvatiSve().subscribe((vracene_specijalizacije: Specijalizacija[]) => {
      this.sveSpecijalizacije = vracene_specijalizacije;
    })
  }

  odabirSpecijalizacije() {
    this.vrstaPregledaService.dohvatiVrstePregleda(this.odabrana_specijalizacija).subscribe((vracene_vrste_pregleda: VrstaPregleda[]) => {
      if (vracene_vrste_pregleda) {
        this.vrstePregleda = vracene_vrste_pregleda;
      }
      else {
        this.vrstePregleda = [];
      }
    })
  }

  azuriranje(vrstaPregleda: VrstaPregleda) {
    this.pregledKojiSeAzurira = vrstaPregleda;
    this.trajanje_pregleda_azuriranje = vrstaPregleda.trajanje;
    this.cena_pregleda_azuriranje = vrstaPregleda.cena;
    this.azuriraSe = true;
  }

  azuriraj() {
    if (this.trajanje_pregleda_azuriranje == null) {
      this.trajanje_pregleda_azuriranje = 30;
    }
    if (this.trajanje_pregleda_azuriranje <= 0) {
      this.error_message = "Lose trajanje uneseno.";
      return;
    }
    var cena_regex = new RegExp(/\d*[\.\d*]/);
    if (!cena_regex.test(this.cena_pregleda_azuriranje)) {
      this.error_message = "Los unos cene";
      return;
    }
    // dobar je unos podataka
    this.error_message = "";

    // TODO potrebno je svakom zakazanom pregledu da se promene cena i trajanje
    // proverimo prvo da li su razliciti od prethodnih
    var promena_cene: boolean = false;
    if (this.cena_pregleda_azuriranje != this.pregledKojiSeAzurira.cena) {
      promena_cene = true;
    }

    // Potrebno je uraditi sledece:
    //1. promeniti u bazi za vrstu pregleda podatke
    //2. promeniti u bazi za sve zakazane preglede ove vrste 
    //3. poslati obavestenja pacijentima na ovim pregledima
    // sve ovo mozemo da radimo na backend-u

    this.vrstaPregledaService.azurirati(
      this.pregledKojiSeAzurira.naziv,
      this.odabrana_specijalizacija,
      this.trajanje_pregleda_azuriranje,
      this.cena_pregleda_azuriranje,
      promena_cene
    ).subscribe(
      (resp) => {

        // dohvatimo iz baze sve preglede koji su ove vrste
        this.pregledService.dohvatiPregledeVrste(this.pregledKojiSeAzurira).subscribe((pregledi:Pregled[])=>{
          // console.log(pregledi);
          // za svaki pregled vracen vrsimo korake 2 i 3
          for(var i =0;i<pregledi.length;i++){
            let pregled = pregledi[i];
            if(promena_cene){
              let tekst_obavestenja = "Promenjena je cena pregleda: "+pregled.naziv+" ("+pregled.specijalizacija+") \nkoji ste zakazali kod lekara "+ pregled.imeLekara+" "+pregled.prezimeLekara+" u terminu: "+new Date(pregled.vreme).toLocaleString()+"\nNova cena je: "+this.cena_pregleda_azuriranje;
              this.korisnikService.posaljiObavestenje(new Date(), pregled.pacijent, tekst_obavestenja).subscribe((resp)=>{})
            }
            this.pregledService.azurirajPregled(pregledi[i], this.trajanje_pregleda_azuriranje, this.cena_pregleda_azuriranje).subscribe((resp)=>{})
          }
          
        })

        this.azuriraSe = false;
        alert(resp['message']);
        location.reload();
      }
    )
  }

  odustaoAzuriranje() {
    this.azuriraSe = false;
  }

  obrisi(vrstaPregleda: VrstaPregleda) {
    this.vrstaPregledaService.obrisati(vrstaPregleda.naziv, this.odabrana_specijalizacija).subscribe((resp) => {
      alert(resp['message']);
      location.reload();
    })
  }

  dodaj() {
    if (this.naziv_unos == "") {
      this.error_message_dodaj = "Uneli ste loše naziv.";
      return;
    }
    if (this.trajanje_unos == null) {
      this.trajanje_unos = 30;
    }
    if (this.trajanje_unos < 0) {
      this.error_message_dodaj = "Uneli ste negativno trajanje";
      return;
    }
    var cena_regex = new RegExp(/\d*[.\d*]/);
    if (!cena_regex.test(this.cena_unos)) {
      this.error_message_dodaj = "Loš unos cene";
      return;
    }
    // dobro su uneti podaci
    // TODO proveriti da li postoji ovaj pregled u bazi podataka
    // ne mora da se dohvata iz baze, mislim da imam preglede vec dohvacene u komponenti
    this.error_message_dodaj = "";
    this.vrstaPregledaService.dodaj(this.naziv_unos, this.trajanje_unos, this.cena_unos, this.odabrana_specijalizacija).subscribe((resp) => {
      alert(resp['message']);
      location.reload();
    })
  }

  povratak() {
    this._location.back();
  }
  izloguj() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
