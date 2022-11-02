import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Phone } from '../models/phone';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http:HttpClient) { }

  getPhone(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/phones/${id}`);
  }

  newPhone(phone:Phone){
    return this.http.post('http://127.0.0.1:8000/api/phones', phone);
  }

  updatePhone(phone:Phone){
    return this.http.put('http://127.0.0.1:8000/api/phones', phone);
  }

  deletePhone(id:number){
    return this.http.delete(`http://127.0.0.1:8000/api/phones/${id}`);
  }
}
