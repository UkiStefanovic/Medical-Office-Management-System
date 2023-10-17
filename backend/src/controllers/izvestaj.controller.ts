import * as express from 'express';
import IzvestajModel from '../models/izvestaj'

const fs = require('fs');

export class IzvestajController {

    dodajIzvestaj = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;
        let imePacijenta = req.body.imePacijenta;
        let prezimePacijenta = req.body.prezimePacijenta;

        let lekar = req.body.lekar;
        let imeLekara = req.body.imeLekara;
        let prezimeLekara = req.body.prezimeLekara;

        let vreme = req.body.vreme;
        let datum_kontrole = req.body.datum_kontrole;

        let specijalizacija = req.body.specijalizacija;
        let razlog_dolaska = req.body.razlog_dolaska;
        let dijagnoza = req.body.dijagnoza;
        let preporucena_terapija = req.body.preporucena_terapija;

        IzvestajModel.create(
            {
                'pacijent': pacijent,
                'imePacijenta': imePacijenta,
                'prezimePacijenta': prezimePacijenta,
                'lekar': lekar,
                'imeLekara': imeLekara,
                'prezimeLekara': prezimeLekara,
                'vreme': vreme,
                'datum_kontrole': datum_kontrole,
                'specijalizacija': specijalizacija,
                'razlog_dolaska': razlog_dolaska,
                'dijagnoza': dijagnoza,
                'preporucena_terapija': preporucena_terapija
            },
            (err, resp) => {
                if (err) console.log(err);
                else res.json({ 'message': 'Uspešno dodat izvestaj za pregled.' })
            }
        )
    }

    dohvatiIzvestajePacijenta = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;
        // console.log(pacijent);
        IzvestajModel.find({ 'pacijent': pacijent }, (err, izvestaji) => {
            if (err) console.log(err);
            else res.json(izvestaji);
        })
    }

    savePDF = (req: express.Request, res: express.Response) => {
        let file = req.body.file; 
        let email = req.body.email;
        let ime = req.body.ime;
        let prezime = req.body.prezime;

        let pdf_url = "http://localhost:4000/pdfs/" + file; // pdf se nalazi na pdf_url
        let qr_code_filename = ime+prezime+'QRcode.png';
        let qr_code_url = "http://localhost:4000/qrcodes/"+qr_code_filename;

        // Generisanje QR koda
        const QRCode = require('qrcode');
        QRCode.toFile('./src/qrcodes/'+qr_code_filename, pdf_url, {
            errorCorrectionLevel: 'H'
        }, function (err) {
            if (err) throw err;
            // console.log('QR code saved!');
        });

        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "uros.stefanovic001@gmail.com",
                pass: "vros vvaz waca cvmm"
            }
        });

        const mailOptions = {
            from: "uros.stefanovic001@gmail.com",
            to: email,
            subject: "(PIA PROJEKAT) Eksportovali ste izveštaje",
            text: "Poštovani " + ime + " " + prezime + ",\nVaši izveštaji su uspešno eksportovani u pdf. Možete ih videti na veb stranici: " + pdf_url + "\nili skeniranjem QR koda u prilogu:",
            attachments:[
                {
                    filename: 'qrcode.png',
                    path: encodeURI(qr_code_url),
                    cid: 'myImg'
                }
            ]
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                // console.log("Email sent: " + info.response);
            }
        });

        res.json(file);
    }


}