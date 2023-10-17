import { Component, OnInit } from '@angular/core';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';
import Specijalizacija from '../models/specijalizacija';

@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit {

  constructor(
    private korisnikService: KorisnikService,
    private router: Router
  ) { }

  korisnik: String;
  url_profilne: String;
  pacijenti_na_cekanju: Korisnik[] = [];







  //Lekari
  lekari: Korisnik[] = [];

  // AZURIRANJE LEKARA
  lekar_za_azurirati: Korisnik = null;
  azuriranje_lekara: boolean = false;

  lekar_ime_azuriranje: string;
  lekar_ime_bool: boolean = false;

  lekar_prezime_azuriranje: string;
  lekar_prezime_bool: boolean = false;

  lekar_adresa_azuriranje: string;
  lekar_adresa_bool: boolean = false;

  lekar_kontakt_telefon_azuriranje: string;
  lekar_kontakt_bool: boolean = false;

  lekar_broj_lekarske_licence_azuriranje: Number;
  lekar_br_licence_bool: boolean = false;

  sveSpecijalizacije: Specijalizacija[] = [];
  lekar_specijalizacija_azuriranje: string;
  lekar_specijalizacija_bool: boolean = false;


  lekar_file: File = null;
  lekar_fileName: string;
  lekar_file_error_message = "";

  lekar_error_message = "";



  // Pacijenti
  pacijenti:Korisnik[]=[];

  //AZURIRANJE PACIJENTA
  pacijent_za_azurirati: Korisnik = null;
  azuriranje_pacijenta: boolean = false;

  pacijent_ime_azuriranje: string;
  pacijent_ime_bool: boolean = false;

  pacijent_prezime_azuriranje: string;
  pacijent_prezime_bool: boolean = false;

  pacijent_adresa_azuriranje: string;
  pacijent_adresa_bool: boolean = false;

  pacijent_email_azuriranje: string;
  pacijent_email_bool: boolean = false;

  pacijent_kontakt_telefon_azuriranje: string;
  pacijent_kontakt_bool: boolean = false;

  pacijent_file: File = null;
  pacijent_fileName: string;
  pacijent_file_error_message = "";

  pacijent_error_message = "";














  ngOnInit(): void {
    this.korisnik = localStorage.getItem('ulogovan_korisnik');
    this.korisnikService.dohvatiPacijenteNaCekanju().subscribe((pacijenti_na_cekanju: Korisnik[]) => {
      this.pacijenti_na_cekanju = pacijenti_na_cekanju;
    })
    this.korisnikService.dohvatiSveLekare().subscribe((vraceni_lekari: Korisnik[]) => {
      this.lekari = vraceni_lekari;
    })
    this.korisnikService.dohvatiSvePacijente().subscribe((vraceni_pacijenti:Korisnik[])=>{
      this.pacijenti=vraceni_pacijenti;
    })
  }

  prihvati(pacijent: Korisnik) {
    this.korisnikService.prihvati(pacijent.korisnicko_ime, pacijent.email, pacijent.kontakt_telefon).subscribe((resp) => {
      alert(resp['message']);
      location.reload();
    })
  }

  odbij(pacijent: Korisnik) {
    this.korisnikService.odbij(pacijent.korisnicko_ime, pacijent.email, pacijent.kontakt_telefon).subscribe((resp) => {
      alert(resp['message']);
      location.reload();
    })
  }

  izloguj() {
    localStorage.clear();
  }













  async izabranFajlLekar(event) {
    this.lekar_fileName = "";
    this.lekar_file = null;
    this.lekar_file_error_message = "";

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
        this.lekar_file_error_message = "Uneli ste preveliku ili premalu sliku.";
      }
      else {
        //promena imena fajla i file
        this.lekar_fileName = newFile.name;
        this.lekar_file = newFile;
        this.lekar_file_error_message = "";
      }
    }
    else {
      this.lekar_file_error_message = "Uneli ste fajl pogrešnog formata. Potreban je .jpg ili .png fajl."
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

  azuriranjeLekara(lekar: Korisnik) {
    this.lekar_za_azurirati = lekar;
    this.azuriranje_lekara = true;
  }
  odustaoAzuriranjeLekara() {
    this.azuriranje_lekara = false;
  }

  azurirajLekara() {
    //PROVERA PODATAKA
    if (!this.lekar_ime_bool) {
      this.lekar_ime_azuriranje = this.lekar_za_azurirati.ime;
    }
    if (this.lekar_ime_azuriranje == "" || this.lekar_ime_azuriranje == null) {
      this.lekar_error_message = "Uneli ste loše ime za ažuriranje.";
      return;
    }

    if (!this.lekar_prezime_bool) {
      this.lekar_prezime_azuriranje = this.lekar_za_azurirati.prezime;
    }
    if (this.lekar_prezime_azuriranje == "" || this.lekar_prezime_azuriranje == null) {
      this.lekar_error_message = "Uneli ste loše prezime za ažuriranje.";
      return;
    }

    if (!this.lekar_adresa_bool) {
      this.lekar_adresa_azuriranje = this.lekar_za_azurirati.adresa;
    }
    if (this.lekar_adresa_azuriranje == "" || this.lekar_adresa_azuriranje == null) {
      this.lekar_error_message = "Uneli ste lošu adresu za ažuriranje.";
      return;
    }

    var kontakt_telefon_regex = new RegExp(/^[+]?[\d /-]+/);
    if (!this.lekar_kontakt_bool) {
      this.lekar_kontakt_telefon_azuriranje = this.lekar_za_azurirati.kontakt_telefon;
    }
    if (!kontakt_telefon_regex.test(this.lekar_kontakt_telefon_azuriranje)) {
      this.lekar_error_message = "Kontakt telefon nije dobar.";
      return;
    }

    if (!this.lekar_br_licence_bool) {
      this.lekar_broj_lekarske_licence_azuriranje = this.lekar_za_azurirati.broj_lekarske_licence;
    }
    if (this.lekar_broj_lekarske_licence_azuriranje == null) {
      this.lekar_error_message = "Uneli ste loš broj licence za ažuriranje.";
      return;
    }

    if (!this.lekar_specijalizacija_bool) {
      this.lekar_specijalizacija_azuriranje = this.lekar_za_azurirati.specijalizacija;
    }
    if (this.lekar_specijalizacija_azuriranje == null) {
      this.lekar_error_message = "Niste izabrali specijalizaciju";
      return;
    }
    //kraj provere podataka
    this.lekar_error_message = "";

    this.korisnikService.azurirajLekara(
      this.lekar_za_azurirati.korisnicko_ime,
      this.lekar_ime_azuriranje,
      this.lekar_prezime_azuriranje,
      this.lekar_adresa_azuriranje,
      this.lekar_kontakt_telefon_azuriranje,
      this.lekar_broj_lekarske_licence_azuriranje,
      this.lekar_specijalizacija_azuriranje,
      this.lekar_za_azurirati.profilna,
      this.lekar_file
    ).subscribe((resp) => {

      this.azuriranje_lekara = false;

      this.lekar_ime_azuriranje = null;
      this.lekar_ime_bool = false;

      this.lekar_prezime_azuriranje = null;
      this.lekar_prezime_bool = false;

      this.lekar_adresa_azuriranje = null;
      this.lekar_adresa_bool = false;

      this.lekar_kontakt_telefon_azuriranje = null;
      this.lekar_kontakt_bool = false;

      this.lekar_broj_lekarske_licence_azuriranje = null;
      this.lekar_br_licence_bool = false;

      this.lekar_specijalizacija_azuriranje = null;
      this.lekar_specijalizacija_bool = false;

      this.lekar_file = null;
      this.lekar_fileName = null;
      this.lekar_file_error_message = "";

      alert("Lekar je ažuriran.");
      location.reload();
    })
  }














  async izabranFajlPacijent(event) {
    this.lekar_fileName = "";
    this.lekar_file = null;
    this.lekar_file_error_message = "";

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
      if (width < 100 || width > 300 || height < 100 || height > 300) {
        this.lekar_file_error_message = "Uneli ste preveliku ili premalu sliku.";
      }
      else {
        //promena imena fajla i file
        this.lekar_fileName = newFile.name;
        this.lekar_file = newFile;
        this.lekar_file_error_message = "";
      }
    }
    else {
      this.lekar_file_error_message = "Uneli ste fajl pogrešnog formata. Potreban je .jpg ili .png fajl."
    }
  }

  azuriranjePacijenta(pacijent: Korisnik) {
    this.pacijent_za_azurirati = pacijent;
    this.azuriranje_pacijenta = true;
  }
  odustaoAzuriranjePacijenta() {
    this.azuriranje_pacijenta = false;
  }

  azurirajPacijenta(){
    //PROVERA PODATAKA
    if (!this.pacijent_ime_bool) {
      this.pacijent_ime_azuriranje = this.pacijent_za_azurirati.ime;
    }
    if (this.pacijent_ime_azuriranje == "" || this.pacijent_ime_azuriranje == null) {
      this.pacijent_error_message = "Uneli ste loše ime za ažuriranje.";
      return;
    }

    if (!this.pacijent_prezime_bool) {
      this.pacijent_prezime_azuriranje = this.pacijent_za_azurirati.prezime;
    }
    if (this.pacijent_prezime_azuriranje == "" || this.pacijent_prezime_azuriranje == null) {
      this.pacijent_error_message = "Uneli ste loše prezime za ažuriranje.";
      return;
    }

    if (!this.pacijent_adresa_bool) {
      this.pacijent_adresa_azuriranje = this.pacijent_za_azurirati.adresa;
    }
    if (this.pacijent_adresa_azuriranje == "" || this.pacijent_adresa_azuriranje == null) {
      this.pacijent_error_message = "Uneli ste lošu adresu za ažuriranje.";
      return;
    }

    var email_regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (!this.pacijent_email_bool) {
      this.pacijent_email_azuriranje = this.pacijent_za_azurirati.email;
    }
    if (!email_regex.test(this.pacijent_email_azuriranje)) {
      this.pacijent_error_message = "Email vam nije dobar.";
      return;
    }

    var kontakt_telefon_regex = new RegExp(/^[+]?[\d /-]+/);
    if (!this.pacijent_kontakt_bool) {
      this.pacijent_kontakt_telefon_azuriranje = this.pacijent_za_azurirati.kontakt_telefon;
    }
    if (!kontakt_telefon_regex.test(this.pacijent_kontakt_telefon_azuriranje)) {
      this.pacijent_error_message = "Kontakt telefon nije dobar.";
      return;
    }

    //kraj provere podataka
    this.pacijent_error_message = "";

    this.korisnikService.azurirajPacijenta(
      this.pacijent_za_azurirati.korisnicko_ime,
      this.pacijent_ime_azuriranje,
      this.pacijent_prezime_azuriranje,
      this.pacijent_adresa_azuriranje,
      this.pacijent_kontakt_telefon_azuriranje,
      this.pacijent_email_azuriranje,
      this.pacijent_za_azurirati.profilna,
      this.pacijent_file
    ).subscribe((resp) => {

      this.azuriranje_pacijenta = false;
      this.pacijent_ime_azuriranje = null;
      this.pacijent_ime_bool = false;
      this.pacijent_prezime_azuriranje = null;
      this.pacijent_prezime_bool = false;
      this.pacijent_adresa_azuriranje = null;
      this.pacijent_adresa_bool = false;
      this.pacijent_email_azuriranje = null;
      this.pacijent_email_bool = false;
      this.pacijent_kontakt_telefon_azuriranje = null;
      this.pacijent_kontakt_bool = false;
      this.pacijent_file = null;
      this.pacijent_fileName = null;
      this.pacijent_file_error_message = "";

      alert("Pacijent je ažuriran.");
      location.reload();
    })
  }




  obrisiPacijenta(pacijent:Korisnik){
    this.korisnikService.obrisiPacijenta(pacijent.korisnicko_ime, pacijent.email, pacijent.kontakt_telefon, pacijent.profilna).subscribe((resp)=>{
      alert(resp['message']);
      location.reload();
    })
  }

  obrisiLekara(lekar:Korisnik){
    this.korisnikService.obrisiLekara(lekar.korisnicko_ime, lekar.email, lekar.kontakt_telefon, lekar.profilna).subscribe((resp)=>{
      alert(resp['message']);
      location.reload();
    })
  }


}
