// login.component.ts
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/auth.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = {
      username: "admin",
      password: "@dmin123",
    };

    this.authService.login(loginData).subscribe(
      (response: any) => {
        console.log("Login response:", response);
        if (response && response.token) {
          console.log("Login successful. Token:", response.token);
          localStorage.setItem("token", response.token); // Save token to localStorage
          this.router.navigate(["list"]); // Redirect to 'list' component after successful login
        } else {
          console.error("Login failed. Invalid response:", response);
        }
      },
      (error) => {
        console.error("Login failed:", error);
      }
    );
  }
}
