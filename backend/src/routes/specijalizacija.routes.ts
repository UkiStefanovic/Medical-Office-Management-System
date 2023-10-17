import express from 'express';
import { SpecijalizacijaController } from '../controllers/specijalizacija.controller';
const specijalizacijaRouter = express.Router();

specijalizacijaRouter.route('/dohvatiSve').get(
    (req,res)=>{ new SpecijalizacijaController().dohvatiSve(req,res)}
)
specijalizacijaRouter.route('/dodaj').post(
    (req,res)=>{ new SpecijalizacijaController().dodaj(req, res)}
)

export default specijalizacijaRouter;