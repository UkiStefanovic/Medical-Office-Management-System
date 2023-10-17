import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import VrstaPregleda from '../models/vrstaPregleda';
import Pregled from '../models/pregled';

@Injectable({
  providedIn: 'root'
})
export class PregledService {

  constructor(private http: HttpClient) { }

  //TODO dodati u svaki service /... na kraju
  backend_url = 'http://localhost:4000';

  zakazati(pacijent: String, imePacijenta:string, prezimePacijenta:string, lekar: String, imeLekara: String, prezimeLekara: String, vreme: Date,
       naziv: String, specijalizacija: String, trajanje: Number, cena: String, ogranak: String) {
    let data = {
      pacijent: pacijent,
      imePacijenta: imePacijenta,
      prezimePacijenta: prezimePacijenta,
      lekar: lekar,
      imeLekara: imeLekara,
      prezimeLekara: prezimeLekara,
      vreme: vreme,
      naziv: naziv,
      specijalizacija: specijalizacija,
      trajanje: trajanje,
      cena: cena,
      ogranak: ogranak
    };
    return this.http.post(`${this.backend_url}/pregled/zakazati`, data);
  }

  dohvatiPregledePacijenta(pacijent:String){
    let data={
      pacijent: pacijent
    };
    return this.http.post(`${this.backend_url}/pregled/dohvatiPregledePacijenta`, data);
  }

  otkazatiPregled(pacijent:String, lekar:String, vreme:Date, naziv:String, ogranak:String){
    let data={
      pacijent:pacijent,
      lekar:lekar,
      vreme:vreme,
      naziv:naziv, 
      ogranak:ogranak
    }
    return this.http.post(`${this.backend_url}/pregled/otkazatiPregled`, data);
  }

  dohvatiPregledeLekara(lekar:String){
    let data={
      lekar: lekar
    };
    return this.http.post(`${this.backend_url}/pregled/dohvatiPregledeLekara`, data);
  }

  // Dohvata preglede ove vrste koji su iz buducnosti
  dohvatiPregledeVrste(vrsta:VrstaPregleda){
    let data={
      specijalizacija: vrsta.specijalizacija,
      naziv: vrsta.naziv
    };
    return this.http.post(`${this.backend_url}/pregled/dohvatiPregledeVrste`, data);
  }

  azurirajPregled(pregled: Pregled, novo_trajanje:number, nova_cena:string){
    // console.log(pregled._id)
    let data={
      _id:pregled._id,
      novo_trajanje:novo_trajanje,
      nova_cena:nova_cena
    };
    return this.http.post(`${this.backend_url}/pregled/azurirajPregled`, data);
  }


}
