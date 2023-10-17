export default class Izvestaj {
    pacijent: string;
    imePacijenta:string;
    prezimePacijenta:string;

    lekar:string;
    imeLekara:string;
    prezimeLekara:string;

    vreme:Date; // pregleda
    datum_kontrole:Date; 

    naziv:string;
    specijalizacija:string;

    razlog_dolaska:string;
    dijagnoza:string;
    preporucena_terapija:string;
}