import { Double, Int32 } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let ZahtevNovaVrstaPregleda = new Schema({
    // jedinstveni identifikator: (naziv, specijalizacija)
    naziv:{ 
        type: String
    },
    specijalizacija:{
        type:String
    },
    trajanje:{
        type: Number
    },
    cena:{
        type: String
    },
    ime_lekara:{
        type:String
    },
    prezime_lekara:{
        type: String
    }
    
})

export default mongoose.model('ZahtevNovaVrstaPregledaModel', ZahtevNovaVrstaPregleda, 'zahtevi nove vrste pregleda');