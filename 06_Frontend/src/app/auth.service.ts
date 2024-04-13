import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor() {
    // Check if the user is logged in from local storage on initialization
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      this.loggedInSubject.next(true);
    }
  }

  logIn() {
    // Your login logic here
    // After successful login, set isLoggedIn to true and store it in local storage
    localStorage.setItem('authToken', 'true');
    this.loggedInSubject.next(true);
  }

  logOut() {
    console.log("logout");
    // Your logout logic here
    // After logout, set isLoggedIn to false and remove it from local storage
    localStorage.removeItem('authToken');
    this.loggedInSubject.next(false);
  }
}
