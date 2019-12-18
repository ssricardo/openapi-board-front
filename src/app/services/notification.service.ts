import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Centralizes and builds visual notifications to inform the user */

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(public snackBar: MatSnackBar) { }
  
  showSuccess(message: string): void {
    this.snackBar.open(message, '', {duration: 1500});
  }

  showWarn(message: string): void {
    this.snackBar.open(message, 'X', { panelClass: ['warning'], duration: 5000 })
  }
  
  showError(message: string): void {
    this.snackBar.open(message, 'X', {panelClass: ['error'], duration: 5500});
  }
}