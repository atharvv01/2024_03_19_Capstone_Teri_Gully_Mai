import { Component, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

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
  
  canAddPlace(): boolean {
    // Allow adding place only if all previous places are saved
    return true;
  }

  canSavePlace(): boolean {
    return this.places.some(place =>
      place.placeName && place.googleMapLink && place.description && place.images.length > 0 && place.MustTry && place.price
    );
  }
  
  
  addNewPlace() {
    const newPlace = { placeName: '', googleMapLink: '', description: '', images: [], MustTry:'',price:'',officalLink:''};
    this.places.push(newPlace); // Add new place object to array
    this.placeAdded.emit(newPlace); // Emit event with new place data
    this.placesChanged.emit(this.places);
    Swal.fire("Place added");
  }

  saveThePlace() {
    // Emit event to send all places data to parent component for saving
    this.placesChanged.emit(this.places);
    Swal.fire("Added place to blog");
  }
  
  deletePlace(index: number) {
    this.places.splice(index, 1); // Remove the place object at the specified index
    this.placeDeleted.emit(index); // Emit event with index of deleted place
    // Swal.fire("Deleted place from blog");
  }

  
}
