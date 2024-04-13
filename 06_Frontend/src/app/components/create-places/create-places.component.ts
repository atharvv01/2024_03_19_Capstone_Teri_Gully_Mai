import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-places',
  templateUrl: './create-places.component.html',
  styleUrls: ['./create-places.component.css']
})
export class CreatePlacesComponent {
  places: any[] = []; // Initialize places array
  
  @Output() placesChanged: EventEmitter<any[]> = new EventEmitter<any[]>(); // Event emitter for updating places array
  @Output() placeAdded: EventEmitter<any> = new EventEmitter<any>(); // Event emitter for adding place
  @Output() placeDeleted: EventEmitter<number> = new EventEmitter<number>(); // Event emitter for deleting place
  
  addNewPlace() {
    const newPlace = { placeName: '', googleMapLink: '', description: '', images: [], about: '', MustTry:'',price:'',};
    this.places.push(newPlace); // Add new place object to array
    this.placeAdded.emit(newPlace); // Emit event with new place data
    this.placesChanged.emit(this.places);
  }

  
  deletePlace(index: number) {
    this.places.splice(index, 1); // Remove the place object at the specified index
    this.placeDeleted.emit(index); // Emit event with index of deleted place
  }

  
}
