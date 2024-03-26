import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityGuideComponent } from './components/city-guide/city-guide.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SavedBlogComponent } from './components/saved-blog/saved-blog.component';
import { WriteBlogComponent } from './components/write-blog/write-blog.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CreateABlogComponent } from './components/create-a-blog/create-a-blog.component';
import { MyBlogsComponent } from './components/my-blogs/my-blogs.component';

const routes: Routes = [
  {
    path: 'city_guides',
    component:CityGuideComponent
  },
  {
    path:'',
    component:HomepageComponent
  },
  {
    path: 'saved_blogs',
    component:SavedBlogComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'signup',
    component:SignupComponent
  },
  {
    path: 'forgot_password',
    component:ForgotPasswordComponent
  },
  {
    path: 'reset_password',
    component:ResetPasswordComponent
  },
  {
    path: 'blog',
    component:WriteBlogComponent
  },
  {
    path: 'write_blog',
    component:CreateABlogComponent
  },
  {
    path: 'my_blog',
    component:MyBlogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
