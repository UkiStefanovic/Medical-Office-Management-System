import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pregled from '../models/pregled';
import Obavestenje from '../models/obavestenje';

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService {

  constructor(private http: HttpClient) { }

  backend_url = 'http://localhost:4000';

  // method(){
  //   localStorag
  // }

}
