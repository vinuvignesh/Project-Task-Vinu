import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { contact } from "src/app/shared/contact-detail.model";
import { ContactService } from "src/app/shared/contact-detail.service";

@Component({
  selector: "app-edit-contact",
  templateUrl: "./edit-contact.component.html",
  styleUrls: ["./edit-contact.component.css"],
})
export class EditContactComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const contactId = Number(this.route.snapshot.paramMap.get("id"));
    if (contactId) {
      this.contactService.getContactById(contactId).subscribe(
        (contact) => {
          this.contact = contact;
        },
        (error) => {
          console.error("Error loading contact:", error);
        }
      );
    }
  }

  updateContact() {
    this.contactService.updateContact(this.contact.id!, this.contact).subscribe(
      () => {
        this.router.navigate(["list"]);
      },
      (error) => {
        console.error("Error updating contact:", error);
      }
    );
  }
}
