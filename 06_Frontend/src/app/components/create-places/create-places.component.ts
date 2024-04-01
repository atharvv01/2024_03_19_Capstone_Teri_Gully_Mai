import { Component } from '@angular/core';

@Component({
  selector: 'app-create-places',
  templateUrl: './create-places.component.html',
  styleUrls: ['./create-places.component.css']
})
export class CreatePlacesComponent {
  places: any[] = []; // Initialize places array

  addNewPlace() {
    this.places.push({ name: '', googleMapLink: '', description: '', images: [], about: '' }); // Add new place object to array
  }

  deletePlace(index: number) {
    this.places.splice(index, 1); // Remove the place object at the specified index
  }
}
