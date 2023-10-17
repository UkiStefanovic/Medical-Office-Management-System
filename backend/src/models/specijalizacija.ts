import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let specijalizacija = new Schema({
    naziv: {
        type: String
    }
})

export default mongoose.model('SpecijalizacijaModel', specijalizacija, 'specijalizacije');