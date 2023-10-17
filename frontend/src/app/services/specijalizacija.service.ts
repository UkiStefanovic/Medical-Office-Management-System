import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecijalizacijaService {

  constructor(private http: HttpClient) { }

  backend_url = 'http://localhost:4000';

  dodajSpecijalizaciju(naziv_specijalizacije:string){
    let data={
      'naziv_specijalizacije': naziv_specijalizacije
    }
    return this.http.post(`${this.backend_url}/specijalizacija/dodaj`, data)
  }

  dohvatiSve(){
    return this.http.get(`${this.backend_url}/specijalizacija/dohvatiSve`)
  }


}
