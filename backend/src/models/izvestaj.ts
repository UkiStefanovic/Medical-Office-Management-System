import { Double, Int32, Timestamp } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Izvestaj = new Schema({
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

    vreme:{
        type: Date
    },
    datum_kontrole:{
        type:Date
    },

    razlog_dolaska:{
        type:String
    },
    dijagnoza:{
        type:String
    },
    preporucena_terapija:{
        type:String
    }

})

export default mongoose.model('IzvestajModel', Izvestaj, 'izvestaji');