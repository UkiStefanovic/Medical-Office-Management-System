import { Component, OnInit } from '@angular/core';
import Specijalizacija from '../models/specijalizacija';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { SpecijalizacijaService } from '../services/specijalizacija.service';

@Component({
  selector: 'app-neregistrovan-korisnik',
  templateUrl: './neregistrovan-korisnik.component.html',
  styleUrls: ['./neregistrovan-korisnik.component.css']
})
export class NeregistrovanKorisnikComponent implements OnInit {

  constructor(private korisnikService: KorisnikService, private specijalizacijaService: SpecijalizacijaService) { }

  ime_pretraga: string;
  prezime_pretraga: string;
  specijalizacija_pretraga: string;

  sveSpecijalizacije: Specijalizacija[];

  lekari: Korisnik[]

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
    if(ime_dobijeno==undefined){
      ime_dobijeno="";
    }
    let prezime_dobijeno = this.prezime_pretraga;
    if(prezime_dobijeno==undefined){
      prezime_dobijeno="";
    }
    let specijalizacija_dobijeno = this.specijalizacija_pretraga;
    if(specijalizacija_dobijeno==undefined){
      specijalizacija_dobijeno="";
    }
    
    this.korisnikService.dohvatiSveLekare().subscribe((vraceni_lekari: Korisnik[]) => {
      this.lekari = vraceni_lekari;
      this.lekari=this.lekari.filter((lekar)=>{
        return lekar.ime.includes(ime_dobijeno) && lekar.prezime.includes(prezime_dobijeno) && lekar.specijalizacija.includes(specijalizacija_dobijeno);
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
}
