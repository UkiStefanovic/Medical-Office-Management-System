import { Injectable } from '@angular/core';
import Specijalizacija from '../models/specijalizacija';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VrstaPregledaService {

  constructor(private http: HttpClient) { }

  backend_url = 'http://localhost:4000';

  // metoda za dohvatanje vrsta pregleda date specijalizacije
  dohvatiVrstePregleda(specijalizacija: string) {
    let data = {
      'specijalizacija': specijalizacija
    }
    return this.http.post(`${this.backend_url}/vrstaPregleda/dohvatiVrstePregleda`, data);
  }

  azurirati(prethodni_naziv: string, specijalizacija: string, novo_trajanje: number, nova_cena: string, promena_cene:boolean) {
    let data = {
      'prethodni_naziv': prethodni_naziv,
      'specijalizacija': specijalizacija,
      'novo_trajanje': novo_trajanje,
      'nova_cena': nova_cena,
      'promena_cene': promena_cene
    };
    return this.http.post(`${this.backend_url}/vrstaPregleda/azurirati`, data);
  }

  obrisati(naziv: string, specijalizacija: string) {
    let data = {
      'naziv': naziv,
      'specijalizacija': specijalizacija
    }
    return this.http.post(`${this.backend_url}/vrstaPregleda/obrisati`, data)
  }

  dodaj(naziv: string, trajanje: number, cena: string, specijalizacija: string) {
    let data = {
      'naziv': naziv,
      'trajanje': trajanje,
      'cena': cena,
      'specijalizacija': specijalizacija
    }
    return this.http.post(`${this.backend_url}/vrstaPregleda/dodaj`, data);
  }
}
