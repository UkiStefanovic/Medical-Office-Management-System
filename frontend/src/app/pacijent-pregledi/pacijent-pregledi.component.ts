import { Component, OnInit } from '@angular/core';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import Pregled from '../models/pregled';
import { PregledService } from '../services/pregled.service';
import Izvestaj from '../models/izvestaj';
import { IzvestajService } from '../services/izvestaj.service';
import { jsPDF } from "jspdf";
import { myFont } from '../../assets/fonts/amiri-regular'


@Component({
  selector: 'app-pacijent-pregledi',
  templateUrl: './pacijent-pregledi.component.html',
  styleUrls: ['./pacijent-pregledi.component.css']
})
export class PacijentPreglediComponent implements OnInit {

  constructor(
    private korisnikService: KorisnikService,
    private pregledService: PregledService,
    private izvestajService: IzvestajService
  ) { }

  ulogovani_pacijent: Korisnik = null;
  pregledi: Pregled[] = [];

  izvestaji: Izvestaj[] = [];

  ngOnInit(): void {
    var korisnicko_ime = localStorage.getItem('ulogovan_korisnik');
    // dohvatanje pacijenta
    this.korisnikService.dohvatiKorisnika(korisnicko_ime).subscribe((vraceni_korisnik: Korisnik) => {
      this.ulogovani_pacijent = vraceni_korisnik;
      // dohvatanje njegovih pregleda
      this.pregledService.dohvatiPregledePacijenta(this.ulogovani_pacijent.korisnicko_ime).subscribe((vraceni_pregledi: Pregled[]) => {
        this.pregledi = [];

        // IDEJA: idemo kroz niz vraceni_pregledi i za svaki pregled proveravamo da li je iz proslosti ili buducnosti

        // filtriranje buducih pregleda - ovo ce izbaciti i preglede koji su u toku
        let trenutno_vreme = new Date();
        for (var i = 0; i < vraceni_pregledi.length; i++) {
          var pregled = vraceni_pregledi[i];
          var vreme = new Date(pregled.vreme);
          if (vreme > trenutno_vreme) {
            this.pregledi.push(pregled);
          }
        }

        // sortiranje pregleda od najskorijeg do najkasnijeg (rastuce)
        this.pregledi = this.pregledi.sort((a, b) => {
          if (a.vreme < b.vreme) {
            return -1;
          }
          else if (a.vreme > b.vreme) {
            return 1;
          }
          else return 0;
        })

        // dohvatanje izvestaja
        this.izvestajService.dohvatiIzvestajePacijenta(korisnicko_ime).subscribe((vraceni_izvestaji: Izvestaj[]) => {
          this.izvestaji = vraceni_izvestaji;

          // sortiranje opadajuce po vremenu
          this.izvestaji = this.izvestaji.sort((a, b) => {
            if (a.vreme > b.vreme) {
              return -1;
            }
            else if (a.vreme < b.vreme) {
              return 1;
            }
            else return 0;
          })
        })

      })
    })
  }


  otkazati(pregled: Pregled) {
    this.pregledService.otkazatiPregled(pregled.pacijent, pregled.lekar, pregled.vreme, pregled.naziv, pregled.ogranak).subscribe((resp) => {
      alert(resp['message']);
      location.reload();
    })
  }

  async export() {
    const doc = new jsPDF();

    doc.addFileToVFS("Amiri-Regular.ttf", myFont); // konstanta myFont je importovana 
    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
    doc.setFont("Amiri");

    doc.text("IZVEŠTAJI", 100, 10, { align: 'center' });
    var trenutno_vreme = new Date();
    doc.text("Poslednje ažuriranje: " + trenutno_vreme.toLocaleString(), 100, 20, { align: 'center' });

    const pageHeight = doc.internal.pageSize.getHeight();

    var x = 10;
    var y = 30;
    for (var i = 0; i < this.izvestaji.length; i++) {
      let izvestaj = this.izvestaji[i];
      doc.setFontSize(14);
      doc.text("Izveštaj br. " + (i + 1).toString(), x, y);
      y += 10;
      if (y >= pageHeight) { // provera da li je y>=297
        doc.addPage();
        y = 5;
      }

      doc.setFontSize(11);
      var red = "Pacijent: " + izvestaj.imePacijenta + " " + izvestaj.prezimePacijenta;
      doc.text(red, x, y);
      y += 5;
      if (y >= pageHeight) { 
        doc.addPage();
        y = 5;
      }

      red = "Lekar: " + izvestaj.imeLekara + " " + izvestaj.prezimeLekara;
      doc.text(red, x, y);
      y += 5;
      if (y >= pageHeight) { 
        doc.addPage();
        y = 5;
      }

      red = "Specijalizacija lekara: " + izvestaj.specijalizacija;
      doc.text(red, x, y);
      y += 5;
      if (y >= pageHeight) { 
        doc.addPage();
        y = 5;
      }

      red = "Vrsta pregleda: " + izvestaj.naziv;
      doc.text(red, x, y);
      y += 5;
      if (y >= pageHeight) { 
        doc.addPage();
        y = 5;
      }

      var vreme = new Date(izvestaj.vreme);
      red = "Datum i vreme pregleda: " + vreme.toLocaleString();
      doc.text(red, x, y);
      y += 5;
      if (y >= pageHeight) { 
        doc.addPage();
        y = 5;
      }

      red = "Razlog dolaska: " + izvestaj.razlog_dolaska;
      doc.text(red, x, y);
      y += 5;
      if (y >= pageHeight) { 
        doc.addPage();
        y = 5;
      }

      red = "Dijagnoza: " + izvestaj.dijagnoza;
      doc.text(red, x, y);
      y += 5;
      if (y >= pageHeight) { 
        doc.addPage();
        y = 5;
      }

      red = "Preporučena terapija: " + izvestaj.preporucena_terapija;
      doc.text(red, x, y);
      y += 5;
      if (y >= pageHeight) { 
        doc.addPage();
        y = 5;
      }

      vreme = new Date(izvestaj.datum_kontrole);
      red = "Preporučen datum kontrole: " + vreme.toLocaleDateString();
      doc.text(red, x, y);
      y += 20; // moze i vrednost 15, cak lepsa je za izvestaje
      if (y >= pageHeight) { // provera da li je y>=297
        doc.addPage();
        y = 20;
      }
    }

    doc.save("Izvestaj" + this.ulogovani_pacijent.ime + this.ulogovani_pacijent.prezime + ".pdf");

    var blob = doc.output('blob');
    var file = new File([blob], this.ulogovani_pacijent.ime + this.ulogovani_pacijent.prezime + '.pdf');

    this.izvestajService.savePDF(
      file,
      this.ulogovani_pacijent.email,
      this.ulogovani_pacijent.ime,
      this.ulogovani_pacijent.prezime
    ).subscribe((vraceni_string) => {
      if (vraceni_string) {
        alert("Pdf je dodat na server pod nazivom: " + vraceni_string+"\nNa mejl vam je poslat qr kod i link do izveštaja.")

      }
      else {
        console.log("Greska")
      }
    })
  }
}
