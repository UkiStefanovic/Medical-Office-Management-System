import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Korisnik from '../models/korisnik';
import Obavestenje from '../models/obavestenje';
import Pregled from '../models/pregled';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  backend_url = 'http://localhost:4000';

  login(korisnicko_ime:string, lozinka:string){
    let data = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka
    }
    return this.http.post(`${this.backend_url}/korisnik/login`, data)
  }

  loginMenadzer(korisnicko_ime:string, lozinka:string){
    let data = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka
    }
    return this.http.post(`${this.backend_url}/korisnik/loginMenadzer`, data)
  }

  registrujLekara(
    korisnicko_ime:string,
    lozinka:string,
    ime:string,
    prezime: string,
    adresa:string,
    kontakt_telefon:string,
    email:string,
    file: File,
    broj_lekarske_licence: number,
    specijalizacija: string,
    ogranak:string
  ){
    const data = new FormData();
    data.append('korisnicko_ime',korisnicko_ime);
    data.append('lozinka', lozinka);
    data.append('ime',ime);
    data.append('prezime',prezime);
    data.append('adresa',adresa);
    data.append('kontakt_telefon', kontakt_telefon);
    data.append('email',email);
    if(file!=null){
      data.append('profilna',file);
    }
    data.append('broj_lekarske_licence', broj_lekarske_licence.toString());
    data.append('specijalizacija', specijalizacija);
    data.append('ogranak', ogranak);

    return this.http.post(`${this.backend_url}/korisnik/registrujLekara`, data);
  }

  dohvatiSveKorisnike(){
    return this.http.get(`${this.backend_url}/korisnik/dohvatiSveKorisnike`);
  }

  dohvatiSveLekare(){
    return this.http.get(`${this.backend_url}/korisnik/dohvatiSveLekare`)
  }

  dohvatiSvePacijente(){
    return this.http.get(`${this.backend_url}/korisnik/dohvatiSvePacijente`)
  }

  registrujPacijenta(
    korisnicko_ime:string,
    lozinka:string,
    ime:string,
    prezime: string,
    adresa:string,
    kontakt_telefon:string,
    email:string,
    file: File
  ){
    const data = new FormData();
    data.append('korisnicko_ime',korisnicko_ime);
    data.append('lozinka', lozinka);
    data.append('ime',ime);
    data.append('prezime',prezime);
    data.append('adresa',adresa);
    data.append('kontakt_telefon', kontakt_telefon);
    data.append('email',email);
    if(file!=null){
      data.append('profilna',file);
    }

    return this.http.post(`${this.backend_url}/korisnik/registrujPacijenta`, data);
  }

  dohvatiKorisnika(korisnicko_ime:string){
    let data={
      'korisnicko_ime':korisnicko_ime
    }
    return this.http.post(`${this.backend_url}/korisnik/dohvatiKorisnika`, data);
  }

  promeniLozinku(korisnicko_ime:string, nova_lozinka:string){
    let data={
      'korisnicko_ime':korisnicko_ime,
      'nova_lozinka':nova_lozinka
    }
    return this.http.post(`${this.backend_url}/korisnik/promeniLozinku`, data);
  }

  dohvatiPacijenteNaCekanju(){
    return this.http.get(`${this.backend_url}/korisnik/dohvatiPacijenteNaCekanju`);
  }

  prihvati(korisnicko_ime:string, email:string, kontakt_telefon:string){
    let data={
      'korisnicko_ime':korisnicko_ime,
      'email':email,
      'kontakt_telefon':kontakt_telefon
    }
    return this.http.post(`${this.backend_url}/korisnik/prihvati`, data);
  }

  odbij(korisnicko_ime:string, email:string, kontakt_telefon:string){
    let data={
      'korisnicko_ime':korisnicko_ime,
      'email':email,
      'kontakt_telefon':kontakt_telefon
    }
    return this.http.post(`${this.backend_url}/korisnik/odbij`, data);
  }

  dodajVrstuPregleda(naziv_vrste_pregleda:string, korisnicko_ime_lekara:string){
    let data={
      'naziv_vrste_pregleda':naziv_vrste_pregleda,
      'korisnicko_ime_lekara':korisnicko_ime_lekara
    }
    return this.http.post(`${this.backend_url}/korisnik/dodajVrstuPregleda`, data)
  }

  ukloniVrstuPregleda(naziv_vrste_pregleda:string, korisnicko_ime_lekara:string){
    let data={
      'naziv_vrste_pregleda':naziv_vrste_pregleda,
      'korisnicko_ime_lekara':korisnicko_ime_lekara
    }
    return this.http.post(`${this.backend_url}/korisnik/ukloniVrstuPregleda`, data)
  }

  dodajPromociju(tekst:string, vreme:Date){
    let data={
      tekst:tekst,
      vreme:vreme
    };
    return this.http.post(`${this.backend_url}/korisnik/dodajPromociju`, data)
  }

  procitati(obavestenje: Obavestenje, pacijent: Korisnik){
    let data={
      pacijent: pacijent.korisnicko_ime,
      tekst: obavestenje.tekst,
      vreme: obavestenje.vreme
    };
    return this.http.post(`${this.backend_url}/korisnik/procitati`, data)
  }

  zakazatiPregled(vreme:Date, pacijent:string, tekst:string){
    let data={
      pacijent:pacijent,
      vreme:vreme,
      tekst:tekst
    };
    return this.http.post(`${this.backend_url}/korisnik/zakazatiPregled`, data);
  }

  otkazatiPregled(pacijent:string, imeLekara:string, prezimeLekara:string, pregled:Pregled, razlog_otkazivanja:string){
    let tekst = "Otkazan vam je pregled: "+pregled.naziv+" kod lekara: "+imeLekara+" "+prezimeLekara+". Lekar je dao kao razlog otkazivanja:\n"+razlog_otkazivanja+".";
    let vreme = new Date();
    let data={
      pacijent:pacijent,
      tekst:tekst,
      vreme:vreme
    };
    return this.http.post(`${this.backend_url}/korisnik/otkazatiPregled`, data);
  }

  azurirajPacijenta(
    korisnicko_ime:string,
    ime:string,
    prezime: string,
    adresa:string,
    kontakt_telefon:string,
    email:string,
    prethodna_profilna:string,
    file: File
  ){
    const data = new FormData();
    data.append('korisnicko_ime',korisnicko_ime);
    data.append('ime',ime);
    data.append('prezime',prezime);
    data.append('adresa',adresa);
    data.append('kontakt_telefon', kontakt_telefon);
    data.append('email',email);
    data.append('prethodna_profilna', prethodna_profilna);
    if(file!=null){
      data.append('profilna',file);
    }


    return this.http.post(`${this.backend_url}/korisnik/azurirajPacijenta`, data);
  }




  azurirajLekara(
    korisnicko_ime:string,
    ime:string,
    prezime: string,
    adresa:string,
    kontakt_telefon:string,
    broj_lekarske_licence:Number,
    specijalizacija:string,
    prethodna_profilna:string,
    file: File
  ){
    const data = new FormData();
    data.append('korisnicko_ime',korisnicko_ime);
    data.append('ime',ime);
    data.append('prezime',prezime);
    data.append('adresa',adresa);
    data.append('kontakt_telefon', kontakt_telefon);
    data.append('broj_lekarske_licence', broj_lekarske_licence.toString());
    data.append('specijalizacija',specijalizacija);
    data.append('prethodna_profilna', prethodna_profilna);
    if(file!=null){
      data.append('profilna',file);
    }

    return this.http.post(`${this.backend_url}/korisnik/azurirajLekara`, data);
  }


  obrisiPacijenta(korisnicko_ime:string, email:string, kontakt_telefon:string, profilna:string){
    let data={
      'korisnicko_ime':korisnicko_ime,
      'email':email,
      'kontakt_telefon':kontakt_telefon,
      'profilna':profilna
    }
    return this.http.post(`${this.backend_url}/korisnik/obrisiPacijenta`, data);
  }

  obrisiLekara(korisnicko_ime:string, email:string, kontakt_telefon:string, profilna:string){
    let data={
      'korisnicko_ime':korisnicko_ime,
      'email':email,
      'kontakt_telefon':kontakt_telefon,
      'profilna':profilna
    }
    return this.http.post(`${this.backend_url}/korisnik/obrisiLekara`, data);
  }

  posaljiObavestenje(vreme:Date, pacijent:string, tekst:string){
    let data={
      pacijent:pacijent,
      vreme:vreme,
      tekst:tekst
    };
    return this.http.post(`${this.backend_url}/korisnik/posaljiObavestenje`, data);
  }

}
