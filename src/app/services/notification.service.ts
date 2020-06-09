import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Centralizes and builds visual notifications to inform the user */

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(public snackBar: MatSnackBar) { }
  
  showSuccess(message: string): void {
    this.snackBar.open(message, '', {duration: 2500});
  }

  showWarn(message: string, msgTimeout: number = 5000): void {
    this.snackBar.open(message, 'X', { panelClass: ['warning'], duration: msgTimeout })
  }
  
  showError(message: string): void {
    this.snackBar.open(message, 'X', {panelClass: ['error'], duration: 6000});
  }
}