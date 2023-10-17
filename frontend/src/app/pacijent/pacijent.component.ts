import { Component, OnInit } from '@angular/core';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit {

  constructor(
    private korisnikService: KorisnikService
  ) { }

  ulogovani_pacijent: Korisnik = null;

  // AZURIRANJE
  azuriraSe: boolean = false;

  ime_azuriranje: string;
  ime_bool: boolean = false;

  prezime_azuriranje: string;
  prezime_bool: boolean = false;

  adresa_azuriranje: string;
  adresa_bool: boolean = false;

  email_azuriranje: string;
  email_bool: boolean = false;

  kontakt_telefon_azuriranje: string;
  kontakt_bool: boolean = false;

  file: File = null;
  fileName: string;
  file_error_message = "";

  error_message = "";

  ngOnInit(): void {
    var korisnicko_ime = localStorage.getItem('ulogovan_korisnik');
    this.korisnikService.dohvatiKorisnika(korisnicko_ime).subscribe((vraceni_korisnik: Korisnik) => {
      this.ulogovani_pacijent = vraceni_korisnik;
    })
  }

  profilna() {
    if (!this.ulogovani_pacijent) {
      var korisnicko_ime = localStorage.getItem('ulogovan_korisnik');
      this.korisnikService.dohvatiKorisnika(korisnicko_ime).subscribe((vraceni_korisnik: Korisnik) => {
        return vraceni_korisnik.profilna;
      })
    }
    return this.ulogovani_pacijent.profilna;
  }

  azurirajProfil() {
    this.azuriraSe = true;
  }
  odustaoAzuriranje() {
    this.azuriraSe = false;
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

  azuriraj() {
    //PROVERA PODATAKA
    if (!this.ime_bool) {
      this.ime_azuriranje = this.ulogovani_pacijent.ime;
    }
    if (this.ime_azuriranje == "" || this.ime_azuriranje == null) {
      this.error_message = "Uneli ste loše ime za ažuriranje.";
      return;
    }

    if (!this.prezime_bool) {
      this.prezime_azuriranje = this.ulogovani_pacijent.prezime;
    }
    if (this.prezime_azuriranje == "" || this.prezime_azuriranje == null) {
      this.error_message = "Uneli ste loše prezime za ažuriranje.";
      return;
    }

    if (!this.adresa_bool) {
      this.adresa_azuriranje = this.ulogovani_pacijent.adresa;
    }
    if (this.adresa_azuriranje == "" || this.adresa_azuriranje == null) {
      this.error_message = "Uneli ste lošu adresu za ažuriranje.";
      return;
    }

    var email_regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (!this.email_bool) {
      this.email_azuriranje = this.ulogovani_pacijent.email;
    }
    if (!email_regex.test(this.email_azuriranje)) {
      this.error_message = "Email vam nije dobar.";
      return;
    }

    var kontakt_telefon_regex = new RegExp(/^[+]?[\d /-]+/);
    if (!this.kontakt_bool) {
      this.kontakt_telefon_azuriranje = this.ulogovani_pacijent.kontakt_telefon;
    }
    if (!kontakt_telefon_regex.test(this.kontakt_telefon_azuriranje)) {
      this.error_message = "Kontakt telefon nije dobar.";
      return;
    }

    //kraj provere podataka
    this.error_message = "";

    this.korisnikService.azurirajPacijenta(
      this.ulogovani_pacijent.korisnicko_ime,
      this.ime_azuriranje,
      this.prezime_azuriranje,
      this.adresa_azuriranje,
      this.kontakt_telefon_azuriranje,
      this.email_azuriranje,
      this.ulogovani_pacijent.profilna,
      this.file
    ).subscribe((resp) => {

      this.azuriraSe = false;
      this.ime_azuriranje = null;
      this.ime_bool = false;
      this.prezime_azuriranje = null;
      this.prezime_bool = false;
      this.adresa_azuriranje = null;
      this.adresa_bool = false;
      this.email_azuriranje = null;
      this.email_bool = false;
      this.kontakt_telefon_azuriranje = null;
      this.kontakt_bool = false;
      this.file = null;
      this.fileName = null;
      this.file_error_message = "";

      alert(resp['message']);
      location.reload();
    })
  }
}
