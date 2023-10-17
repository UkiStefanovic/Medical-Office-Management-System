import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeregistrovanKorisnikComponent } from './neregistrovan-korisnik/neregistrovan-korisnik.component';
import { LoginComponent } from './login/login.component';
import { LoginMenadzerComponent } from './login-menadzer/login-menadzer.component';
import { RegistracijaPacijentaComponent } from './registracija-pacijenta/registracija-pacijenta.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { MenadzerDodavanjeLekaraComponent } from './menadzer-dodavanje-lekara/menadzer-dodavanje-lekara.component';
import { MenadzerZahteviVrstePregledaComponent } from './menadzer-zahtevi-vrste-pregleda/menadzer-zahtevi-vrste-pregleda.component';
import { MenadzerDodavanjeSpecijalizacijeComponent } from './menadzer-dodavanje-specijalizacije/menadzer-dodavanje-specijalizacije.component';
import { MenadzerPreglediJedneSpecijalizacijeComponent } from './menadzer-pregledi-jedne-specijalizacije/menadzer-pregledi-jedne-specijalizacije.component';
import { MenadzerNovaPromocijaComponent } from './menadzer-nova-promocija/menadzer-nova-promocija.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { LekarComponent } from './lekar/lekar.component';
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

const routes: Routes = [
  { path: '', component: NeregistrovanKorisnikComponent, canActivate:[NeregistrovanGuardService] },
  { path: 'login', component: LoginComponent, canActivate:[NeregistrovanGuardService] },
  { path: 'loginMenadzer', component: LoginMenadzerComponent, canActivate:[NeregistrovanGuardService] },
  { path: 'registracijaPacijenta', component: RegistracijaPacijentaComponent, canActivate:[NeregistrovanGuardService] },
  { path: 'promenaLozinke', component: PromenaLozinkeComponent, canActivate:[RegistrovanGuardService] },

  { path: 'menadzer', component: MenadzerComponent, canActivate:[MenadzerGuardService] },
  { path: 'menadzer/dodajLekara', component: MenadzerDodavanjeLekaraComponent, canActivate:[MenadzerGuardService] },
  { path: 'menadzer/zahteviVrstePregleda', component: MenadzerZahteviVrstePregledaComponent, canActivate:[MenadzerGuardService] },
  { path: 'menadzer/dodajSpecijalizaciju', component: MenadzerDodavanjeSpecijalizacijeComponent, canActivate:[MenadzerGuardService] },
  { path: 'menadzer/preglediJedneSpecijalizacije', component: MenadzerPreglediJedneSpecijalizacijeComponent, canActivate:[MenadzerGuardService] },
  { path: 'menadzer/novaPromocija', component: MenadzerNovaPromocijaComponent, canActivate:[MenadzerGuardService] },

  { path: 'pacijent', component: PacijentComponent, canActivate:[PacijentGuardService] },
  { path: 'pacijent/lekari', component: PacijentLekariComponent, canActivate:[PacijentGuardService] },
  { path: 'pacijent/profilLekara', component: PacijentProfilLekaraComponent, canActivate:[PacijentGuardService] },
  { path: 'pacijent/pregledi', component: PacijentPreglediComponent, canActivate:[PacijentGuardService] },
  { path: 'pacijent/obavestenja', component: PacijentObavestenjaComponent, canActivate:[PacijentGuardService] },


  { path: 'lekar', component: LekarComponent, canActivate:[LekarGuardService] },
  { path: 'lekar/pregledi', component: LekarPreglediComponent, canActivate:[LekarGuardService] },
  { path: 'lekar/razno', component: LekarRaznoComponent, canActivate:[LekarGuardService] },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
