import express from 'express';
import { VrstaPregledaController } from '../controllers/vrstaPregleda.controller';
const vrstaPregledaRouter = express.Router();

vrstaPregledaRouter.route('/dohvatiVrstePregleda').post(
    (req, res) => { new VrstaPregledaController().dohvatiVrstePregleda(req, res) }
)
vrstaPregledaRouter.route('/azurirati').post(
    (req, res) => { new VrstaPregledaController().azurirati(req, res) }
)
vrstaPregledaRouter.route('/obrisati').post(
    (req, res) => { new VrstaPregledaController().obrisati(req, res) }
)
vrstaPregledaRouter.route('/dodaj').post(
    (req, res) => { new VrstaPregledaController().dodaj(req, res) }
)

export default vrstaPregledaRouter;
