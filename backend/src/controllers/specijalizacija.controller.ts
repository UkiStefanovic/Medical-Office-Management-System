import * as express from 'express';
import SpecijalizacijaModel from '../models/specijalizacija'

export class SpecijalizacijaController{
    dohvatiSve = (req: express.Request, res: express.Response)=>{
        SpecijalizacijaModel.find({}, (err, specijalizacije)=>{
            if(err) console.log(err);
            else res.json(specijalizacije)
        })
    }

    dodaj = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv_specijalizacije;

        SpecijalizacijaModel.create({naziv: naziv}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'Dodata specijalizacija'})
        })   
    }

} 