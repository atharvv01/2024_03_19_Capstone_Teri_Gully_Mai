import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityGuideComponent } from './components/city-guide/city-guide.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CreateABlogComponent } from './components/create-a-blog/create-a-blog.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

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
    path: 'create_blog',
    component:CreateABlogComponent
  },
  {
    path: 'user_profile',  
    component: UserProfileComponent
  },
  {
    path: '**',  
    component: NotfoundComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
