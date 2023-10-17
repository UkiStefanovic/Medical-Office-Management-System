import { Component, OnInit } from '@angular/core';
import Specijalizacija from '../models/specijalizacija';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { SpecijalizacijaService } from '../services/specijalizacija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacijent-lekari',
  templateUrl: './pacijent-lekari.component.html',
  styleUrls: ['./pacijent-lekari.component.css']
})
export class PacijentLekariComponent implements OnInit {

  constructor(
    private korisnikService: KorisnikService,
    private specijalizacijaService: SpecijalizacijaService,
    private router:Router
  ) { }

  sveSpecijalizacije: Specijalizacija[];
  lekari: Korisnik[];

  // polja za pretragu lekara
  ime_pretraga: string;
  prezime_pretraga: string;
  specijalizacija_pretraga: string;
  ogranak_pretraga: string;


  ngOnInit(): void {
    this.korisnikService.dohvatiSveLekare().subscribe((vraceni_lekari: Korisnik[]) => {
      this.lekari = vraceni_lekari;
    })
    this.specijalizacijaService.dohvatiSve().subscribe((vraceno: Specijalizacija[]) => {
      this.sveSpecijalizacije = vraceno;
    })
  }

  pretraga() {
    let ime_dobijeno = this.ime_pretraga;
    if (ime_dobijeno == undefined) {
      ime_dobijeno = "";
    }
    let prezime_dobijeno = this.prezime_pretraga;
    if (prezime_dobijeno == undefined) {
      prezime_dobijeno = "";
    }
    let specijalizacija_dobijeno = this.specijalizacija_pretraga;
    if (specijalizacija_dobijeno == undefined) {
      specijalizacija_dobijeno = "";
    }
    let ogranak_dobijeno = this.ogranak_pretraga;
    if (ogranak_dobijeno == undefined) {
      ogranak_dobijeno = "";
    }

    this.korisnikService.dohvatiSveLekare().subscribe((vraceni_lekari: Korisnik[]) => {
      this.lekari = vraceni_lekari;
      this.lekari = this.lekari.filter((lekar) => {
        return lekar.ime.includes(ime_dobijeno) &&
          lekar.prezime.includes(prezime_dobijeno) &&
          lekar.specijalizacija.includes(specijalizacija_dobijeno) &&
          lekar.ogranak.includes(ogranak_dobijeno);
      })
    })
  }

  sortIme() {
    this.lekari = this.lekari.sort((lekar1,lekar2)=>{
      if(lekar1.ime>lekar2.ime){
        return 1;
      }
      else if(lekar1.ime<lekar2.ime){
        return -1;
      }
      else return 0;
    })
  }

  sortPrezime() {
    this.lekari = this.lekari.sort((lekar1,lekar2)=>{
      if(lekar1.prezime>lekar2.prezime){
        return 1;
      }
      else if(lekar1.prezime<lekar2.prezime){
        return -1;
      }
      else return 0;
    })
  }

  sortSpecijalizacija() {
    this.lekari = this.lekari.sort((lekar1,lekar2)=>{
      if(lekar1.specijalizacija>lekar2.specijalizacija){
        return 1;
      }
      else if(lekar1.specijalizacija<lekar2.specijalizacija){
        return -1;
      }
      else return 0;
    })
  }

  sortOgranak() {
    this.lekari = this.lekari.sort((lekar1,lekar2)=>{
      if(lekar1.ogranak>lekar2.ogranak){
        return 1;
      }
      else if(lekar1.ogranak<lekar2.ogranak){
        return -1;
      }
      else return 0;
    })
  }

  profil(lekar:Korisnik){
    // postaviti u localstorage lekara ciji profil treba prikazati na sl. stranici
    localStorage.setItem('izabrani_lekar', lekar.korisnicko_ime);
    
    // preci na stranicu za profil lekara
    this.router.navigate(["pacijent/profilLekara"]);
  }
}
