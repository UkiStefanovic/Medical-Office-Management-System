import { Double, Int32, Timestamp } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Pregled = new Schema({
    // cuvamo korisnicka imena
    lekar: {
        type:String
    },
    pacijent:{
        type:String
    },
    imeLekara:{
        type:String
    },
    prezimeLekara:{
        type:String
    },
    imePacijenta:{
        type:String
    },
    prezimePacijenta:{
        type:String
    },

    // podaci o vrsti pregleda
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

    // nisam sig kako cuvati vreme u bazi
    // moramo i datum i vreme da spojimo u jedan podatak
    // cuvati sve u jednoj promenljivoj
    vreme:{
        type: Date
    },
    ogranak:{
        type:String
    }
})

export default mongoose.model('PregledModel', Pregled, 'pregledi');