import express from 'express';
import { PregledController } from '../controllers/pregled.controller';
const pregledRouter = express.Router();

pregledRouter.route('/zakazati').post(
    (req, res) => { new PregledController().zakazati(req, res) }
)
pregledRouter.route('/dohvatiPregledePacijenta').post(
    (req, res) => { new PregledController().dohvatiPregledePacijenta(req, res) }
)
pregledRouter.route('/otkazatiPregled').post(
    (req, res) => { new PregledController().otkazatiPregled(req, res) }
)
pregledRouter.route('/dohvatiPregledeLekara').post(
    (req, res) => { new PregledController().dohvatiPregledeLekara(req, res) }
)
pregledRouter.route('/dohvatiPregledeVrste').post(
    (req, res) => { new PregledController().dohvatiPregledeVrste(req, res) }
)
pregledRouter.route('/azurirajPregled').post(
    (req, res) => { new PregledController().azurirajPregled(req, res) }
)

export default pregledRouter;