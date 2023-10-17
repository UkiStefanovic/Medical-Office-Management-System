import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';
const korisnikRouter = express.Router();

// Za potrebe file upload-a, koristimo Multer biblioteku
const multer = require('multer');
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/') //proveriti da li je dobar destination string
    },
    filename: (req, file, cb) => {
        let filename = Date.now() + '--' + file.originalname;
        req.body.file = filename;
        cb(null, filename)
    },
});
const upload = multer({ storage: fileStorageEngine });

// Rutiranja
korisnikRouter.route('/login').post(
    (req, res) => { new KorisnikController().login(req, res) }
)
korisnikRouter.route('/loginMenadzer').post(
    (req, res) => { new KorisnikController().loginMenadzer(req, res) }
)
korisnikRouter.route('/dohvatiKorisnika').post(
    (req, res) => { new KorisnikController().dohvatiKorisnika(req, res) }
)
korisnikRouter.route('/promeniLozinku').post(
    (req, res) => { new KorisnikController().promeniLozinku(req, res) }
)
korisnikRouter.route('/dohvatiSveLekare').get(
    (req, res) => { new KorisnikController().dohvatiSveLekare(req, res) }
)
korisnikRouter.route('/dohvatiSvePacijente').get(
    (req, res) => { new KorisnikController().dohvatiSvePacijente(req, res) }
)
korisnikRouter.route('/dohvatiSveKorisnike').get(
    (req, res) => { new KorisnikController().dohvatiSveKorisnike(req, res) }
)
korisnikRouter.route('/registrujPacijenta').post(
    upload.single("profilna"),
    (req, res) => {
        new KorisnikController().registrujPacijenta(req, res)
    }
)
korisnikRouter.route('/registrujLekara').post(
    upload.single("profilna"),
    (req, res) => {
        new KorisnikController().registrujLekara(req, res)
    }
)
korisnikRouter.route('/dohvatiPacijenteNaCekanju').get(
    (req, res) => { new KorisnikController().dohvatiPacijenteNaCekanju(req, res) }
)
korisnikRouter.route('/prihvati').post(
    (req, res) => { new KorisnikController().prihvati(req, res) }
)
korisnikRouter.route('/odbij').post(
    (req, res) => { new KorisnikController().odbij(req, res) }
)
korisnikRouter.route('/dodajVrstuPregleda').post(
    (req, res) => { new KorisnikController().dodajVrstuPregleda(req, res) }
)
korisnikRouter.route('/ukloniVrstuPregleda').post(
    (req, res) => { new KorisnikController().ukloniVrstuPregleda(req, res) }
)
korisnikRouter.route('/dodajPromociju').post(
    (req, res) => { new KorisnikController().dodajPromociju(req, res) }
)
korisnikRouter.route('/procitati').post(
    (req, res) => { new KorisnikController().procitati(req, res) }
)
korisnikRouter.route('/zakazatiPregled').post(
    (req, res) => { new KorisnikController().zakazatiPregled(req, res) }
)

korisnikRouter.route('/otkazatiPregled').post(
    (req, res) => { new KorisnikController().otkazatiPregled(req, res) }
)



korisnikRouter.route('/azurirajPacijenta').post(
    upload.single("profilna"),
    (req, res) => { 
        new KorisnikController().azurirajPacijenta(req, res) // u ovoj metodi cemo da unlink-ujemo prethodnu sliku
    }
)
korisnikRouter.route('/azurirajLekara').post(
    upload.single("profilna"),
    (req, res) => { 
        new KorisnikController().azurirajLekara(req, res) // u ovoj metodi cemo da unlink-ujemo prethodnu sliku
    }
)

korisnikRouter.route('/obrisiPacijenta').post(
    (req, res) => { new KorisnikController().obrisiPacijenta(req, res) }
)
korisnikRouter.route('/obrisiLekara').post(
    (req, res) => { new KorisnikController().obrisiLekara(req, res) }
)

korisnikRouter.route('/posaljiObavestenje').post(
    (req, res) => { new KorisnikController().posaljiObavestenje(req, res) }
)


export default korisnikRouter;