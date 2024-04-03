import { Injectable } from '@angular/core'; 
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false) 

  loggedIn$ = this.loggedIn.asObservable();

constructor() { }

// Method to call when user logs in
logIn() {
  this.loggedIn.next(true);
}

// Method to call when user logs out
logOut() {
  this.loggedIn.next(false);
}

}
