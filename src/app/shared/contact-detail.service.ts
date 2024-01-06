// contact.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { contact } from "./contact-detail.model";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  contactList: contact[] = [];
  private apiUrl = "https://localhost:7264/api/Contacts";

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<contact[]> {
    return this.http.get<contact[]>(this.apiUrl);
  }

  getContactById(id: number): Observable<contact> {
    return this.http.get<contact>(`${this.apiUrl}/${id}`);
  }

  addContact(contact: contact): Observable<contact> {
    return this.http.post<contact>(this.apiUrl, contact);
  }

  updateContact(id: number, contact: contact): Observable<contact> {
    return this.http.put<contact>(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
