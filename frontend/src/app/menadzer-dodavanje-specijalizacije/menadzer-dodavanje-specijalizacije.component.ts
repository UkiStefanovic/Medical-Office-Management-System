import { Component, OnInit } from '@angular/core';
import { SpecijalizacijaService } from '../services/specijalizacija.service';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import Specijalizacija from '../models/specijalizacija';

@Component({
  selector: 'app-menadzer-dodavanje-specijalizacije',
  templateUrl: './menadzer-dodavanje-specijalizacije.component.html',
  styleUrls: ['./menadzer-dodavanje-specijalizacije.component.css']
})
export class MenadzerDodavanjeSpecijalizacijeComponent implements OnInit {

  constructor(
    private specijalizacijaService: SpecijalizacijaService,
    private _location: Location,
    private router: Router
  ) { }

  naziv_specijalizacije: string;
  error_message: string = "";

  ngOnInit(): void {
  }

  dodajSpecijalizaciju() {
    if (this.naziv_specijalizacije == "" || this.naziv_specijalizacije==null) {
      this.error_message = "Niste uneli naziv.";
      return;
    }
    // provera da li ova specijalizacija vec postoji
    var jedinstvena=true;
    this.specijalizacijaService.dohvatiSve().subscribe((sve:Specijalizacija[])=>{
      for(var i =0;i<sve.length;i++){
        if(sve[i].naziv==this.naziv_specijalizacije){
          jedinstvena=false;
          break;
        }
      }

      if(!jedinstvena){
        this.error_message="Ova specijalizacija vec postoji.";
        return;
      }
      this.error_message = "";
      this.specijalizacijaService.dodajSpecijalizaciju(this.naziv_specijalizacije).subscribe((resp) => {
        console.log("dodato")
        alert(resp['message'])
        location.reload();
      })
    })
  }

  povratak() {
    this._location.back();
  }
  izloguj() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
