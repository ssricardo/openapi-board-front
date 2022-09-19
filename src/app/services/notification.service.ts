import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Centralizes and builds visual notifications to inform the user */

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(public snackBar: MatSnackBar) { }
  
  showSuccess(message: string): void {
    this.snackBar.open(message, '', {panelClass: ['notif-ok'], duration: 2800});
  }

  showWarn(message: string, msgTimeout: number = 5500): void {
    this.snackBar.open(message, 'X', { panelClass: ['notif-warning'], duration: msgTimeout })
  }
  
  showError(message: string): void {
    this.snackBar.open(message, 'X', {panelClass: ['notif-error'], duration: 7000});
  }
}