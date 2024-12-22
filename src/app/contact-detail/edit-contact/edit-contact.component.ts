import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/shared/contact-detail.service';
import { contact } from 'src/app/shared/contact-detail.model';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  contactForm!: FormGroup;
  contact: contact = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    const contactId = Number(this.route.snapshot.paramMap.get('id'));
    if (contactId) {
      this.loadContact(contactId);
    }
  }

  initializeForm() {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  loadContact(contactId: number) {
    this.isLoading = true;
    this.contactService.getContactById(contactId).pipe(
      tap((contact) => {
        this.contact = contact;
        this.contactForm.patchValue(contact); // Populate the form with the contact data
      }),
      catchError((error) => {
        console.error('Error loading contact:', error);
        this.router.navigate(['error']); // Navigate to an error page
        return of(null); // Return an empty observable to continue the stream
      })
    ).subscribe(() => {
      this.isLoading = false;
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.updateContact();
  }

  updateContact() {
    const updatedContact = this.contactForm.value;
    this.isLoading = true;

    this.contactService.updateContact(this.contact.id, updatedContact).pipe(
      tap(() => {
        console.log('Contact updated successfully');
      }),
      catchError((error) => {
        console.error('Error updating contact:', error);
        return of(null); // Gracefully handle the error
      })
    ).subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['list']);
    });
  }
}
