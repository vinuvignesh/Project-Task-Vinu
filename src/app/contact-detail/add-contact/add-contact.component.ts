import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { contact } from "src/app/shared/contact-detail.model";
import { ContactService } from "src/app/shared/contact-detail.service";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.css"],
})
export class AddContactComponent {
  contact: contact = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: 0,
  };

  constructor(private router: Router, private contactService: ContactService) {}

  addContact() {
    this.contactService.addContact(this.contact).subscribe(() => {
      this.router.navigate(["list"]);
    });
  }
}
