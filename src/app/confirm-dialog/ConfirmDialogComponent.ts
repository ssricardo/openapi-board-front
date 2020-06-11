import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {
  constructor(public title: string, public message: string) {
  }
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>
      {{title}}
    </h2>

    <div mat-dialog-content>
      <p class="allow-with-newlines">{{message}}</p>
    </div>
  
    <div mat-dialog-actions>
      <button mat-button (click)="onDismiss()">No</button> 
      <button mat-raised-button color="primary" (click)="onConfirm()">Yes</button>
    </div>`,
  styleUrls: []
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

