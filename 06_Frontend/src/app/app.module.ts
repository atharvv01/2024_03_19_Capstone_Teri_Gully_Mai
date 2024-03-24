import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { WriteBlogComponent } from './components/city-blog/write-blog.component';
import { SavedBlogComponent } from './components/saved-blog/saved-blog.component';
import { CityGuideComponent } from './components/city-guide/city-guide.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { InnerBlogComponent } from './components/inner-blog/inner-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BlogPageComponent,
    WriteBlogComponent,
    SavedBlogComponent,
    CityGuideComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    InnerBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
