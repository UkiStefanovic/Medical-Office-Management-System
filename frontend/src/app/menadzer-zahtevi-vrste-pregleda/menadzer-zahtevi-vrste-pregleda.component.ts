import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import ZahtevNovaVrstaPregleda from '../models/zahtevNovaVrstaPregleda';
import { ZahtevNovaVrstaPregledaService } from '../services/zahtev-nova-vrsta-pregleda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-zahtevi-vrste-pregleda',
  templateUrl: './menadzer-zahtevi-vrste-pregleda.component.html',
  styleUrls: ['./menadzer-zahtevi-vrste-pregleda.component.css']
})
export class MenadzerZahteviVrstePregledaComponent implements OnInit {

  constructor(
    private _location:Location,
    private zahtevNovaVrstaPregledaService:ZahtevNovaVrstaPregledaService,
    private router:Router
  ) { }

  zahtevi:ZahtevNovaVrstaPregleda[]=[];

  ngOnInit(): void {
    this.zahtevNovaVrstaPregledaService.dohvatiSve().subscribe((vraceni_zahtevi:ZahtevNovaVrstaPregleda[])=>{
      this.zahtevi=vraceni_zahtevi;
    })
  }

  prihvati(zahtev:ZahtevNovaVrstaPregleda){
    // potrebno je proslediti na backend naziv, trajanje, cenu i specijalizaciju
    this.zahtevNovaVrstaPregledaService.prihvati(zahtev.naziv, zahtev.specijalizacija, zahtev.trajanje, zahtev.cena).subscribe((resp)=>{
      alert(resp['message']);
      location.reload();
    })
  }
  odbij(zahtev:ZahtevNovaVrstaPregleda){
    this.zahtevNovaVrstaPregledaService.odbij(zahtev.naziv, zahtev.specijalizacija, zahtev.trajanje, zahtev.cena).subscribe((resp)=>{
      alert(resp['message']);
      location.reload();
    })
  }

  povratak() {
    this._location.back();
  }
  izloguj(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
