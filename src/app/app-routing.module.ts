import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './contact-detail/add-contact/add-contact.component';
import { ContactListComponent } from './contact-detail/contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';
import { EditContactComponent } from './contact-detail/edit-contact/edit-contact.component';

const routes: Routes = [
  { path: 'add-contact', component: AddContactComponent },
  { path: 'list', component: ContactListComponent },
  { path: 'edit-contact/:id', component: EditContactComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
