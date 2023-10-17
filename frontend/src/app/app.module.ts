import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NeregistrovanKorisnikComponent } from './neregistrovan-korisnik/neregistrovan-korisnik.component';
import { LoginComponent } from './login/login.component';
import { RegistracijaPacijentaComponent } from './registracija-pacijenta/registracija-pacijenta.component';
import { LoginMenadzerComponent } from './login-menadzer/login-menadzer.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { MenadzerDodavanjeLekaraComponent } from './menadzer-dodavanje-lekara/menadzer-dodavanje-lekara.component';
import { MenadzerZahteviVrstePregledaComponent } from './menadzer-zahtevi-vrste-pregleda/menadzer-zahtevi-vrste-pregleda.component';
import { MenadzerDodavanjeSpecijalizacijeComponent } from './menadzer-dodavanje-specijalizacije/menadzer-dodavanje-specijalizacije.component';
import { MenadzerPreglediJedneSpecijalizacijeComponent } from './menadzer-pregledi-jedne-specijalizacije/menadzer-pregledi-jedne-specijalizacije.component';
import { MenadzerNovaPromocijaComponent } from './menadzer-nova-promocija/menadzer-nova-promocija.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { LekarPreglediComponent } from './lekar-pregledi/lekar-pregledi.component';
import { LekarRaznoComponent } from './lekar-razno/lekar-razno.component';
import { PacijentLekariComponent } from './pacijent-lekari/pacijent-lekari.component';
import { PacijentPreglediComponent } from './pacijent-pregledi/pacijent-pregledi.component';
import { PacijentObavestenjaComponent } from './pacijent-obavestenja/pacijent-obavestenja.component';
import { PacijentProfilLekaraComponent } from './pacijent-profil-lekara/pacijent-profil-lekara.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PacijentGuardService } from './services/guards/pacijent-guard.service';
import { LekarGuardService } from './services/guards/lekar-guard.service';
import { NeregistrovanGuardService } from './services/guards/neregistrovan-guard.service';
import { MenadzerGuardService } from './services/guards/menadzer-guard.service';
import { RegistrovanGuardService } from './services/guards/registrovan-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NeregistrovanKorisnikComponent,
    LoginComponent,
    RegistracijaPacijentaComponent,
    LoginMenadzerComponent,
    MenadzerComponent,
    MenadzerDodavanjeLekaraComponent,
    MenadzerZahteviVrstePregledaComponent,
    MenadzerDodavanjeSpecijalizacijeComponent,
    MenadzerPreglediJedneSpecijalizacijeComponent,
    MenadzerNovaPromocijaComponent,
    PromenaLozinkeComponent,
    LekarComponent,
    PacijentComponent,
    LekarPreglediComponent,
    LekarRaznoComponent,
    PacijentLekariComponent,
    PacijentPreglediComponent,
    PacijentObavestenjaComponent,
    PacijentProfilLekaraComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PacijentGuardService, LekarGuardService, NeregistrovanGuardService, MenadzerGuardService, RegistrovanGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
