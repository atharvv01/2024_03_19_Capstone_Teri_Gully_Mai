import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
// import { WriteBlogComponent } from './components/write-blog/write-blog.component';
import { SavedBlogComponent } from './components/saved-blog/saved-blog.component';
import { CityGuideComponent } from './components/city-guide/city-guide.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { InnerBlogComponent } from './components/inner-blog/inner-blog.component';
import { FormsModule,FormControl, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateABlogComponent } from './components/create-a-blog/create-a-blog.component';
// import { MyBlogsComponent } from './components/my-blogs/my-blogs.component';
import { SmallerBlogComponent } from './components/smaller-blog/smaller-blog.component';
import { CreatePlacesComponent } from './components/create-places/create-places.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    // WriteBlogComponent,
    SavedBlogComponent,
    CityGuideComponent,
    NavbarComponent,
    LoginComponent,
    // SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    InnerBlogComponent,
    CreateABlogComponent,
    // MyBlogsComponent,
    SmallerBlogComponent,
    CreatePlacesComponent,
    NotfoundComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
