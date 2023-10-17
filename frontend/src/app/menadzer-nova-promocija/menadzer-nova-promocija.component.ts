import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObavestenjeService } from '../services/obavestenje.service';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-menadzer-nova-promocija',
  templateUrl: './menadzer-nova-promocija.component.html',
  styleUrls: ['./menadzer-nova-promocija.component.css']
})
export class MenadzerNovaPromocijaComponent implements OnInit {

  constructor(
    private router: Router,
    //private obavestenjeService: ObavestenjeService
    private korisnikService: KorisnikService
  ) { }

  tekst:string;
  error_message:string="";

  ngOnInit(): void {
  }

  dodajPromociju(){
    if(this.tekst==""){
      this.error_message="Niste nista uneli.";
      return;
    }
    this.error_message="";
    let vreme = new Date();
    this.korisnikService.dodajPromociju(this.tekst, vreme).subscribe((resp)=>{
      alert(resp['message']);
      location.reload();
    })
  }

  povratak() {
    this.router.navigate(['menadzer']);
  }
  izloguj() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
