import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZahtevNovaVrstaPregledaService {

  constructor(private http: HttpClient) { }

  backend_url = 'http://localhost:4000';

  dodaj(naziv:string, trajanje:number, cena:string, specijalizacija:string, ime_lekara:string, prezime_lekara:string){
    let data={
      'naziv': naziv,
      'trajanje': trajanje,
      'cena': cena,
      'specijalizacija': specijalizacija,
      'ime_lekara': ime_lekara,
      'prezime_lekara':prezime_lekara
    }
    return this.http.post(`${this.backend_url}/zahtevNovaVrstaPregleda/dodaj`,data);
  }

  dohvatiSve(){
    return this.http.get(`${this.backend_url}/zahtevNovaVrstaPregleda/dohvatiSve`)
  }

  prihvati(naziv:string, specijalizacija:string, trajanje:number, cena:string){
    let data={
      'naziv': naziv,
      'specijalizacija': specijalizacija,
      'trajanje': trajanje,
      'cena': cena
    }
    return this.http.post(`${this.backend_url}/zahtevNovaVrstaPregleda/prihvati`,data)
  }

  odbij(naziv:string, specijalizacija:string, trajanje:number, cena:string){
    let data={
      'naziv': naziv,
      'specijalizacija': specijalizacija,
      'trajanje': trajanje,
      'cena': cena
    }
    return this.http.post(`${this.backend_url}/zahtevNovaVrstaPregleda/odbij`,data)
  }


}
