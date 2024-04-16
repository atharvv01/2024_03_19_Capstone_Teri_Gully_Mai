import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CityGuideComponent } from './components/city-guide/city-guide.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { InnerBlogComponent } from './components/inner-blog/inner-blog.component';
import { FormsModule, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateABlogComponent } from './components/create-a-blog/create-a-blog.component';
import { SmallerBlogComponent } from './components/smaller-blog/smaller-blog.component';
import { CreatePlacesComponent } from './components/create-places/create-places.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { UpgradePlanComponent } from './components/upgrade-plan/upgrade-plan.component';
import { WriteBlogComponent } from './components/city-blog/write-blog.component';
import { BlogService } from './services/blog.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
// import Swal from 'sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CityGuideComponent,
    NavbarComponent,
    LoginComponent,
    // SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    InnerBlogComponent,
    CreateABlogComponent,
    SmallerBlogComponent,
    CreatePlacesComponent,
    NotfoundComponent,
    UserProfileComponent,
    UpgradePlanComponent,
    WriteBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownComponent,    
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
