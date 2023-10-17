import { Double, Int32 } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let VrstaPregleda = new Schema({
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
    }
})

export default mongoose.model('VrstaPregledaModel', VrstaPregleda, 'vrste pregleda');