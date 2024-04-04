import { Component } from '@angular/core'; 
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent { 
  
  

  constructor(private router: Router,private authService: AuthService) { 
    
  }
  /** Flag indicating whether the dropdown is active or not. */
  dropdownActive = false;

  /**
   * Function to toggle the dropdown menu's visibility.
   */
  toggleDropdown(): void {
    this.dropdownActive = !this.dropdownActive;
  }

  navigateTo(route: string): void {
    // Use the Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);
  }

  logOut():void{
    this.authService.logOut(); // Call the logOut method from your AuthService
    this.router.navigate(['/']); // Redirect to the home page
  }

}
