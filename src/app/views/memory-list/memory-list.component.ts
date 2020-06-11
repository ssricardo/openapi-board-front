import { Component, OnInit } from '@angular/core';
import {RequestMemoryService} from "../../services/request-memory.service";
import {NotificationService} from "../../services/notification.service";
import {RequestMemoryTO} from "../../models/models";
import {MatDialog} from "@angular/material/dialog";
import {FormRecordComponent} from "../form-record/form-record.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../confirm-dialog/ConfirmDialogComponent";

@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.css']
})
export class MemoryListComponent implements OnInit {

  filter = ""
  data: RequestMemoryTO[]

  constructor(private service: RequestMemoryService,
              private notificationService: NotificationService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  public searchMemoryList() {
    if (this.filter.trim().length == 0) {
      this.notificationService.showWarn('Please inform some text to be searched');
      return;
    }
    this.service.search(this.filter).subscribe(res => {
      this.data = res.result;
    });
  }

  public editItem(item: RequestMemoryTO) {
    let itemCopy = Object.assign({}, item);
    let dialogRef = this.dialog.open(FormRecordComponent, {
      height: '600px',
      width: '850px',
      data: itemCopy
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res === 'OK') {
        this.notificationService.showSuccess("Item successfully modified.");
        this.searchMemoryList();
      }
    });
  }

  public removeItem(item: RequestMemoryTO) {
    let itemId = item.requestId;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: new ConfirmDialogModel("Confirm Action", `Delete memory? \n${item.requestId}: ${item.title}`)
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.service.removeRequestMemory(itemId).subscribe(res => {
          this.notificationService.showSuccess("Item successfully removed.");
          this.searchMemoryList();
        })
      }
    });
  }

}
