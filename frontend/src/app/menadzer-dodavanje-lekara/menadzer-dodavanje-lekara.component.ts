import { Component, OnInit } from '@angular/core';
import Specijalizacija from '../models/specijalizacija';
import { SpecijalizacijaService } from '../services/specijalizacija.service';
import { Location } from '@angular/common'
import { KorisnikService } from '../services/korisnik.service';
import Korisnik from '../models/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-dodavanje-lekara',
  templateUrl: './menadzer-dodavanje-lekara.component.html',
  styleUrls: ['./menadzer-dodavanje-lekara.component.css']
})
export class MenadzerDodavanjeLekaraComponent implements OnInit {

  constructor(private specijalizacijaService: SpecijalizacijaService,
     private _location: Location, 
     private korisnikService: KorisnikService,
     private router:Router
     ) { }

  sveSpecijalizacije: Specijalizacija[] = [];


  korisnicko_ime: string;
  lozinka: string;
  ime: string;
  prezime: string;
  adresa: string;
  kontakt_telefon: string;
  email: string;
  broj_lekarske_licence: number;
  naziv_specijalizacije: string;
  ogranak: string;

  file: File;
  fileName = '';
  file_error_message = "";

  error_message = "";

  ngOnInit(): void {
    this.specijalizacijaService.dohvatiSve().subscribe((data: Specijalizacija[]) => {
      this.sveSpecijalizacije = data;
    })
  }

  async izabranFajl(event) {
    this.fileName = "";
    this.file = null;
    this.file_error_message = "";

    const newFile: File = event.target.files[0];
    if (newFile == null) {
      // mozda treba drugacije proveriti da li je null
      return;
    }

    // provera tipa fajla
    if (newFile.type == 'image/jpeg' || newFile.type == 'image/png') {

      //dohvatanje visinne i sirine
      const dimensions = await this.getImageDimensions(newFile)
      const width = dimensions.width;
      const height = dimensions.height;

      // provera velicine slike
      // console.log('Width: ' + width + ' pixels')
      // console.log('Height: ' + height + ' pixels')
      // dobro dohvata dimenzije
      if (width < 100 || width > 300 || height < 100 || height > 300) {
        this.file_error_message = "Uneli ste preveliku ili premalu sliku.";
      }
      else {
        //promena imena fajla i file
        this.fileName = newFile.name;
        this.file = newFile;
        this.file_error_message = "";
      }
    }
    else {
      this.file_error_message = "Uneli ste fajl pogrešnog formata. Potreban je .jpg ili .png fajl."
    }
  }
  getImageDimensions(selectedFile: File): Promise<{ width: number, height: number }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          // console.log('Width: ' + width + ' pixels');
          // console.log('Height: ' + height + ' pixels');
          // nalazi dimenzije kako treba
          resolve({ width, height });
        };
        img.src = e.target.result as string;
      };
      reader.readAsDataURL(selectedFile);
    })
  }

  registracija() {
    // Regularni izrazi
    var lozinka_regex = new RegExp(/(?=.*[!?@#$%^&*()\[\]:;.,<>/\\])(?=.*\d)(?=.*[A-Z])^[a-zA-Z].{7,13}/);
    var kontakt_telefon_regex = new RegExp(/^[+]?[\d /-]+/);
    var email_regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

    // proveriti da li su svi podaci uneti (required)
    // Ovde proveravamo i regularne izraze za lozinku, email i kontakt telefon
    if (this.korisnicko_ime == "" || this.korisnicko_ime == null) {
      this.error_message = "Niste uneli korisničko ime.";
      return;
    }
    if (!lozinka_regex.test(this.lozinka)) {
      this.error_message = "Lozinka nije u dobrom formatu. Mora da sadrži barem jedno veliko slovo, barem jedan broj, barem jedan spec. karakter, mora počinjati slovom i da ima od 8 do 14 karaktera.";
      return;
    }
    // lozinka je u gorenapisanom formatu
    // ostaje da proverimo da li su svi susedi razliciti
    let razliciti_susedi = true;
    for (var i = 0; i < this.lozinka.length - 1; i++) {
      if (this.lozinka[i] == this.lozinka[i + 1]) {
        razliciti_susedi = false;
        break;
      }
    }
    if (!razliciti_susedi) {
      this.error_message = "Lozinka nije u dobrom formatu. Mora da sadrži barem jedno veliko slovo, barem jedan broj, barem jedan spec. karakter, mora počinjati slovom, dva susedna karaktera moraju biti različita i da ima od 8 do 14 karaktera.";
      return;
    }
    if (this.ime == null || this.ime == "") {
      this.error_message = "Niste uneli ime.";
      return;
    }
    if (this.prezime == null || this.prezime == "") {
      this.error_message = "Niste uneli prezime.";
      return;
    }
    if (this.adresa == null || this.adresa == "") {
      this.error_message = "Niste uneli adresu. Moramo da znamo gde živite.";
      return;
    }
    if (!kontakt_telefon_regex.test(this.kontakt_telefon)) {
      this.error_message = "Kontakt telefon nije dobar.";
      return;
    }
    if (!email_regex.test(this.email)) {
      this.error_message = "Email vam nije dobar.";
      return;
    }
    if (this.broj_lekarske_licence == null) {
      this.error_message = "Unesite broj lekarske licence. Pa jeste li Vi uopste lekar???";
      return;
    }
    if (this.naziv_specijalizacije == null) {
      this.error_message = "Niste izabrali specijalizaciju";
      return;
    }
    if (this.ogranak == null || this.ogranak == "") {
      this.error_message = "Morate da unesete ogranak";
      return;
    }

    // provera da li su korisnicko ime i email jedinstveni
    this.korisnikService.dohvatiSveKorisnike().subscribe((svi_korisnici: Korisnik[]) => {
      let jedinstveno = true;
      for (var k of svi_korisnici) {
        if (this.email == k.email) {
          jedinstveno = false;
          break;
        }
        if (this.korisnicko_ime == k.korisnicko_ime) {
          jedinstveno = false;
          break;
        }
      }
      if (jedinstveno) {
        // svi podaci su valjda korektni
        // mozemo da dodamo lekara u bazu
        this.error_message = "";

        this.korisnikService.registrujLekara(
          this.korisnicko_ime,
          this.lozinka,
          this.ime,
          this.prezime,
          this.adresa,
          this.kontakt_telefon,
          this.email,
          this.file,
          this.broj_lekarske_licence,
          this.naziv_specijalizacije,
          this.ogranak
        ).subscribe((resp) => {
          alert(resp['message']);
          this.korisnicko_ime = null;
          this.lozinka = null;
          this.ime = null;
          this.prezime = null;
          this.adresa = null;
          this.kontakt_telefon = null;
          this.email = null;
          this.file = null;
          this.naziv_specijalizacije=null;
          this.ogranak=null;
          this.broj_lekarske_licence=null;
          this.fileName=null;
          this.error_message=null;
          this.file_error_message=null;
        })
      } else {
        this.error_message = "Korisnicko ime nije jedinstven ili je za ovaj email vec napravljen nalog";
        return;
      }
    })
  }

  povratak() {
    this.router.navigate(['menadzer']);
  }
  izloguj(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
