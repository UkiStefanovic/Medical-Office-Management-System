import { Component, OnInit } from '@angular/core';
import Obavestenje from '../models/obavestenje';
import { ObavestenjeService } from '../services/obavestenje.service';
import Korisnik from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-pacijent-obavestenja',
  templateUrl: './pacijent-obavestenja.component.html',
  styleUrls: ['./pacijent-obavestenja.component.css']
})
export class PacijentObavestenjaComponent implements OnInit {

  constructor(
    //private obavestenjeService: ObavestenjeService,
    private korisnikService: KorisnikService
  ) { }

  ulogovan_pacijent: Korisnik;
  obavestenja: Obavestenje[] = [];

  ngOnInit(): void {
    var korisnicko_ime = localStorage.getItem('ulogovan_korisnik');
    this.korisnikService.dohvatiKorisnika(korisnicko_ime).subscribe((vracen_korisnik: Korisnik) => {
      this.ulogovan_pacijent = vracen_korisnik; // dohvacen ulogovan pacijent

      this.obavestenja = [];

      // FITRIRANJE obavestenja (uklanjanje buducih)
      var trenutno_vreme = new Date();
      for(var i=0;i<this.ulogovan_pacijent.obavestenja.length;i++){
        var vreme = new Date(this.ulogovan_pacijent.obavestenja[i].vreme)
        if(vreme<=trenutno_vreme){
          this.obavestenja.push(this.ulogovan_pacijent.obavestenja[i]);
        }
      }

      //sortiramo opadajuce
      //sortiranje pregleda od najskorijeg do najkasnijeg (rastuce)
      this.obavestenja = this.obavestenja.sort((a, b) => {
        if (a.vreme > b.vreme) {
          return -1;
        }
        else if (a.vreme < b.vreme) {
          return 1;
        }
        else return 0;
      })

    })
  }

  procitati(obavestenje: Obavestenje) {
    this.korisnikService.procitati(obavestenje, this.ulogovan_pacijent).subscribe((resp) => {
      location.reload();
    })
  }








}
