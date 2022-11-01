import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  customers:any;
  customer:Customer = new Customer(); 
  formIsActive:boolean = false;
  isUpdating:boolean = false;
  isDeleting:boolean = false;
  isLoading:boolean = false;
  isActiveFirstName:boolean = false;
  isActiveLastName:boolean = false;
  isActiveStatus:boolean = false;
  isActiveAll:boolean = false;
  error:string = '';
  confirmation:string = '';
  id:number;

  activate(){
    this.isActiveFirstName = true;
    this.isActiveLastName = true;
    this.isActiveStatus = true;
  }

  getCustomers(){
    this.isLoading = true;
    this.customersService.getCustomers().subscribe(res =>{
      this.customers = res;
      console.log(res);
      this.isLoading = false;
    }, err => this.isLoading = false);
  }

  getCustomer(id:number){
    this.activate();
    this.customersService.getCustomer(id).subscribe(res => {
      let customer:any = res;
      this.customer.id = customer.customer.id;
      this.customer.first_name = customer.customer.first_name;
      this.customer.last_name = customer.customer.last_name;
      this.customer.status = customer.customer.status;
    }, err => console.error(err));
  }

  newCustomer(){
    // this.clearMessage();
    this.isLoading = true;
    this.customersService.newCustomer(this.customer).subscribe(res => {
      this.getCustomers();
      this.isLoading = false;
      this.confirmation = 'Customer added sucessfully';
    }, err => {
      this.isLoading = false;
      this.error = 'This customer could not be added';
    });
  }

  updateCustomer(){
    // this.clearMessage();
    this.isLoading = true;
    this.customersService.updateCustomer(this.customer).subscribe(res => {
      this.getCustomers();
      this.isLoading = false;
      this.confirmation = 'Customer updated sucessfully';
    }, err => {
      this.isLoading = false
      this.error = 'This customer could not be updated';
    });
  }

  getId(id:number){
    this.id = id;
  }

  deleteCustomer(){
    // this.clearMessage();
    this.isLoading = true;
    this.customersService.deleteCustomer(this.id).subscribe(res => {
      this.getCustomers();
      this.isLoading = false;
      if(this.formIsActive) this.formIsActive = false;
      this.confirmation = 'Customer deleted successfully';
    }, err => {
      this.isLoading = false
      this.error = 'This customer could not be deleted';
    });
  }

  validateFirstName(e:any){
    if(e.target.value.trim() != '') this.isActiveFirstName = true;
    else this.isActiveFirstName = false;
  }

  validateLastName(e:any){
    if(e.target.value.trim() != '') this.isActiveLastName = true;
    else this.isActiveLastName = false;
  }

  validateStatus(e:any){
    if(e.target.value.trim() != '') this.isActiveStatus = true;
    else this.isActiveStatus = false;
  }

  validateInputs(){
    if(this.isActiveFirstName == true && this.isActiveLastName == true && this.isActiveStatus == true) this.isActiveAll = true;
    else this.isActiveAll = false;

    console.log(this.isActiveAll);
  }

  cleanForm(){
    this.customer.first_name = '';
    this.customer.last_name = '';
    this.customer.status = '';
    this.isActiveFirstName = false;
    this.isActiveLastName = false;
    this.isActiveStatus = false;
    this.isActiveAll = false;
    this.formIsActive = true;
    this.isUpdating = false;
  }

  constructor(private customersService:CustomersService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

}
