import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContactListComponent } from './contact-detail/contact-list/contact-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './shared/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['list'],  
      },
    }),
  ],
  providers: [
    AuthService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
