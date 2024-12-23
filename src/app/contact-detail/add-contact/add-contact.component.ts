import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/shared/contact-detail.service';
import { contact } from 'src/app/shared/contact-detail.model';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  contactForm!: FormGroup;
  isEditMode = false;
  contacts: any;
  contact: contact = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };
  isLoading = false;
  errorMessage: string | null = null;  // To store error messages

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
      this.isEditMode = true;
      this.contacts = contactId;
      this.loadContact(contactId);
    }
  }

  initializeForm() {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')],
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  loadContact(id: number) {
    this.isLoading = true;
    this.contactService.getContactById(id).pipe(
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

    const formData = this.contactForm.value;

    if (this.isEditMode) {
      this.updateContact(); // Pass only the updated form data
    } else {
      this.addContact(formData);
    }
  }

  addContact(formData: any) {
    this.isLoading = true;
    this.contactService.addContact(formData).pipe(
      catchError((error) => {
        this.errorMessage = 'Error adding contact. Please try again.';
        console.error('Error adding contact:', error);
        return of(null);
      })
    ).subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['list']);
    });
  }
message:any;
updateContact(): void {
  const data = {
    id: this.contact.id, // Include the id to match the expected payload
    firstName: this.contactForm.value.firstName,
    lastName: this.contactForm.value.lastName,
    email: this.contactForm.value.email,
    phoneNumber: this.contactForm.value.phoneNumber
  };

  this.message = ''; // Clear any previous message

  // Call the update contact method in the service
  this.contactService.updateContact(this.contact.id, data)
    .subscribe({
      next: (res) => {
        console.log(res);
        // Update the contact object with the new values
        this.contact.firstName = data.firstName;
        this.contact.lastName = data.lastName;
        this.contact.email = data.email;
        this.contact.phoneNumber = data.phoneNumber;
        this.router.navigate(['list']); 
      },
      error: (e) => {
        console.error(e);
        // Optionally, set a message for the error
        this.message = 'There was an error updating the contact.';
      }
    });
}

}
