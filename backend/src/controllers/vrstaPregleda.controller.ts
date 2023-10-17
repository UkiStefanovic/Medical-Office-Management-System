import * as express from 'express';
import VrstaPregledaModel from '../models/vrstaPregleda'
import PregledModel from '../models/pregled'
import KorisnikModel from '../models/korisnik'
import { ObjectId } from 'mongodb';

export class VrstaPregledaController {
    dohvatiVrstePregleda = (req: express.Request, res: express.Response) => {
        let specijalizacija = req.body.specijalizacija;
        VrstaPregledaModel.find({ 'specijalizacija': specijalizacija }, (err, vracene_vrste_pregleda) => {
            if (err) console.log(err);
            else res.json(vracene_vrste_pregleda)
        })
    }

    azurirati = (req: express.Request, res: express.Response) => {
        let prethodni_naziv = req.body.prethodni_naziv;
        let specijalizacija = req.body.specijalizacija;

        let novo_trajanje = req.body.novo_trajanje;
        let nova_cena = req.body.nova_cena;

        let promena_cene = req.body.promena_cene;

        // Potrebno je uraditi sledece:
        //1. promeniti u bazi za vrstu pregleda podatke
        //2. promeniti u bazi za sve zakazane preglede ove vrste 
        //3. poslati obavestenja pacijentima na ovim pregledima

        // korak 1
        VrstaPregledaModel.updateOne(
            { 'naziv': prethodni_naziv, 'specijalizacija': specijalizacija },
            { $set: { 'trajanje': novo_trajanje, 'cena': nova_cena } },
            (err, resp) => {
                if (err) console.log(err);
                else res.send({ 'message': 'Vrsta pregleda je azurirana.' })
            }
        )

        // korak 2
        // pokusajmo da dohvatimo sve preglede takve da je specijalizacija i naziv jednake proslednjenim gore
        // ali takve da su u buducnosti
        // PregledModel.find(
        //     {
        //         'specijalizacija': specijalizacija,
        //         'naziv': prethodni_naziv,
        //         'vreme': { $gte: new Date() }
        //     },
        //     (err, pregledi) => {
        //         if (err) console.log(err);
        //         else {
        //             console.log(pregledi);
        //             // sve ove dohvacene preglede treba da azuriramo i da pacijentima posaljemo obavestenje
        //             for(var i =0;i<pregledi.length;i++){
        //                 PregledModel.updateOne(
        //                     {
        //                         '_id':new ObjectId(pregledi[i]._id)
        //                     },
        //                     {
        //                         $set: { 'trajanje': novo_trajanje, 'cena': nova_cena }
        //                     },
        //                     (err, resp)=>{
        //                         // korak 3: poslati pacijentu obavestenje
        //                         var pacijent = pregledi[i].pacijent;
        //                         var tekst_obavestenja = "Otkazan vam je pregled";
        //                         KorisnikModel.updateOne(
        //                             {
        //                                 'korisnicko_ime': pacijent,
        //                                 'tip': 'pacijent',
        //                                 'stanje_registracije': 'PRIHVACENO'
        //                             },
        //                             {
        //                                 $push: {
        //                                     'obavestenja':
        //                                     {
        //                                         'tekst': tekst_obavestenja,
        //                                         'vreme': new Date(),
        //                                         'procitano': false
        //                                     }
        //                                 }
        //                             },
        //                             (err, resp) => {
        //                                 if (err) console.log(err);
        //                             }
        //                         )
        //                     }
        //                 )
        //             }



        //             res.send({ 'message': 'Vrsta pregleda je azurirana.' })
        //         }

        //     }
        // )




    }

    obrisati = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let specijalizacija = req.body.specijalizacija;
        VrstaPregledaModel.deleteOne({ 'naziv': naziv, 'specijalizacija': specijalizacija }, (err, resp) => {
            if (err) console.log(err);
            else res.send({ 'message': 'Vrsta pregleda je izbrisana' })
        })
    }

    dodaj = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let trajanje = req.body.trajanje;
        let cena = req.body.cena;
        let specijalizacija = req.body.specijalizacija;
        VrstaPregledaModel.create({
            'naziv': naziv,
            'trajanje': trajanje,
            'cena': cena,
            'specijalizacija': specijalizacija
        },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Vrsta pregleda je dodata.' })
            })
    }
}