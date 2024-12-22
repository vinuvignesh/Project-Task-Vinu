import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/shared/contact-detail.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contactForm!: FormGroup;  // Use definite assignment assertion
  contact = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private router: Router, private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      firstName: new FormControl(this.contact.firstName, [Validators.required]),
      lastName: new FormControl(this.contact.lastName, [Validators.required]),
      email: new FormControl(this.contact.email, [
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
      ]),
      phoneNumber: new FormControl(this.contact.phoneNumber, [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ])
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();  // Trigger validation errors
      return;
    }
    this.addContact();
  }

  addContact() {
    this.contactService.addContact(this.contactForm.value).subscribe(() => {
      this.router.navigate(['list']);
    });
  }
}
