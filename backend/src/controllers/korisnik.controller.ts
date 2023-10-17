import * as express from 'express';
import KorisnikModel from '../models/korisnik'

const fs = require('fs');

export class KorisnikController {
    login = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;

        KorisnikModel.findOne({
            'korisnicko_ime': korisnicko_ime,
            'lozinka': lozinka,
            $or: [{ 'tip': 'lekar' }, { $and: [{ 'tip': 'pacijent' }, { 'stanje_registracije': 'PRIHVACENO' }] }]
        },
            (err, vracen_korisnik) => {
                if (err) console.log(err);
                else res.json(vracen_korisnik)
            })
    }

    loginMenadzer = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;

        KorisnikModel.findOne({ 'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka, 'tip': 'menadzer' }, (err, vracen_korisnik) => {
            if (err) console.log(err);
            else res.json(vracen_korisnik)
        })
    }

    // Funkcija ce se koristiti za proveru da li su email i korisnicko ime zauzeti
    // pa ce dohvatati one korisnike koji imaju stanje registracije: 'PRIHVACENO' ili 'ODBIJENO'
    dohvatiSveKorisnike = (req: express.Request, res: express.Response) => {
        KorisnikModel.find({ $or: [{ 'stanje_registracije': 'PRIHVACENO' }, { 'stanje_registracije': 'ODBIJENO' }] }, (err, svi_korisnici) => {
            if (err) console.log(err);
            else res.json(svi_korisnici)
        })
    }

    dohvatiSveLekare = (req: express.Request, res: express.Response) => {
        KorisnikModel.find({ 'tip': 'lekar' }, (err, lekari) => {
            if (err) console.log(err);
            else res.json(lekari)
        })
    }

    dohvatiSvePacijente = (req: express.Request, res: express.Response) => {
        KorisnikModel.find({ 'tip': 'pacijent', 'stanje_registracije': 'PRIHVACENO' }, (err, lekari) => {
            if (err) console.log(err);
            else res.json(lekari)
        })
    }

    // Metoda ce da ubaci pacijenta u bazu podataka, ali menadzer zatim treba da prihvati zahtev za registraciju
    registrujPacijenta = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let tip = 'pacijent';
        let adresa = req.body.adresa;
        let kontakt_telefon = req.body.kontakt_telefon;
        let email = req.body.email;
        let profilna = req.body.file; // ovo predstavlja ime fajla koji se upload-ovao
        if (profilna == undefined) {
            profilna = 'podrazumevana_profilna_slika.png';
        }

        let stanje_registracije = 'CEKANJE';

        KorisnikModel.create({
            'korisnicko_ime': korisnicko_ime,
            'lozinka': lozinka,
            'ime': ime,
            'prezime': prezime,
            'tip': tip,
            'adresa': adresa,
            'kontakt_telefon': kontakt_telefon,
            'email': email,
            'profilna': profilna,
            'stanje_registracije': stanje_registracije
        },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Poslat je zahtev za registraciju' })
            })
    }

    registrujLekara = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let tip = 'lekar';
        let adresa = req.body.adresa;
        let kontakt_telefon = req.body.kontakt_telefon;
        let email = req.body.email;
        let profilna = req.body.file; // ovo predstavlja ime fajla koji se upload-ovao
        if (profilna == undefined) {
            profilna = 'podrazumevana_profilna_slika.png';
        }
        
        let stanje_registracije = 'PRIHVACENO';

        let broj_lekarske_licence = req.body.broj_lekarske_licence;
        let specijalizacija = req.body.specijalizacija;
        let ogranak = req.body.ogranak;


        KorisnikModel.create({
            'korisnicko_ime': korisnicko_ime,
            'lozinka': lozinka,
            'ime': ime,
            'prezime': prezime,
            'tip': tip,
            'adresa': adresa,
            'kontakt_telefon': kontakt_telefon,
            'email': email,
            'profilna': profilna,
            'stanje_registracije': stanje_registracije,
            'broj_lekarske_licence': broj_lekarske_licence,
            'specijalizacija': specijalizacija,
            'ogranak': ogranak

        },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Lekar je registrovan.' })
            })
    }

    // metoda je napravljena sa pretpostavkom da korisnik sa prenetim kor_imenom postoji u bazi
    dohvatiKorisnika = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        KorisnikModel.findOne({ 'korisnicko_ime': korisnicko_ime }, (err, vraceni_korisnik) => {
            if (err) console.log(err);
            else res.json(vraceni_korisnik)
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let nova_lozinka = req.body.nova_lozinka;
        KorisnikModel.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { 'lozinka': nova_lozinka } }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'Lozinka je uspešno promenjena' })
        })
    }

    dohvatiPacijenteNaCekanju = (req: express.Request, res: express.Response) => {
        KorisnikModel.find({ $and: [{ 'tip': 'pacijent' }, { 'stanje_registracije': 'CEKANJE' }] }, (err, pacijenti_na_cekanju) => {
            if (err) console.log(err);
            else res.json(pacijenti_na_cekanju)
        })
    }

    prihvati = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let email = req.body.email;
        let kontakt_telefon = req.body.kontakt_telefon;

        KorisnikModel.updateOne(
            { 'korisnicko_ime': korisnicko_ime, 'email': email, 'kontakt_telefon': kontakt_telefon, 'stanje_registracije': 'CEKANJE' },
            { $set: { 'stanje_registracije': 'PRIHVACENO' } },
            (err, resp) => { }
        )
        KorisnikModel.updateMany(
            // Pacijenti koji su na cekanju i koji imaju ili ovo kor_ime ili ovaj email se odbijaju
            {
                $or:
                    [{ 'korisnicko_ime': korisnicko_ime, 'tip': 'pacijent', 'stanje_registracije': 'CEKANJE' },
                    { 'email': email, 'tip': 'pacijent', 'stanje_registracije': 'CEKANJE' }]
            },
            { $set: { 'stanje_registracije': 'ODBIJENO' } },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Prihvacen pacijent.' })
            }
        )
    }

    odbij = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let email = req.body.email;
        let kontakt_telefon = req.body.kontakt_telefon;
        KorisnikModel.updateMany(
            // Pacijenti sa ovim kor_imenom ili email-om se odbijaju
            {
                $or:
                    [{ 'korisnicko_ime': korisnicko_ime, 'tip': 'pacijent', 'stanje_registracije': 'CEKANJE' },
                    { 'email': email, 'tip': 'pacijent', 'stanje_registracije': 'CEKANJE' }]
            },
            { $set: { 'stanje_registracije': 'ODBIJENO' } },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Odbijen pacijent.' })
            }
        )
    }

    dodajVrstuPregleda = (req: express.Request, res: express.Response) => {
        let naziv_vrste_pregleda = req.body.naziv_vrste_pregleda;
        let korisnicko_ime_lekara = req.body.korisnicko_ime_lekara;
        KorisnikModel.updateOne(
            { 'korisnicko_ime': korisnicko_ime_lekara, 'tip': 'lekar' },
            { $push: { 'vrste_pregleda': naziv_vrste_pregleda } },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Dodata vrsta pregleda.' })
            }
        )
    }

    ukloniVrstuPregleda = (req: express.Request, res: express.Response) => {
        let naziv_vrste_pregleda = req.body.naziv_vrste_pregleda;
        let korisnicko_ime_lekara = req.body.korisnicko_ime_lekara;
        KorisnikModel.updateOne(
            { 'korisnicko_ime': korisnicko_ime_lekara, 'tip': 'lekar' },
            { $pull: { 'vrste_pregleda': naziv_vrste_pregleda } },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Uklonjena vrsta pregleda.' })
            }
        )
    }

    dodajPromociju = (req: express.Request, res: express.Response) => {
        let tekst = req.body.tekst;
        let vreme = req.body.vreme;

        KorisnikModel.updateMany(
            { 'tip': 'pacijent', 'stanje_registracije': 'PRIHVACENO' },
            {
                $push: {
                    'obavestenja':
                    {
                        'tekst': tekst,
                        'vreme': vreme,
                        'procitano': false
                    }
                }
            },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Uspešno ste dodali novu promociju/akciju.' })
            }

        )
    }

    procitati = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;
        let tekst = req.body.tekst;
        let vreme = req.body.vreme;

        KorisnikModel.updateOne(
            {
                'korisnicko_ime': pacijent,
                'obavestenja.tekst': tekst,
                'obavestenja.vreme': vreme
            },
            {
                $set: { 'obavestenja.$.procitano': true }
            },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Pročitano obaveštenje.' })
            }
        )
    }

    zakazatiPregled = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;
        let tekst = req.body.tekst;
        let vreme = req.body.vreme;
        KorisnikModel.updateOne(
            {
                'korisnicko_ime': pacijent,
                'tip': 'pacijent',
                'stanje_registracije': 'PRIHVACENO'
            },
            {
                $push: {
                    'obavestenja':
                    {
                        'tekst': tekst,
                        'vreme': vreme,
                        'procitano': false
                    }
                }
            },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Uspešno ste zakazali pregled.' })
            }
        )
    }


    otkazatiPregled = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;
        let tekst = req.body.tekst;
        let vreme = req.body.vreme;
        KorisnikModel.updateOne(
            {
                'korisnicko_ime': pacijent,
                'tip': 'pacijent',
                'stanje_registracije': 'PRIHVACENO'
            },
            {
                $push: {
                    'obavestenja':
                    {
                        'tekst': tekst,
                        'vreme': vreme,
                        'procitano': false
                    }
                }
            },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Dodato obavestenje pacijentu o otkazivanju pregleda.' })
            }
        )
    }

    azurirajPacijenta = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let kontakt_telefon = req.body.kontakt_telefon;
        let email = req.body.email;
        let prethodna_profilna = req.body.prethodna_profilna; // ovaj podatak nam treba za brisanje slike/promenu slike
        let profilna = req.body.file; // ovo predstavlja ime fajla koji se upload-ovao

        // RAD SA PROFILNOM    
        if (profilna == undefined) {
            // ukoliko pacijent nije hteo da update-uje sliku, u http zahtevu je stavljeno profilna kao undefined
            profilna = prethodna_profilna;
        }
        else {
            // pacijent je prosledio novu profilnu sliku
            // treba da prethodnu obrisemo, a novu cemo staviti u bazu
            const filePath = 'src/uploads/' + prethodna_profilna; // ovo je dobar destination string
            //console.log(filePath);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            else {
                console.log("File not found at: " + filePath);
            }

        }

        // UPDATE
        KorisnikModel.updateOne(
            { 'korisnicko_ime': korisnicko_ime, 'tip': 'pacijent', 'stanje_registracije': 'PRIHVACENO' },
            {
                $set: {
                    'ime': ime,
                    'prezime': prezime,
                    'adresa': adresa,
                    'kontakt_telefon': kontakt_telefon,
                    'email': email,
                    'profilna': profilna
                }
            },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Profil je ažuriran.' })
            }
        )
    }

    azurirajLekara = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let kontakt_telefon = req.body.kontakt_telefon;
        let broj_lekarske_licence = req.body.broj_lekarske_licence;
        let specijalizacija = req.body.specijalizacija;
        let prethodna_profilna = req.body.prethodna_profilna; // ovaj podatak nam treba za brisanje slike/promenu slike
        let profilna = req.body.file; // ovo predstavlja ime fajla koji se upload-ovao

        // RAD SA PROFILNOM    
        if (profilna == undefined) {
            // ukoliko pacijent nije hteo da update-uje sliku, u http zahtevu je stavljeno profilna kao undefined
            profilna = prethodna_profilna;
        }
        else {
            // pacijent je prosledio novu profilnu sliku
            // treba da prethodnu obrisemo, a novu cemo staviti u bazu
            const filePath = 'src/uploads/' + prethodna_profilna; // ovo je dobar destination string
            //console.log(filePath);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            else {
                console.log("File not found at: " + filePath);
            }

        }

        // UPDATE
        KorisnikModel.updateOne(
            { 'korisnicko_ime': korisnicko_ime, 'tip': 'lekar', 'stanje_registracije': 'PRIHVACENO' },
            {
                $set: {
                    'ime': ime,
                    'prezime': prezime,
                    'adresa': adresa,
                    'kontakt_telefon': kontakt_telefon,
                    'broj_lekarske_licence': broj_lekarske_licence,
                    'specijalizacija': specijalizacija,
                    'profilna': profilna
                }
            },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Profil je ažuriran.' })
            }
        )
    }

    obrisiPacijenta = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let email = req.body.email;
        let kontakt_telefon = req.body.kontakt_telefon;
        let profilna = req.body.profilna;

        //brisanje profilne
        if(profilna!='podrazumevana_profilna_slika.png'){
            const filePath = 'src/uploads/' + profilna; // ovo je dobar destination string
            //console.log(filePath);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            else {
                console.log("File not found at: " + filePath);
            }
        }

        KorisnikModel.deleteOne({
            'korisnicko_ime': korisnicko_ime,
            'tip': 'pacijent',
            'stanje_registracije': 'PRIHVACENO',
            'email': email,
            'kontakt_telefon': kontakt_telefon
        },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Pacijent je obrisan.' })
            }

        )
    }

    obrisiLekara = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let email = req.body.email;
        let kontakt_telefon = req.body.kontakt_telefon;
        let profilna = req.body.profilna;

        //brisanje profilne
        if(profilna!='podrazumevana_profilna_slika.png'){
            const filePath = 'src/uploads/' + profilna; // ovo je dobar destination string
            //console.log(filePath);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            else {
                console.log("File not found at: " + filePath);
            }
        }
        
        KorisnikModel.deleteOne({
            'korisnicko_ime': korisnicko_ime,
            'tip': 'lekar',
            'stanje_registracije': 'PRIHVACENO',
            'email': email,
            'kontakt_telefon': kontakt_telefon
        },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Lekar je obrisan.' })
            }

        )
    }


    posaljiObavestenje = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;
        let tekst = req.body.tekst;
        let vreme = req.body.vreme;
        KorisnikModel.updateOne(
            {
                'korisnicko_ime': pacijent,
                'tip': 'pacijent',
                'stanje_registracije': 'PRIHVACENO'
            },
            {
                $push: {
                    'obavestenja':
                    {
                        'tekst': tekst,
                        'vreme': vreme,
                        'procitano': false
                    }
                }
            },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Dodato obavestenje pacijentu o promeni cene pregleda.' })
            }
        )
    }
} 