import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Phone } from 'src/app/models/phone';
import { AddressService } from 'src/app/services/address.service';
import { CustomersService } from 'src/app/services/customers.service';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer:any;
  phone:Phone = new Phone();
  address:Address = new Address();
  addresses:any;
  phones:any;
  id:number;
  idPhone:number;
  idAddress:number;

  isUpdatingPhone:boolean = false;
  isUpdatingAddress:boolean = false;
  isDeleting:boolean = false;
  isLoading:boolean = false;
  isActivePhoneNumber:boolean = false;

  isActiveCountry:boolean = false;
  isActiveCity:boolean = false;
  isActiveStreet:boolean = false;
  isActiveAllAddress:boolean = false;

  activateAddress(){
    this.isActiveCountry = true;
    this.isActiveCity = true;
    this.isActiveStreet = true;
  }

  activatePhone(){
    this.isActivePhoneNumber = true;
  }

  validatePhoneNumber(e:any){
    if(e.target.value.trim() != '') this.isActivePhoneNumber = true;
    else this.isActivePhoneNumber = false;
  }

  // Country
  validateCountry(e:any){
    if(e.target.value.trim() != '') this.isActiveCountry = true;
    else this.isActiveCountry = false;
  }

  validateCity(e:any){
    if(e.target.value.trim() != '') this.isActiveCity = true;
    else this.isActiveCity = false;
  }

  validateStreet(e:any){
    if(e.target.value.trim() != '') this.isActiveStreet = true;
    else this.isActiveStreet = false;
  }

  validateInputsAddress(){
    if(this.isActiveCountry == true && this.isActiveCity == true && this.isActiveStreet == true) this.isActiveAllAddress = true;
    else this.isActiveAllAddress = false;

    console.log(this.isActiveAllAddress);
  }

  getCustomer(){
    this.isLoading = true;
    this.customersService.getCustomer(this.id).subscribe(res => {
      let data:any = res;
      console.log(data);
      this.customer = data.customer;
      this.addresses = data.addresses;
      this.phones = data.phones;
      this.phone.customer_id = this.customer.id;
      this.address.customer_id = this.customer.id;
      this.isLoading = false;
    }, err => {
      console.error(err)
      this.isLoading = false;
    });
  }

  //Phone
  getPhone(id:number){
    this.phoneService.getPhone(id).subscribe(res => {
      let phone:any = res;
      this.phone.id = phone.id;
      this.phone.phone_number = phone.phone_number;
    }, err => {
      console.error(err);
    })
  }

  newPhone(){
    this.isLoading = true;
    this.phoneService.newPhone(this.phone).subscribe(res => {
      this.getCustomer();
      this.isLoading = false;
    }, err => {
      console.error(err);
      this.isLoading = false;
    })
  }

  updatePhone(){
    this.isLoading = true;
    this.phoneService.updatePhone(this.phone).subscribe(res => {
      this.getCustomer();
      this.isLoading = false;
    }, err => {
      console.error(err);
      this.isLoading = false;
    })
  }

  getIdPhone(idPhone:number){
    this.idPhone = idPhone;
  }

  deletePhone(){
    // this.clearMessage();
    this.isLoading = true;
    this.phoneService.deletePhone(this.idPhone).subscribe(res => {
      this.getCustomer();
      this.isLoading = false;
      // if(this.formIsActive) this.formIsActive = false;
      // this.confirmation = 'Customer deleted successfully';
    }, err => {
      this.isLoading = false;
      // this.error = 'This customer could not be deleted';
    });
  }

  //Address
  getAddress(id:number){
    this.addressService.getAddress(id).subscribe(res => {
      let address:any = res;
      this.address.id = address.id;
      this.address.country = address.country;
      this.address.city = address.city;
      this.address.street = address.street;
    }, err => {
      console.error(err);
    })
  }

  newAddress(){
    this.isLoading = true;
    this.addressService.newAddress(this.address).subscribe(res => {
      this.getCustomer();
      this.isLoading = false;
    }, err => {
      console.error(err);
      this.isLoading = false;
    })
  }

  updateAddress(){
    this.isLoading = true;
    this.addressService.updateAddress(this.address).subscribe(res => {
      this.getCustomer();
      this.isLoading = false;
    }, err => {
      console.error(err);
      this.isLoading = false;
    })
  }

  getIdAddress(idAddress:number){
    this.idAddress = idAddress;
  }

  deleteAddress(){
    // this.clearMessage();
    this.isLoading = true;
    this.addressService.deleteAddress(this.idAddress).subscribe(res => {
      this.getCustomer();
      this.isLoading = false;
      // if(this.formIsActive) this.formIsActive = false;
      // this.confirmation = 'Customer deleted successfully';
    }, err => {
      this.isLoading = false;
      // this.error = 'This customer could not be deleted';
    });
  }

  constructor(private customersService:CustomersService, private phoneService:PhoneService, private addressService:AddressService, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.getCustomer();
  }

}
