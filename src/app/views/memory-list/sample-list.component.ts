import { Component, OnInit } from '@angular/core';
import {RequestMemoryService} from "../../services/request-memory.service";
import {NotificationService} from "../../services/notification.service";
import {RequestSampleTO} from "../../models/models";
import {MatDialog} from "@angular/material/dialog";
import {SampleFormComponent} from "../form-record/sample-form.component";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../confirm-dialog/ConfirmDialogComponent";

@Component({
  selector: 'app-sample-list',
  templateUrl: './sample-list.component.html',
  styleUrls: ['./sample-list.component.css']
})
export class SampleListComponent implements OnInit {

  filter = ""
  data: RequestSampleTO[]

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

  public editItem(item: RequestSampleTO) {
    let itemCopy = Object.assign({}, item);
    let dialogRef = this.dialog.open(SampleFormComponent, {
      height: '780px',
      width: '950px',
      data: itemCopy
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res === 'OK') {
        this.notificationService.showSuccess("Request successfully modified.");
        this.searchMemoryList();
      }
    });
  }

  public removeItem(item: RequestSampleTO) {
    let itemId = item.requestId;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: new ConfirmDialogModel("Confirm Action", `Delete request sample? \n${item.requestId}: ${item.title}`)
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.service.removeRequestMemory(itemId).subscribe(res => {
          this.notificationService.showSuccess("Request successfully removed.");
          this.searchMemoryList();
        })
      }
    });
  }

}
