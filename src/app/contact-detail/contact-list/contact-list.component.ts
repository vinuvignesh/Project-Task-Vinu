import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";
import { contact } from "src/app/shared/contact-detail.model";
import { ContactService } from "src/app/shared/contact-detail.service";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"],
})
export class ContactListComponent {
  contacts: contact[] = [];

  constructor(
    private router: Router,
    private contactService: ContactService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["login"]);
    }
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getAllContacts().subscribe(
      (contacts: contact[]) => {
        this.contacts = contacts;
      },
      (error: any) => {
        console.error("Error loading contacts:", error);
      }
    );
  }

  addDetails() {
    this.router.navigate(["add-contact"]);
  }

  editContact(id: number) {
    this.router.navigate(["edit-contact", id]);
  }

  deleteContact(id: number) {
    if (confirm("Are you sure you want to delete this contact?")) {
      this.contactService.deleteContact(id).subscribe(() => {
        this.loadContacts();
      });
    }
  }
}
