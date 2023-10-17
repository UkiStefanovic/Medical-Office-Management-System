import express from 'express';
import { IzvestajController } from '../controllers/izvestaj.controller';
const izvestajRouter = express.Router();

izvestajRouter.route('/dodajIzvestaj').post(
    (req, res) => { new IzvestajController().dodajIzvestaj(req, res) }
)
izvestajRouter.route('/dohvatiIzvestajePacijenta').post(
    (req, res) => { new IzvestajController().dohvatiIzvestajePacijenta(req, res) }
)

// Za potrebe file upload-a, koristimo Multer biblioteku
const multer = require('multer');
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/pdfs/') //proveriti da li je dobar destination string
    },
    filename: (req, file, cb) => {
        // let filename = Date.now() + '--' + file.originalname;
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        let filename = file.originalname;
        req.body.file = filename;
        cb(null, filename)
    },
});
const upload = multer({ storage: fileStorageEngine });


izvestajRouter.route('/savePDF').post(
    upload.single('file'),
    (req, res) => { new IzvestajController().savePDF(req, res) }
)

export default izvestajRouter;