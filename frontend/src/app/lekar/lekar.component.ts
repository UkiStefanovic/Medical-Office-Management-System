import { Component, OnInit } from '@angular/core';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import VrstaPregleda from '../models/vrstaPregleda';
import { VrstaPregledaService } from '../services/vrsta-pregleda.service';
import Specijalizacija from '../models/specijalizacija';
import { SpecijalizacijaService } from '../services/specijalizacija.service';

@Component({
  selector: 'app-lekar',
  templateUrl: './lekar.component.html',
  styleUrls: ['./lekar.component.css']
})
export class LekarComponent implements OnInit {

  constructor(
    private korisnikService: KorisnikService,
    private vrstePregledaService: VrstaPregledaService,
    private specijalizacijaService: SpecijalizacijaService
  ) { }

  ulogovani_lekar: Korisnik = null;
  vrste_pregleda: VrstaPregleda[] = [];

  // AZURIRANJE
  azuriraSe: boolean = false;

  ime_azuriranje: string;
  ime_bool: boolean = false;

  prezime_azuriranje: string;
  prezime_bool: boolean = false;

  adresa_azuriranje: string;
  adresa_bool: boolean = false;

  kontakt_telefon_azuriranje: string;
  kontakt_bool: boolean = false;

  broj_lekarske_licence_azuriranje: Number;
  br_licence_bool: boolean = false;

  sveSpecijalizacije: Specijalizacija[] = [];
  specijalizacija_azuriranje: string;
  specijalizacija_bool: boolean = false;


  file: File = null;
  fileName: string;
  file_error_message = "";

  error_message = "";



  ngOnInit(): void {
    var korisnicko_ime = localStorage.getItem('ulogovan_korisnik');
    this.korisnikService.dohvatiKorisnika(korisnicko_ime).subscribe((vraceni_korisnik: Korisnik) => {
      this.ulogovani_lekar = vraceni_korisnik;
      this.vrstePregledaService.dohvatiVrstePregleda(this.ulogovani_lekar.specijalizacija).subscribe((vracene_vrste_pregleda: VrstaPregleda[]) => {
        this.vrste_pregleda = vracene_vrste_pregleda;

        this.specijalizacijaService.dohvatiSve().subscribe((specijalizacije: Specijalizacija[]) => {
          this.sveSpecijalizacije = specijalizacije;
        })
      })
    })
  }

  obavlja(pregled: string): boolean {
    for (var i = 0; i < this.ulogovani_lekar.vrste_pregleda.length; i++) {
      let pregled_za_poredjenje = this.ulogovani_lekar.vrste_pregleda[i];
      if (pregled == pregled_za_poredjenje) {
        return true;
      }
    }
    return false;
  }

  dodaj(pregled: VrstaPregleda) {
    this.korisnikService.dodajVrstuPregleda(pregled.naziv, this.ulogovani_lekar.korisnicko_ime).subscribe((resp) => {
      alert(resp['message']);
      location.reload();
    })
  }

  ukloni(pregled: VrstaPregleda) {
    this.korisnikService.ukloniVrstuPregleda(pregled.naziv, this.ulogovani_lekar.korisnicko_ime).subscribe((resp) => {
      alert(resp['message']);
      location.reload();
    })
  }

  profilna() {
    if (!this.ulogovani_lekar) {
      var korisnicko_ime = localStorage.getItem('ulogovan_korisnik');
      this.korisnikService.dohvatiKorisnika(korisnicko_ime).subscribe((vraceni_korisnik: Korisnik) => {
        return vraceni_korisnik.profilna;
      })
    }
    return this.ulogovani_lekar.profilna;
  }

  async izabranFajl(event) {
    this.fileName = "";
    this.file = null;
    this.file_error_message = "";

    const newFile: File = event.target.files[0];
    if (newFile == null) {
      return;
    }

    // provera tipa fajla
    if (newFile.type == 'image/jpeg' || newFile.type == 'image/png') {

      //dohvatanje visinne i sirine
      const dimensions = await this.getImageDimensions(newFile)
      const width = dimensions.width;
      const height = dimensions.height;

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
          resolve({ width, height });
        };
        img.src = e.target.result as string;
      };
      reader.readAsDataURL(selectedFile);
    })
  }


  azurirajProfil() {
    this.azuriraSe = true;
  }
  odustaoAzuriranje() {
    this.azuriraSe = false;
  }

  azuriraj() {
    //PROVERA PODATAKA
    if (!this.ime_bool) {
      this.ime_azuriranje = this.ulogovani_lekar.ime;
    }
    if (this.ime_azuriranje == "" || this.ime_azuriranje == null) {
      this.error_message = "Uneli ste loše ime za ažuriranje.";
      return;
    }

    if (!this.prezime_bool) {
      this.prezime_azuriranje = this.ulogovani_lekar.prezime;
    }
    if (this.prezime_azuriranje == "" || this.prezime_azuriranje == null) {
      this.error_message = "Uneli ste loše prezime za ažuriranje.";
      return;
    }

    if (!this.adresa_bool) {
      this.adresa_azuriranje = this.ulogovani_lekar.adresa;
    }
    if (this.adresa_azuriranje == "" || this.adresa_azuriranje == null) {
      this.error_message = "Uneli ste lošu adresu za ažuriranje.";
      return;
    }

    var kontakt_telefon_regex = new RegExp(/^[+]?[\d /-]+/);
    if (!this.kontakt_bool) {
      this.kontakt_telefon_azuriranje = this.ulogovani_lekar.kontakt_telefon;
    }
    if (!kontakt_telefon_regex.test(this.kontakt_telefon_azuriranje)) {
      this.error_message = "Kontakt telefon nije dobar.";
      return;
    }

    if (!this.br_licence_bool) {
      this.broj_lekarske_licence_azuriranje = this.ulogovani_lekar.broj_lekarske_licence;
    }
    if (this.broj_lekarske_licence_azuriranje == null) {
      this.error_message = "Uneli ste loš broj licence za ažuriranje.";
      return;
    }

    if (!this.specijalizacija_bool) {
      this.specijalizacija_azuriranje = this.ulogovani_lekar.specijalizacija;
    }
    if (this.specijalizacija_azuriranje == null) {
      this.error_message = "Niste izabrali specijalizaciju";
      return;
    }
    //kraj provere podataka
    this.error_message = "";

    this.korisnikService.azurirajLekara(
      this.ulogovani_lekar.korisnicko_ime,
      this.ime_azuriranje,
      this.prezime_azuriranje,
      this.adresa_azuriranje,
      this.kontakt_telefon_azuriranje,
      this.broj_lekarske_licence_azuriranje,
      this.specijalizacija_azuriranje,
      this.ulogovani_lekar.profilna,
      this.file
    ).subscribe((resp) => {

      this.azuriraSe = false;

      this.ime_azuriranje = null;
      this.ime_bool = false;

      this.prezime_azuriranje = null;
      this.prezime_bool = false;

      this.adresa_azuriranje = null;
      this.adresa_bool = false;

      this.kontakt_telefon_azuriranje = null;
      this.kontakt_bool = false;

      this.broj_lekarske_licence_azuriranje = null;
      this.br_licence_bool = false;

      this.specijalizacija_azuriranje = null;
      this.specijalizacija_bool = false;

      this.file = null;
      this.fileName = null;
      this.file_error_message = "";

      alert(resp['message']);
      location.reload();
    })
  }
}
