import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }

  getCustomers(){
    return this.http.get('http://127.0.0.1:8000/api/customers');
  }

  getCustomer(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/customers/${id}`);
  }

  newCustomer(customer:Customer){
    console.log(customer);
    return this.http.post('http://127.0.0.1:8000/api/customers', customer);
  }

  updateCustomer(customer:Customer){
    return this.http.put('http://127.0.0.1:8000/api/customers', customer);
  }

  deleteCustomer(id:number){
    return this.http.delete(`http://127.0.0.1:8000/api/customers/${id}`);
  }

}
