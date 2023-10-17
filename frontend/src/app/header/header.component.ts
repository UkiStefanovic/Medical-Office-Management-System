import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  tip_korisnika: string = null;

  ngOnInit(): void {
    this.tip_korisnika = localStorage.getItem('tip_korisnika');
  }

  izloguj() {
    localStorage.clear();
  }

  tipKorisnika(): string {
    this.ngOnInit();
    return this.tip_korisnika;
  }

}
