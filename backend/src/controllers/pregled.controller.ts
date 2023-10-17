import * as express from 'express';
import PregledModel from '../models/pregled'

export class PregledController {
    zakazati = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;
        let imePacijenta = req.body.imePacijenta;
        let prezimePacijenta = req.body.prezimePacijenta;

        let lekar = req.body.lekar;
        let imeLekara = req.body.imeLekara;
        let prezimeLekara = req.body.prezimeLekara;

        let naziv = req.body.naziv;
        let specijalizacija = req.body.specijalizacija;
        let trajanje = req.body.trajanje;
        let cena = req.body.cena;

        let ogranak = req.body.ogranak;

        let vreme_sa_front = req.body.vreme;
        var vreme = new Date(vreme_sa_front);


        // Ukoliko je lekar dostupan u tom periodu, moze se zakazati
        PregledModel.create(
            {
                'pacijent': pacijent,
                'imePacijenta': imePacijenta,
                'prezimePacijenta': prezimePacijenta,
                'lekar': lekar,
                'imeLekara': imeLekara,
                'prezimeLekara': prezimeLekara,
                'vreme': vreme,
                'naziv': naziv,
                'specijalizacija': specijalizacija,
                'trajanje': trajanje,
                'cena': cena,
                'ogranak': ogranak
            },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Uspešno ste zakazali pregled.' })
            }
        )
    }

    dohvatiPregledePacijenta = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;

        PregledModel.find({ 'pacijent': pacijent }, (err, pregledi) => {
            if (err) console.log(err);
            else res.json(pregledi)
        })
    }

    otkazatiPregled = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;
        let lekar = req.body.lekar;
        let naziv = req.body.naziv;
        let ogranak = req.body.ogranak;
        let vreme_sa_front = req.body.vreme;
        var vreme = new Date(vreme_sa_front);

        PregledModel.deleteOne({
            'pacijent': pacijent,
            'lekar': lekar,
            'naziv': naziv,
            'ogranak': ogranak,
            'vreme': vreme
        },
            (err, resp) => {
                if (err) console.log(err);
                else res.send({ 'message': 'Pregled je otkazan' })
            }
        )
    }

    dohvatiPregledeLekara = (req: express.Request, res: express.Response) => {
        let lekar = req.body.lekar;

        PregledModel.find({ 'lekar': lekar }, (err, pregledi) => {
            if (err) console.log(err);
            else res.json(pregledi)
        })
    }

    dohvatiPregledeVrste = (req: express.Request, res: express.Response) => {
        let specijalizacija = req.body.specijalizacija;
        let naziv = req.body.naziv;

        PregledModel.find(
            {
                'naziv': naziv,
                'specijalizacija': specijalizacija,
                'vreme': { $gte: new Date() }
            },
            (err, pregledi) => {
                if (err) console.log(err);
                else res.json(pregledi)
            }
        )
    }

    azurirajPregled = (req: express.Request, res: express.Response) => {
        let _id = req.body._id;
        let novo_trajanje = req.body.novo_trajanje;
        let nova_cena = req.body.nova_cena;

        PregledModel.updateOne(
            {_id:_id},
            {$set:{'trajanje':novo_trajanje, 'cena':nova_cena}},
            (err, resp) => {
                if (err) console.log(err);
                // else res.send({ 'message': 'Pregled je otkazan' })
            }
        )
    }



}