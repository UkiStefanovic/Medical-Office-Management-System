import express from 'express';
import { ZahtevNovaVrstaPregledaController } from '../controllers/zahtevNovaVrstaPregleda.controller';


const zahtevNovaVrstaPregledaRouter = express.Router();

zahtevNovaVrstaPregledaRouter.route('/dodaj').post(
    (req, res) => { new ZahtevNovaVrstaPregledaController().dodaj(req, res) }
)
zahtevNovaVrstaPregledaRouter.route('/dohvatiSve').get(
    (req, res) => { new ZahtevNovaVrstaPregledaController().dohvatiSve(req, res) }
)
zahtevNovaVrstaPregledaRouter.route('/prihvati').post(
    (req, res) => { new ZahtevNovaVrstaPregledaController().prihvati(req, res) }
)
zahtevNovaVrstaPregledaRouter.route('/odbij').post(
    (req, res) => { new ZahtevNovaVrstaPregledaController().odbij(req, res) }
)




export default zahtevNovaVrstaPregledaRouter;