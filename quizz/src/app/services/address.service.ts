import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) { }

  getAddress(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/addresses/${id}`);
  }

  newAddress(address:Address){
    return this.http.post('http://127.0.0.1:8000/api/addresses', address);
  }

  updateAddress(address:Address){
    return this.http.put('http://127.0.0.1:8000/api/addresses', address);
  }

  deleteAddress(id:number){
    return this.http.delete(`http://127.0.0.1:8000/api/addresses/${id}`);
  }
}
