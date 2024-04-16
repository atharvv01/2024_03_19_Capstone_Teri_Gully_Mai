import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedStatusService {
  private isSaved: boolean = false;
  isSavedChanged: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  setIsSaved(value: boolean): void {
    this.isSaved = value;
    this.isSavedChanged.next(value); // Emit the changed value
  }

  getIsSaved(): boolean {
    return this.isSaved;
  }
}
