import * as express from 'express';
import ZahtevNovaVrstaPregledaModel from '../models/zahtevNovaVrstaPregleda'
import VrstaPregledaModel from '../models/vrstaPregleda'

export class ZahtevNovaVrstaPregledaController {
    dodaj = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let trajanje = req.body.trajanje;
        let cena = req.body.cena;
        let specijalizacija = req.body.specijalizacija;
        let ime_lekara = req.body.ime_lekara;
        let prezime_lekara = req.body.prezime_lekara;
        ZahtevNovaVrstaPregledaModel.create({
            'naziv': naziv,
            'trajanje': trajanje,
            'cena': cena,
            'specijalizacija': specijalizacija,
            'ime_lekara': ime_lekara,
            'prezime_lekara': prezime_lekara
        },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Zahtev je poslat menadžeru.' })
            }
        )
    }

    dohvatiSve = (req: express.Request, res: express.Response) => {
        ZahtevNovaVrstaPregledaModel.find({}, (err, vraceni_zahtevi) => {
            if (err) console.log(err);
            else res.json(vraceni_zahtevi)
        })
    }

    prihvati = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let trajanje = req.body.trajanje;
        let cena = req.body.cena;
        let specijalizacija = req.body.specijalizacija;
        VrstaPregledaModel.create(
            {
                'naziv': naziv,
                'trajanje': trajanje,
                'cena': cena,
                'specijalizacija': specijalizacija
            },
            (err, resp) => { }
        )
        ZahtevNovaVrstaPregledaModel.deleteOne(
            {
                'naziv': naziv,
                'trajanje': trajanje,
                'cena': cena,
                'specijalizacija': specijalizacija
            },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Prihvaćena je vrsta pregleda.' })
            }
        )
    }

    odbij = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let trajanje = req.body.trajanje;
        let cena = req.body.cena;
        let specijalizacija = req.body.specijalizacija;
        ZahtevNovaVrstaPregledaModel.deleteOne(
            {
                'naziv': naziv,
                'trajanje': trajanje,
                'cena': cena,
                'specijalizacija': specijalizacija
            },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Odbijena je vrsta pregleda.' })
            }
        )
    }
}