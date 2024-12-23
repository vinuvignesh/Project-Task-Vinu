import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './contact-detail/add-contact/add-contact.component';
import { ContactListComponent } from './contact-detail/contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'add-contact', component: AddContactComponent },
  { path: 'edit-contact/:id', component: AddContactComponent },
  { path: 'list', component: ContactListComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [AddContactComponent],
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule,CommonModule,BrowserModule],
  exports: [RouterModule],
  bootstrap: [AppComponent,AddContactComponent]
})
export class AppRoutingModule { }
