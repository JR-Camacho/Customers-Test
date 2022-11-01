import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component:HomeComponent
  },
  {
    path: 'customer/:id', component:CustomerComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
