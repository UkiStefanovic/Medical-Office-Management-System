import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    korisnicko_ime: { type: String, required: true },
    lozinka: { type: String, required: true },
    ime: { type: String, required: true },
    prezime: { type: String, required: true },
    tip: { type: String, required: true },
    adresa: { type: String, required: true },
    kontakt_telefon: { type: String, required: true },
    email: { type: String, required: true },
    profilna: { type: String, required: true },

    // prvobitno sam imao ideju da cuvam 2 flag-a za cuvanje stanja registracije
    // ali pametnije je cuvati jedan string koji ima 3 moguce vrednosti
    // 'CEKANJE', 'PRIHVACENO', 'ODBIJENO'
    stanje_registracije:{type:String, required:true},

    //registrovan_flag: { type: Boolean, required: true },
    //obradjena_registracija_flag: { type: Boolean, required: true },
    // Ideja sa flag-ovima:
    // prilikom slanja registracije, u pocetku je za korisnika:
    // 1. flag: false, 2. flag: false
    // ukoliko se registracija prihvati:
    // 1. flag: true, 2. flag: true
    // ukoliko je odbijena registracija:
    // 1. flag: false, 2. flag: true

    broj_lekarske_licence: { type: Number },
    specijalizacija: { type: String },
    ogranak: { type: String },
    vrste_pregleda:{type: [String]},

    obavestenja:{type: Array}
})

export default mongoose.model('KorisnikModel', Korisnik, 'korisnici');