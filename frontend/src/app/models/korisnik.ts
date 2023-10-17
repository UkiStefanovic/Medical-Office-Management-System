import Obavestenje from "./obavestenje";
import VrstaPregleda from "./vrstaPregleda";

export default class Korisnik {
    korisnicko_ime: string;
    lozinka: string;
    ime: string;
    prezime: string;
    tip: string;
    adresa: string;
    kontakt_telefon: string;
    email: string;
    profilna: string;

    stanje_registracije: string;

    broj_lekarske_licence:Number = 0;
    specijalizacija:string = "";
    ogranak:string = "";
    vrste_pregleda:string[]=[];

    obavestenja: Obavestenje[];
}