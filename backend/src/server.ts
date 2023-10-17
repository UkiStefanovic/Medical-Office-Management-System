import express, { Router } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import korisnikRouter from './routes/korisnik.routes'
import specijalizacijaRouter from './routes/specijalizacija.routes';
import vrstaPregledaRouter from './routes/vrstaPregleda.routes';
import zahtevNovaVrstaPregledaRouter from './routes/zahtevNovaVrstaPregleda.routes';
import pregledRouter from './routes/pregled.routes';
import izvestajRouter from './routes/izvestaj.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Konekcija sa bazom
mongoose.connect('mongodb://127.0.0.1:27017/PIA_projekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('Connected to MongoDB')
})

// Router opcije
const router = Router()
app.use('/', router)
router.use('/korisnik', korisnikRouter)
router.use('/specijalizacija', specijalizacijaRouter)
router.use('/vrstaPregleda', vrstaPregledaRouter)
router.use('/zahtevNovaVrstaPregleda', zahtevNovaVrstaPregledaRouter)
router.use('/pregled', pregledRouter)
router.use('/izvestaj', izvestajRouter)
//router.use('/obavestenje', obavestenjeRouter)

// pristup 'uploads' folderu sa slikama
const path = require('path');
app.use('/uploads',express.static(path.join('./src/uploads')));
app.use('/pdfs', express.static(path.join('./src/pdfs'))); 
app.use('/qrcodes', express.static(path.join('./src/qrcodes'))); 


app.listen(4000, () => console.log(`Express server running on port 4000`));