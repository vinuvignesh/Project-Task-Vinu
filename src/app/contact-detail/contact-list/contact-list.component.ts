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
  filteredContacts: contact[] = [];
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;
  sortColumn: string = 'firstName'; // Default sort column
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction

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
        this.totalRecords = contacts.length;
        this.applyPagination();
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

  searchContacts(): void {
    // If there's a search term, filter contacts
    if (this.searchText) {
      this.filteredContacts = this.contacts.filter(contact =>
        contact.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        contact.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
        contact.phoneNumber.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      // If no search term, show all contacts
      this.filteredContacts = [...this.contacts];
      this.applyPagination(); // Apply pagination when there is no search term
    }
    
    // Reset to the first page when search changes
    this.currentPage = 1;
  }
  applyPagination(): void {
    // Only apply pagination if there's no search filter
    if (!this.searchText) {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = this.currentPage * this.pageSize;
      this.filteredContacts = this.contacts.slice(startIndex, endIndex);
    }
    this.sortContacts(); // Apply sorting after pagination (if needed)
  }
  
  nextPage(): void {
    if ((this.currentPage * this.pageSize) < this.totalRecords) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.applyPagination();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  sortContacts(): void {
    this.filteredContacts.sort((a, b) => {
      const valueA = a[this.sortColumn as keyof contact]?.toString().toLowerCase() ?? ''; // Safely access the property
      const valueB = b[this.sortColumn as keyof contact]?.toString().toLowerCase() ?? ''; // Safely access the property
  
      if (this.sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }
  
  changeSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc'; // Default to ascending when switching columns
    }
    this.applyPagination();
  }
}
