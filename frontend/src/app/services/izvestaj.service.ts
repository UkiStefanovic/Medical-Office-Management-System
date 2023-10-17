import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pregled from '../models/pregled';

@Injectable({
  providedIn: 'root'
})
export class IzvestajService {

  constructor(private http: HttpClient) { }

  backend_url = 'http://localhost:4000/izvestaj';

  dodajIzvestaj(pregled: Pregled, razlog_dolaska: string, dijagnoza: string, preporucena_terapija: string, datum_kontrole: Date) {
    let data = {
      pacijent: pregled.pacijent,
      imePacijenta: pregled.imePacijenta,
      prezimePacijenta: pregled.prezimePacijenta,

      lekar: pregled.lekar,
      imeLekara: pregled.imeLekara,
      prezimeLekara: pregled.prezimeLekara,

      vreme: pregled.vreme,
      datum_kontrole: datum_kontrole,

      specijalizacija: pregled.specijalizacija,
      razlog_dolaska: razlog_dolaska,
      dijagnoza: dijagnoza,
      preporucena_terapija: preporucena_terapija
    };
    return this.http.post(`${this.backend_url}/dodajIzvestaj`, data);
  }

  dohvatiIzvestajePacijenta(pacijent: string) {
    let data = {
      pacijent: pacijent
    };
    return this.http.post(`${this.backend_url}/dohvatiIzvestajePacijenta`, data);
  }

  savePDF(file: File, email:string, ime:string, prezime:string) {
    let fd = new FormData();
    fd.append('file', file);
    fd.append('email', email);
    fd.append('ime', ime);
    fd.append('prezime', prezime);
    return this.http.post(`${this.backend_url}/savePDF`, fd);
  }



}
